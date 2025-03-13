package org.todoapp.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.todoapp.dto.CategoryDto;

import java.util.List;

public interface CategoryService {

    CategoryDto save(CategoryDto categoryDto);

    List<CategoryDto> findAll();

    Page<CategoryDto> findAll(String keyword, Pageable page);

    CategoryDto findById(Long id);

    List<CategoryDto> findAllByUserId(Long userId);

    void delete(Long id);

    List<CategoryDto> getAllToDoByCategoriesForToday(Long userId);
}
