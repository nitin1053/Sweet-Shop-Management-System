package com.project.sweet_shop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Table(name = "sweets", indexes = {
		@Index(name = "idx_sweets_name", columnList = "name"),
		@Index(name = "idx_sweets_category", columnList = "category")
})
public class Sweet {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Column(nullable = false, unique = true, length = 120)
	private String name;

	@NotBlank
	@Column(nullable = false, length = 80)
	private String category;

	@NotNull
	@Min(0)
	@Column(nullable = false, precision = 10, scale = 2)
	private BigDecimal price;

	@NotNull
	@Min(0)
	@Column(nullable = false)
	private Integer quantity;

	public Long getId() { return id; }
	public String getName() { return name; }
	public String getCategory() { return category; }
	public BigDecimal getPrice() { return price; }
	public Integer getQuantity() { return quantity; }

	public void setId(Long id) { this.id = id; }
	public void setName(String name) { this.name = name; }
	public void setCategory(String category) { this.category = category; }
	public void setPrice(BigDecimal price) { this.price = price; }
	public void setQuantity(Integer quantity) { this.quantity = quantity; }
}


