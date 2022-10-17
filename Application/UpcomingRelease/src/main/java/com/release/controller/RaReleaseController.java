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
import com.release.dto.Release;
import com.release.service.RaReleaseService;

@Controller
@CrossOrigin
@RequestMapping(value = "releaseservices/ra")
public class RaReleaseController {

	@Autowired
	RaReleaseService service;

	@Autowired
	HostNameProperties hostNameProperties;

	@RequestMapping(value = "/releases", method = GET, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Release> getReleases(HttpServletRequest request) {
		return service.getReleases(hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}

	@RequestMapping(value = "/releases/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public Release getRelease(HttpServletRequest request, @PathVariable(value = "id") String id) {
		return service.getRelease(id, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}

	@RequestMapping(value = "/releases", method = POST, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public boolean addRelease(HttpServletRequest request, @Valid @RequestBody Release release) {
		return service.addRelease(release, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}

	@RequestMapping(value = "/releases", method = PUT, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public boolean updateRelease(HttpServletRequest request, @Valid @RequestBody Release release) {
		return service.updateRelease(release, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}

	@RequestMapping(value = "/releases/{id}", method = DELETE, produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	public boolean removeRelease(HttpServletRequest request, @PathVariable(value = "id") String id) {
		return service.removeRelease(id, hostNameProperties.getProd().equalsIgnoreCase(request.getServerName()));
	}
}
