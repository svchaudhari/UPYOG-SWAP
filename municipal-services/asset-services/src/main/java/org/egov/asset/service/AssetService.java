package org.egov.asset.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.egov.asset.repository.AssetRepository;
import org.egov.asset.util.AssetConstants;
import org.egov.asset.util.AssetErrorConstants;
import org.egov.asset.util.AssetValidator;
import org.egov.asset.util.MdmsUtil;
import org.egov.asset.web.models.Asset;
import org.egov.asset.web.models.AssetRequest;
import org.egov.asset.web.models.AssetSearchCriteria;
import org.egov.asset.web.models.CreationReason;
import org.egov.asset.web.models.UserSearchCriteria;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.Role;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import net.logstash.logback.encoder.org.apache.commons.lang.StringUtils;

@Service
@Slf4j
public class AssetService {

	@Autowired
	MdmsUtil util;
	@Autowired
	AssetRepository assetRepository;
	@Autowired
	AssetValidator assetValidator;
	@Autowired
	EnrichmentService enrichmentService;
	@Autowired
	WorkflowIntegrator workflowIntegrator;
	@Autowired
	WorkflowService workflowService;

	/**
	 * does all the validations required to create Asset Record in the system
	 * 
	 * @param assetRequest
	 * @return
	 */
	public Asset create(AssetRequest assetRequest) {
		log.debug("Asset create service method called");
		RequestInfo requestInfo = assetRequest.getRequestInfo();
		String tenantId = assetRequest.getAsset().getTenantId().split("\\.")[0];
		Object mdmsData = util.mDMSCall(requestInfo,assetRequest.getAsset().getTenantId());

		// Application can not be created statelevel
		if (assetRequest.getAsset().getTenantId().split("\\.").length == 1) {
			throw new CustomException(AssetErrorConstants.INVALID_TENANT,
					" Application cannot be create at StateLevel");
		}

		// Since approval number should be generated at approve stage
		if (!StringUtils.isEmpty(assetRequest.getAsset().getApprovalNo())) {
			assetRequest.getAsset().setApprovalNo(null);
		}

		assetValidator.validateCreate(assetRequest, mdmsData);

		enrichmentService.enrichAssetCreateRequest(assetRequest, mdmsData);
		//workflowIntegrator.callWorkFlow(assetRequest);
		workflowService.updateWorkflow(assetRequest, CreationReason.CREATE);
		// assetRequest.getAsset().setApplicant("100");
		assetRepository.save(assetRequest);
//		return bpaRequest.getBPA();

		return assetRequest.getAsset();

	}

	public List<Asset> search(AssetSearchCriteria criteria, RequestInfo requestInfo) {
		List<Asset> assets = new LinkedList<>();
		assetValidator.validateSearch(requestInfo, criteria);
		List<String> roles = new ArrayList<>();
		for (Role role : requestInfo.getUserInfo().getRoles()) {
			roles.add(role.getCode());
		}
		if ((criteria.tenantIdOnly() || criteria.isEmpty()) && roles.contains(AssetConstants.EMPLOYEE)) {
			log.debug("loading data of created and by me");
			assets = this.getAssetCreatedForByMe(criteria, requestInfo);
			log.debug("no of assets retuning by the search query" + assets.size());
		}
		assets = getAssetsFromCriteria(criteria);
		return assets;
	}

	private List<Asset> getAssetCreatedForByMe(AssetSearchCriteria criteria, RequestInfo requestInfo) {
		List<Asset> assets = null;
		UserSearchCriteria userSearchRequest = new UserSearchCriteria();
		if (criteria.getTenantId() != null) {
			userSearchRequest.setTenantId(criteria.getTenantId());
		}
		List<String> uuids = new ArrayList<>();
		if (requestInfo.getUserInfo() != null && !StringUtils.isEmpty(requestInfo.getUserInfo().getUuid())) {
			uuids.add(requestInfo.getUserInfo().getUuid());
			criteria.setCreatedBy(uuids);
		}
		log.debug("loading data of created and by me"+ uuids.toString());
		assets = getAssetsFromCriteria(criteria);
		return assets;
	}

	/**
	 * Returns the assets with enriched owners from user service
	 * 
	 * @param criteria    The object containing the parameters on which to search
	 * @param requestInfo The search request's requestInfo
	 * @return List of assets for the given criteria
	 */
	public List<Asset> getAssetsFromCriteria(AssetSearchCriteria criteria) {
		List<Asset> assets = assetRepository.getAssetData(criteria);
		if (assets.isEmpty())
			return Collections.emptyList();
		return assets;
	}

	/**
	 * does all the validations required to update Asset Record in the system
	 * 
	 * @param assetRequest
	 */
	public Asset update(@Valid AssetRequest assetRequest) {
		log.debug("Asset create service method called");
		RequestInfo requestInfo = assetRequest.getRequestInfo();
		String tenantId = assetRequest.getAsset().getTenantId().split("\\.")[0];
		Object mdmsData = util.mDMSCall(requestInfo, tenantId);
		Asset asset = assetRequest.getAsset();
		if (asset.getId() == null) {
			throw new CustomException(AssetErrorConstants.UPDATE_ERROR, "Asset Not found in the System" + asset);
		}

		enrichmentService.enrichAssetUpdateRequest(assetRequest, mdmsData);
		workflowService.updateWorkflow(assetRequest, CreationReason.UPDATE);
//		wfIntegrator.callWorkFlow(assetRequest);
		assetRepository.update(assetRequest);

		return assetRequest.getAsset();
	}

}
