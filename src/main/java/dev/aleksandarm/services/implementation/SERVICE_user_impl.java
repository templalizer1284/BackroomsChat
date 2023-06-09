package dev.aleksandarm.services.implementation;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dev.aleksandarm.data.DATA_message;
import dev.aleksandarm.data.DATA_soundfiles;
import dev.aleksandarm.data.DATA_user;
import dev.aleksandarm.data.repos.REPO_message;
import dev.aleksandarm.data.repos.REPO_soundfiles;
import dev.aleksandarm.data.repos.REPO_user;
import dev.aleksandarm.services.SERVICE_user;

@Service
public class SERVICE_user_impl implements SERVICE_user{
	
	@Autowired
	REPO_user repo;
	
	@Autowired
	REPO_message msg_repo;
	
	@Autowired
	REPO_soundfiles sound_repo;
	
	@Override
	public String register(DATA_user user) {
		if(repo.existsByUsername(user.getUsername())) {
			return "redirect:register?already_exists";
		} else {
			user.setRegistered(LocalDate.now());
			user.setRole("user");
			user.setAvatar(user.getAvatar());
			repo.save(user);
			return "redirect:register?success";
		}
	}
	
	@Override
	public Long registeredUsers() {
		return repo.count();
	}
	
	@Override
	public Long track() {
		return 1L;
	}
	
	@Override
	public DATA_user get_current_auth() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		DATA_user user = repo.findByUsername(authentication.getName());
		return user;
	}
	
	@Override
	public ResponseEntity<String> get_message(String message, MultipartFile file) throws IOException {
		
		DATA_message msg = new DATA_message();
		msg.setContent(message);
		msg.setDate(LocalDate.now());
		msg.setTime(LocalTime.now());
		
		if(file == null) {
			// pass
		} else {
			Random rand = new Random();
			String[] format = file.getOriginalFilename().split("\\.");
			msg.setFilename(file.getOriginalFilename().hashCode() * rand.nextInt() + "." + format[1]);
			msg.setFiletype(file.getContentType());
			msg.setFile(file.getBytes());
		}
		
		DATA_user user = get_current_auth();
		msg.setOwner_id(user.getId());
		
		msg_repo.save(msg);
		
		return new ResponseEntity<String> ("received", HttpStatus.OK);
	}
	
	@Override
	public List<DATA_message> fetch_messages() {
		List<DATA_message> messages = msg_repo.findAll();
		return messages;
	}
	
	@Override
	public Long track_messages() {
		return msg_repo.count();
	}
	
	@Override
	public List<Long> fetch_message_ids() {
		return msg_repo.fetchIds();
	}
	
	@Override
	public Optional<DATA_message> fetch_message_by_id(Long id) throws Exception{
		if(msg_repo.existsById(id)) {
			return msg_repo.findById(id);
		} else {
			throw new Exception("Fatal error, Message by that ID is not found.");
		}
	}
	
	@Override
	public Optional<DATA_user> fetch_avatar_by_id(Long id) throws Exception{
		if(repo.existsById(id)) {
			return repo.findById(id);
		} else {
			throw new Exception ("Fatal error. User by that ID is not registered.");
		}
	}
	
	@Override
	public List<DATA_soundfiles> fetch_audio() {
		return sound_repo.findAll();
	}
}
