package com.project.sweet_shop.controller;

import com.project.sweet_shop.dto.AuthDtos.AuthResponse;
import com.project.sweet_shop.dto.AuthDtos.LoginRequest;
import com.project.sweet_shop.dto.AuthDtos.RegisterRequest;
import com.project.sweet_shop.model.Role;
import com.project.sweet_shop.model.User;
import com.project.sweet_shop.repository.UserRepository;
import com.project.sweet_shop.security.JwtService;
import jakarta.validation.Valid;
import java.util.Set;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;

	public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder,
						 AuthenticationManager authenticationManager, JwtService jwtService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
		if (userRepository.existsByUsername(request.username)) {
			return ResponseEntity.badRequest().body("Username already taken");
		}
		if (userRepository.existsByEmail(request.email)) {
			return ResponseEntity.badRequest().body("Email already registered");
		}
		User user = new User();
		user.setUsername(request.username);
		user.setEmail(request.email);
		user.setPasswordHash(passwordEncoder.encode(request.password));
		user.setRoles(Set.of(Role.USER));
		userRepository.save(user);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.username, request.password));
		String token = jwtService.generateToken(request.username);
		User user = userRepository.findByUsername(request.username).orElseThrow();
		AuthResponse response = new AuthResponse();
		response.token = token;
		response.username = user.getUsername();
		response.roles = user.getRoles().stream().map(Enum::name).toArray(String[]::new);
		return ResponseEntity.ok(response);
	}
}


