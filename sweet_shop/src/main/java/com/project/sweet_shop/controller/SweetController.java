package com.project.sweet_shop.controller;

import com.project.sweet_shop.model.Sweet;
import com.project.sweet_shop.service.SweetService;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {

	private final SweetService sweetService;

	public SweetController(SweetService sweetService) {
		this.sweetService = sweetService;
	}

	@PostMapping
	public ResponseEntity<Sweet> create(@Valid @RequestBody Sweet sweet) {
		return ResponseEntity.ok(sweetService.create(sweet));
	}

	@GetMapping
	public List<Sweet> list() { return sweetService.list(); }

	@GetMapping("/search")
	public List<Sweet> search(
			@RequestParam(required = false) String name,
			@RequestParam(required = false) String category,
			@RequestParam(required = false) BigDecimal minPrice,
			@RequestParam(required = false) BigDecimal maxPrice) {
		return sweetService.search(name, category, minPrice, maxPrice);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Sweet> update(@PathVariable Long id, @Valid @RequestBody Sweet sweet) {
		return ResponseEntity.ok(sweetService.update(id, sweet));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		sweetService.delete(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/{id}/purchase")
	public ResponseEntity<Sweet> purchase(@PathVariable Long id, @RequestParam int count) {
		return ResponseEntity.ok(sweetService.purchase(id, count));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/{id}/restock")
	public ResponseEntity<Sweet> restock(@PathVariable Long id, @RequestParam int count) {
		return ResponseEntity.ok(sweetService.restock(id, count));
	}
}


