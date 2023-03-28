package dev.aleksandarm.controllers.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import dev.aleksandarm.data.DATA_user;
import dev.aleksandarm.services.SERVICE_user;

@Controller
@RequestMapping("/public/register")
public class CONTROLLER_register {
	
	@Autowired
	SERVICE_user user_service;
	
	@GetMapping
	public String register_view() {
		return "register";
	}
	
	@PostMapping
	public String register(DATA_user user) {
		return user_service.register(user);
	}
}
