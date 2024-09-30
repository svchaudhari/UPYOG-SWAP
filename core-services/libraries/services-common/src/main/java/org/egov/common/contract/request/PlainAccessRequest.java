<<<<<<< HEAD
package org.egov.common.contract.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class PlainAccessRequest {
    private String recordId;

    private List<String> plainRequestFields;
}
=======
package org.egov.common.contract.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class PlainAccessRequest {
    private String recordId;

    private List<String> plainRequestFields;
}
>>>>>>> 65df4ffcc162d8b6e3cda150ea8c73bddbeb15b8
