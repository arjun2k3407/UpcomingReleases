package com.release.dto;

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
public class MenuItem {
	@Valid
	@NotNull(message = "id is required")
	private int id;
	@Valid
	@NotNull(message = "type is required")
	@NotEmpty(message = "type cannot be empty")
	@NotBlank(message = "type cannot be blank")
	private String type;
	private String name;
	private String link;
	private String parentMenu;
	private String position;
	private int prevId;
}
