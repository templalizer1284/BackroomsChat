package dev.aleksandarm.services.implementation;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dev.aleksandarm.data.DATA_soundfiles;
import dev.aleksandarm.data.repos.REPO_soundfiles;
import dev.aleksandarm.services.SERVICE_admin;

@Service
public class SERVICE_admin_impl implements SERVICE_admin{
	
	@Autowired
	REPO_soundfiles sound_repo;
	
	@Override
	public ResponseEntity<String> upload_sound(MultipartFile data) throws IOException {
		if(sound_repo.existsByName(data.getOriginalFilename())) {
			return new ResponseEntity<String> ("Sound already exists with that name.", HttpStatus.BAD_REQUEST);
		} else {
			DATA_soundfiles file = new DATA_soundfiles();
			file.setData(data.getBytes());
			file.setName(data.getOriginalFilename());
			sound_repo.save(file);
			
			return new ResponseEntity<String> ("Success", HttpStatus.OK);
		}
	}
}
