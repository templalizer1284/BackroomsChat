package dev.aleksandarm.configuration.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import dev.aleksandarm.data.DATA_ActiveUserStore;
import dev.aleksandarm.data.DATA_user;
import dev.aleksandarm.data.repos.REPO_user;

@Configuration
public class CONFIG_security {

	@Autowired
	REPO_user repo;
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		http
			.csrf((csrfc) -> csrfc
					.disable())
			
			.authorizeHttpRequests((authz) -> authz
					.requestMatchers("/").permitAll()
					.requestMatchers("/public/**").permitAll()
					.requestMatchers("/user/**").hasAnyRole("user", "admin")
					.requestMatchers("/admin/**").hasRole("admin")
					.anyRequest().fullyAuthenticated())
			
			.formLogin((loginc) -> loginc
					.defaultSuccessUrl("/")
					.loginPage("/login").permitAll())
			
			.logout((logoutc) -> logoutc
					.logoutSuccessUrl("/")
					.permitAll());
										
		return http.build();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	DATA_ActiveUserStore activeUserStore() {
		return new DATA_ActiveUserStore();
	}
	
	@Bean
	InMemoryUserDetailsManager inMemoryUserDetailsManager() {
		
		List<UserDetails> users = new ArrayList<UserDetails>();
		List<DATA_user> user = repo.findAll();
		
		for(int i = 0; i < user.size(); i++) {
			users.add(
					User.withUsername(user.get(i).getUsername())
					.password(passwordEncoder().encode(user.get(i).getPassword()))
					.roles(user.get(i).getRole())
					.build());
		}
		
		return new InMemoryUserDetailsManager(users);
	}
}
