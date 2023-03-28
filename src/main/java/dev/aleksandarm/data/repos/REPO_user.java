package dev.aleksandarm.data.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.aleksandarm.data.DATA_user;

public interface REPO_user extends JpaRepository<DATA_user, Long>{
	Boolean existsByUsername(String username);
	DATA_user findByUsername(String username);
}
