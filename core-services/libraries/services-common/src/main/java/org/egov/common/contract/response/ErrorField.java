<<<<<<< HEAD
package org.egov.common.contract.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class ErrorField {
    @NonNull
    private String code;
    @NonNull
    private String message;
    @NonNull
    private String field;
}

=======
package org.egov.common.contract.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class ErrorField {
    @NonNull
    private String code;
    @NonNull
    private String message;
    @NonNull
    private String field;
}

>>>>>>> 65df4ffcc162d8b6e3cda150ea8c73bddbeb15b8
