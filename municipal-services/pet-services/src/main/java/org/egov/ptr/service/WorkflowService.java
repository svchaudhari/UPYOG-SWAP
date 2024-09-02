package org.egov.ptr.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.egov.common.contract.request.RequestInfo;
import org.egov.ptr.config.PetConfiguration;
import org.egov.ptr.models.PetRegistrationApplication;
import org.egov.ptr.models.PetRegistrationRequest;
import org.egov.ptr.models.ProcessInstance;
import org.egov.ptr.models.ProcessInstanceRequest;
import org.egov.ptr.models.User;
import org.egov.ptr.models.Workflow;
import org.egov.ptr.models.workflow.BusinessService;
import org.egov.ptr.models.workflow.BusinessServiceResponse;
import org.egov.ptr.models.workflow.ProcessInstanceResponse;
import org.egov.ptr.models.workflow.State;
import org.egov.ptr.repository.ServiceRequestRepository;
import org.egov.ptr.web.contracts.RequestInfoWrapper;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class WorkflowService {

	@Autowired
	private PetConfiguration configs;

	@Autowired
	private ServiceRequestRepository restRepo;

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	ServiceRequestRepository serviceRequestRepository;

	public void updateWorkflowStatus(PetRegistrationRequest petRegistrationRequest) {
		petRegistrationRequest.getPetRegistrationApplications().forEach(application -> {
			ProcessInstance processInstance = getProcessInstanceForPTR(application,
					petRegistrationRequest.getRequestInfo());
			ProcessInstanceRequest workflowRequest = new ProcessInstanceRequest(petRegistrationRequest.getRequestInfo(),
					Collections.singletonList(processInstance));
			callWorkFlow(workflowRequest);
		});
	}

	private ProcessInstance getProcessInstanceForPTR(PetRegistrationApplication application, RequestInfo requestInfo) {
		Workflow workflow = application.getWorkflow();

		if(null != workflow) {
			ProcessInstance processInstance = new ProcessInstance();
			processInstance.setBusinessId(application.getApplicationNumber());
			processInstance.setAction(workflow.getAction());
			processInstance.setModuleName("PTR");
			processInstance.setTenantId(application.getTenantId());
			processInstance.setBusinessService("PTR");
			processInstance.setDocuments(workflow.getDocuments());
			processInstance.setComment(workflow.getComments());

			if (!CollectionUtils.isEmpty(workflow.getAssignes())) {
				List<User> users = new ArrayList<>();

				workflow.getAssignes().forEach(uuid -> {
					User user = new User();
					user.setUuid(uuid);
					users.add(user);
				});

				processInstance.setAssignes(users);
			}

			return processInstance;
		}
		
		return null;

	}

	/**
	 * Method to integrate with workflow
	 *
	 * takes the Pet request as parameter constructs the work-flow request
	 *
	 * and sets the resultant status from wf-response back to trade-license object
	 *
	 */
	public State callWorkFlow(ProcessInstanceRequest workflowReq) {

		ProcessInstanceResponse response = null;
		StringBuilder url = new StringBuilder(configs.getWfHost().concat(configs.getWfTransitionPath()));
		Optional<Object> optional = serviceRequestRepository.fetchResult(url, workflowReq);
		response = mapper.convertValue(optional.get(), ProcessInstanceResponse.class);
		return response.getProcessInstances().get(0).getState();
	}

	/**
	 * Get the workflow config for the given tenant
	 * 
	 * @param tenantId    The tenantId for which businessService is requested
	 * @param requestInfo The RequestInfo object of the request
	 * @return BusinessService for the the given tenantId
	 */
	public BusinessService getBusinessService(String tenantId, String businessService, RequestInfo requestInfo) {

		StringBuilder url = getSearchURLWithParams(tenantId, businessService);
		RequestInfoWrapper requestInfoWrapper = RequestInfoWrapper.builder().requestInfo(requestInfo).build();
		Optional<Object> result = restRepo.fetchResult(url, requestInfoWrapper);
		BusinessServiceResponse response = null;
		try {
			response = mapper.convertValue(result.get(), BusinessServiceResponse.class);
		} catch (IllegalArgumentException e) {
			throw new CustomException("PARSING ERROR", "Failed to parse response of workflow business service search");
		}

		if (CollectionUtils.isEmpty(response.getBusinessServices()))
			throw new CustomException("BUSINESSSERVICE_NOT_FOUND",
					"The businessService " + businessService + " is not found");

		return response.getBusinessServices().get(0);
	}

	/**
	 * Creates url for search based on given tenantId
	 *
	 * @param tenantId The tenantId for which url is generated
	 * @return The search url
	 */
	private StringBuilder getSearchURLWithParams(String tenantId, String businessService) {

		StringBuilder url = new StringBuilder(configs.getWfHost());
		url.append(configs.getWfBusinessServiceSearchPath());
		url.append("?tenantId=");
		url.append(tenantId);
		url.append("&businessServices=");
		url.append(businessService);
		return url;
	}

	/**
	 * Returns boolean value to specifying if the state is updatable
	 * 
	 * @param stateCode       The stateCode of the license
	 * @param businessService The BusinessService of the application flow
	 * @return State object to be fetched
	 */
	public Boolean isStateUpdatable(String stateCode, BusinessService businessService) {
		for (State state : businessService.getStates()) {
			if (state.getState() != null && state.getState().equalsIgnoreCase(stateCode))
				return state.getIsStateUpdatable();
		}
		return null;
	}

	/**
	 * Creates url for searching processInstance
	 *
	 * @return The search url
	 */
	private StringBuilder getWorkflowSearchURLWithParams(String tenantId, String businessId) {

		StringBuilder url = new StringBuilder(configs.getWfHost());
		url.append(configs.getWfProcessInstanceSearchPath());
		url.append("?tenantId=");
		url.append(tenantId);
		url.append("&businessIds=");
		url.append(businessId);
		return url;
	}

	/**
	 * Fetches the workflow object for the given assessment
	 * 
	 * @return
	 */
	public State getCurrentState(RequestInfo requestInfo, String tenantId, String businessId) {

		RequestInfoWrapper requestInfoWrapper = RequestInfoWrapper.builder().requestInfo(requestInfo).build();

		StringBuilder url = getWorkflowSearchURLWithParams(tenantId, businessId);

		Optional<Object> res = restRepo.fetchResult(url, requestInfoWrapper);
		ProcessInstanceResponse response = null;

		try {
			response = mapper.convertValue(res.get(), ProcessInstanceResponse.class);
		} catch (Exception e) {
			throw new CustomException("PARSING_ERROR", "Failed to parse workflow search response");
		}

		if (response != null && !CollectionUtils.isEmpty(response.getProcessInstances())
				&& response.getProcessInstances().get(0) != null)
			return response.getProcessInstances().get(0).getState();

		return null;
	}

}