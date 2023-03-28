package dev.aleksandarm.data;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DATA_ActiveUserStore {
	public List<String> users;
	
	public void ActiveUserStore() {
		users = new ArrayList<String>();
	}
}
