package com.project.sweet_shop.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(min = 3, max = 50)
	@Column(nullable = false, unique = true, length = 50)
	private String username;

	@NotBlank
	@Email
	@Column(nullable = false, unique = true, length = 120)
	private String email;

	@NotBlank
	@Size(min = 6, max = 120)
	@Column(nullable = false)
	private String passwordHash;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
	@Column(name = "role")
	@Enumerated(EnumType.STRING)
	private Set<Role> roles = new HashSet<>();

	public Long getId() { return id; }
	public String getUsername() { return username; }
	public String getEmail() { return email; }
	public String getPasswordHash() { return passwordHash; }
	public Set<Role> getRoles() { return roles; }

	public void setId(Long id) { this.id = id; }
	public void setUsername(String username) { this.username = username; }
	public void setEmail(String email) { this.email = email; }
	public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
	public void setRoles(Set<Role> roles) { this.roles = roles; }
}


