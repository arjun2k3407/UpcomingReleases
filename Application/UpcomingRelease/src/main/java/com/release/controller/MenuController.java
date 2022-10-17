package com.release.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.release.configuration.HostNameProperties;
import com.release.dto.Menu;
import com.release.dto.MenuItem;
import com.release.service.MenuService;

@Controller
@CrossOrigin
@RequestMapping(value = "menuservices")
public class MenuController {
	
	@Autowired
	MenuService service;
	
	@Autowired
	HostNameProperties hostNameProperties;
	
	@RequestMapping(value = "/menu", method = GET, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Menu> getMenu(HttpServletRequest request) {
		return service.getMenu(hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}
	
	@RequestMapping(value = "/menu", method = POST, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Menu> addMenu(HttpServletRequest request, @Valid @RequestBody Menu menu) {
		return service.addMenu(menu, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}
	
	@RequestMapping(value = "/menuitem", method = POST, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Menu> addMenuItem(HttpServletRequest request, @Valid @RequestBody MenuItem item) {
		return service.addMenuItem(item, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}
	
	@RequestMapping(value = "/menu", method = PUT, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Menu> updateMenu(HttpServletRequest request, @Valid @RequestBody Menu menu) {
		return service.updateMenu(menu, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}
	
	@RequestMapping(value = "/menuitem", method = PUT, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Menu> updateMenuItem(HttpServletRequest request, @Valid @RequestBody MenuItem item) {
		return service.updateMenuItem(item, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}
	
	@RequestMapping(value = "/menu/{id}", method = DELETE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Menu> removeMenu(HttpServletRequest request, @PathVariable(value="id") int id) {
		return service.deleteMenu(id, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}
	
	@RequestMapping(value = "/menuitem/{parentMenu}/{id}", method = DELETE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Menu> removeMenuItem(HttpServletRequest request, @PathVariable(value = "parentMenu") String parentMenu, @PathVariable(value="id") int id) {
		return service.deleteMenuItem(parentMenu, id, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}
}
