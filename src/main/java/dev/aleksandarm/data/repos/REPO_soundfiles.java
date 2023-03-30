package dev.aleksandarm.data.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.aleksandarm.data.DATA_soundfiles;

public interface REPO_soundfiles extends JpaRepository<DATA_soundfiles, Long>{
	Boolean existsByName(String name);
	DATA_soundfiles findByName(String name);
}
