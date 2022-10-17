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
import com.release.dto.User;
import com.release.service.UserService;

@Controller
@CrossOrigin
@RequestMapping(value = "userservices")
public class UserController {

	@Autowired
	HostNameProperties hostNameProperties;

	@Autowired
	UserService service;

	@RequestMapping(value = "/users", method = GET, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<User> getUsers(HttpServletRequest request) {
		return service.getUsers(hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}
	
	@RequestMapping(value = "/users/{ntid}", method = GET, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public User getUser(HttpServletRequest request, @PathVariable(value = "ntid") String ntid) {
		return service.getUser(ntid, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}

	@RequestMapping(value = "/users", method = POST, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<User> addUser(HttpServletRequest request, @Valid @RequestBody User user) {
		return service.addUser(user, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}

	@RequestMapping(value = "/users", method = PUT, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<User> updateMenu(HttpServletRequest request, @Valid @RequestBody User user) {
		return service.updateUser(user, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}

	@RequestMapping(value = "/users/{id}", method = DELETE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<User> removeMenu(HttpServletRequest request, @PathVariable(value = "id") String id) {
		return service.deleteUser(id, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}
}
