package dev.aleksandarm.data;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class DATA_message {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(columnDefinition = "bigint not null auto_increment")
	private Long id;
	
	@Column(length = 1000)
	private String content;
	
	private LocalDate date;
	private LocalTime time;
	
	private Long owner_id;
}
