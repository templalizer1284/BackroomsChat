package dev.aleksandarm.controllers.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.aleksandarm.data.DATA_message;
import dev.aleksandarm.data.DATA_user;
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
	
	@GetMapping(path = "/get_online_users")
	public String get_online_users() {
		return "Dummy endpoint";
	}
	
	@GetMapping(path = "/get_current_auth")
	public DATA_user get_current_auth() {
		return service.get_current_auth();
	}
	
	@PostMapping(path = "/get_message")
	public ResponseEntity<String> get_message(String message) {
		return service.get_message(message);
	}
	
	@GetMapping("/track_messages")
	public Long track_messages() {
		return service.track_messages();
	}
	
	@GetMapping(path = "/fetch_messages")
	public List<DATA_message> fetch_messages() {
		return service.fetch_messages();
	}
	
	@GetMapping(path = "/fetch_message_by_id")
	public Optional<DATA_message> fetch_message_by_id(Long id) throws Exception {
		return service.fetch_message_by_id(id);
	}
	
	@GetMapping(path = "/fetch_message_ids")
	public List<Long> fetch_message_ids() {
		return service.fetch_message_ids();
	}
}
