package dev.aleksandarm.data.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import dev.aleksandarm.data.DATA_message;

public interface REPO_message extends JpaRepository<DATA_message, Long>{
	
	@Query(value = "SELECT id FROM data_message", nativeQuery = true)
	List<Long> fetchIds();
	
	Optional<DATA_message> findById(Long id);
	boolean existsById(Long id);
}
