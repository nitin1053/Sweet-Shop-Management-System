package com.project.sweet_shop.service;

import com.project.sweet_shop.model.Sweet;
import com.project.sweet_shop.repository.SweetRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SweetService {

	private final SweetRepository sweetRepository;

	public SweetService(SweetRepository sweetRepository) {
		this.sweetRepository = sweetRepository;
	}

	public Sweet create(Sweet sweet) {
		return sweetRepository.save(sweet);
	}

	public List<Sweet> list() { return sweetRepository.findAll(); }

	public List<Sweet> search(String name, String category, BigDecimal minPrice, BigDecimal maxPrice) {
		return sweetRepository.search(name, category, minPrice, maxPrice);
	}

	public Sweet update(Long id, Sweet update) {
		Sweet existing = sweetRepository.findById(id).orElseThrow();
		existing.setName(update.getName());
		existing.setCategory(update.getCategory());
		existing.setPrice(update.getPrice());
		existing.setQuantity(update.getQuantity());
		return sweetRepository.save(existing);
	}

	public void delete(Long id) { sweetRepository.deleteById(id); }

	@Transactional
	public Sweet purchase(Long id, int count) {
		Sweet sweet = sweetRepository.findById(id).orElseThrow();
		if (count < 1) throw new IllegalArgumentException("Count must be >= 1");
		if (sweet.getQuantity() < count) throw new IllegalStateException("Insufficient stock");
		sweet.setQuantity(sweet.getQuantity() - count);
		return sweet;
	}

	@Transactional
	public Sweet restock(Long id, int count) {
		Sweet sweet = sweetRepository.findById(id).orElseThrow();
		if (count < 1) throw new IllegalArgumentException("Count must be >= 1");
		sweet.setQuantity(sweet.getQuantity() + count);
		return sweet;
	}
}


