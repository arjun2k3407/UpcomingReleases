package com.release.dto;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Valid
	@NotNull(message = "id is required")
	private String id;
	@Valid
	@NotNull(message = "ntid is required")
	private String ntid;
	private String fname;
	private String lname;
	private boolean edit;
	private boolean add;
}
