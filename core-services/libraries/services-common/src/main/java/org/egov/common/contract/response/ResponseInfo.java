<<<<<<< HEAD
package org.egov.common.contract.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class ResponseInfo {

    private String apiId;

    private String ver;

    private Long ts;

    private String resMsgId;

    private String msgId;

    private String status;
=======
package org.egov.common.contract.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class ResponseInfo {

    private String apiId;

    private String ver;

    private Long ts;

    private String resMsgId;

    private String msgId;

    private String status;
>>>>>>> 65df4ffcc162d8b6e3cda150ea8c73bddbeb15b8
}