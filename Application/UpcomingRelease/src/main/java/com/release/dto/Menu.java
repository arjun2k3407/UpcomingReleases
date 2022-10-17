package com.release.dto;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Menu {
	
	@Valid
	@NotNull(message = "id is required")
	private int id;
	@Valid
	@NotNull(message = "header is required")
	@NotEmpty(message = "header cannot be empty")
	@NotBlank(message = "header cannot be blank")
	private String header;
	@Valid
	@NotNull(message = "items is required")
	private List<MenuItem> items;
	private String position;
	private int prevId;
}
