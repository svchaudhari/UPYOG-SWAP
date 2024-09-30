<<<<<<< HEAD
package org.egov.common.contract.request;

import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class RequestInfo {

    private String apiId;

    private String ver;

    private Long ts;

    private String action;

    private String did;

    private String key;

    private String msgId;

    private String authToken;

    private String correlationId;

    private PlainAccessRequest plainAccessRequest;

    private User userInfo;
=======
package org.egov.common.contract.request;

import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class RequestInfo {

    private String apiId;

    private String ver;

    private Long ts;

    private String action;

    private String did;

    private String key;

    private String msgId;

    private String authToken;

    private String correlationId;

    private PlainAccessRequest plainAccessRequest;

    private User userInfo;
>>>>>>> 65df4ffcc162d8b6e3cda150ea8c73bddbeb15b8
}