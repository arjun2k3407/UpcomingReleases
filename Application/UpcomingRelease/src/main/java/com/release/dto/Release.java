package com.release.dto;

import java.util.Date;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class Release {

	@Valid
	@NotNull(message = "id is required")
	@NotEmpty(message = "id cannot be empty")
	@NotBlank(message = "id cannot be blank")
	private String id;
	@Valid
	@NotNull(message = "citrixId is required")
	@NotEmpty(message = "citrixId cannot be empty")
	@NotBlank(message = "citrixId cannot be blank")
	private String citrixId;
	@Valid
	@NotNull(message = "name is required")
	@NotEmpty(message = "name cannot be empty")
	@NotBlank(message = "name cannot be blank")
	private String name;
	@Valid
	@NotNull(message = "prodLike is required")
	private boolean prodLike;
	private String backend;
	private Db devDB;
	private String devInstance;
	private String testInstance;
	private Db testDB;
	private Branch branch;
	@Valid
	@NotNull(message = "date is required")
	private Date date;
	private String comments;
}
