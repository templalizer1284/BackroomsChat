package dev.aleksandarm.services;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface SERVICE_admin {
	public abstract ResponseEntity<String> upload_sound(MultipartFile data) throws IOException;
}
