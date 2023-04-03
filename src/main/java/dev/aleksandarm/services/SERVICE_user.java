package dev.aleksandarm.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import dev.aleksandarm.data.DATA_message;
import dev.aleksandarm.data.DATA_soundfiles;
import dev.aleksandarm.data.DATA_user;

public interface SERVICE_user {
	public abstract String register(DATA_user user);
	public abstract Long registeredUsers();
	public abstract Long track();
	public abstract Long track_messages();
	public abstract DATA_user get_current_auth();
	public abstract ResponseEntity<String> get_message(String message, MultipartFile file) throws IOException;
	public abstract List<DATA_message> fetch_messages();
	public abstract List<Long> fetch_message_ids();
	public abstract Optional<DATA_message> fetch_message_by_id(Long id) throws Exception;
	public abstract Optional<DATA_user> fetch_avatar_by_id(Long id) throws Exception;
	public abstract List<DATA_soundfiles> fetch_audio();
}
