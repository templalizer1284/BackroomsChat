package dev.aleksandarm.controllers.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.aleksandarm.services.SERVICE_user;

@RestController
@RequestMapping("/public")
public class CONTROLLER_rest_misc {
	
	@Autowired
	SERVICE_user service;
	
	@Autowired
	ApplicationContext applicationContext;
	
	@GetMapping(path = "/get_users")
	public String get_users() {
		return service.registeredUsers().toString();
	}
	
	@GetMapping(path = "/test")
	public String test() {
		return "test";
	}
}
