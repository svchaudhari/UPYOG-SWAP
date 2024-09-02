package org.hpud.razorpay.contract;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * BillResponse
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillResponseV2 {

	@JsonProperty("ResposneInfo")
	private ResponseInfo resposneInfo = null;

	@JsonProperty("Bill")
	private List<BillV2> bill = new ArrayList<>();

}
