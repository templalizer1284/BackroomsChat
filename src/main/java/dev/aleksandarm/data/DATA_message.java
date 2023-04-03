package dev.aleksandarm.data;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.TableGenerator;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class DATA_message {
	@Id
	@TableGenerator(name = "messageGenerator", allocationSize = 1, initialValue = 0)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "messageGenerator")
	private Long id;
	
	@Column(length = 1000)
	private String content;
	
	@Lob
	@Column(columnDefinition = "longblob")
	private byte[] file;
	private String filename;
	private String filetype;
	
	private LocalDate date;
	private LocalTime time;
	
	private Long owner_id;
}
