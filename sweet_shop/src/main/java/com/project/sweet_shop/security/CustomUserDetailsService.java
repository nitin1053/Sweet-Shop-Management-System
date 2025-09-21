package com.project.sweet_shop.security;

import com.project.sweet_shop.model.Role;
import com.project.sweet_shop.model.User;
import com.project.sweet_shop.repository.UserRepository;
import java.util.stream.Collectors;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	public CustomUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		return org.springframework.security.core.userdetails.User
				.withUsername(user.getUsername())
				.password(user.getPasswordHash())
				.authorities(user.getRoles().stream()
						.map(Role::name)
						.map(r -> r.startsWith("ROLE_") ? r : "ROLE_" + r)
						.map(SimpleGrantedAuthority::new)
						.collect(Collectors.toSet()))
				.accountExpired(false)
				.accountLocked(false)
				.credentialsExpired(false)
				.disabled(false)
				.build();
	}
}


