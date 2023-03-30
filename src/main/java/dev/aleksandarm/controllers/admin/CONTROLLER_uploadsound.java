package dev.aleksandarm.controllers.admin;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.aleksandarm.services.SERVICE_admin;

@RestController
@RequestMapping("/admin")
public class CONTROLLER_uploadsound {
	
	@Autowired
	SERVICE_admin service;
	
	@PostMapping(path = "/upload_file")
	public ResponseEntity<String> upload_sound(MultipartFile file) throws IOException {
		return service.upload_sound(file);
	}
}
