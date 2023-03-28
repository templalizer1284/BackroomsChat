package dev.aleksandarm.services.implementation;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.aleksandarm.data.DATA_user;
import dev.aleksandarm.data.repos.REPO_user;
import dev.aleksandarm.services.SERVICE_user;

@Service
public class SERVICE_user_impl implements SERVICE_user{
	
	@Autowired
	REPO_user repo;
	
	@Override
	public String register(DATA_user user) {
		if(repo.existsByUsername(user.getUsername())) {
			return "redirect:register?already_exists";
		} else {
			user.setRegistered(LocalDate.now());
			user.setRole("user");
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
}
