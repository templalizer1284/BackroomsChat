package dev.aleksandarm.controllers.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.aleksandarm.services.SERVICE_user;

@RestController
@RequestMapping("/user")
public class CONTROLLER_rest_user {
	
	@Autowired
	SERVICE_user service;
	
	@GetMapping(path = "/track")
	public Long track() {
		return service.track();
	}
}
