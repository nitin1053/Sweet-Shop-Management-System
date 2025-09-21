package com.project.sweet_shop.repository;

import com.project.sweet_shop.model.Sweet;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SweetRepository extends JpaRepository<Sweet, Long> {

	@Query("SELECT s FROM Sweet s WHERE (:name IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
			"AND (:category IS NULL OR LOWER(s.category) LIKE LOWER(CONCAT('%', :category, '%'))) " +
			"AND (:minPrice IS NULL OR s.price >= :minPrice) " +
			"AND (:maxPrice IS NULL OR s.price <= :maxPrice)")
	List<Sweet> search(
			@Param("name") String name,
			@Param("category") String category,
			@Param("minPrice") BigDecimal minPrice,
			@Param("maxPrice") BigDecimal maxPrice
	);
}


