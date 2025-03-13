package org.todoapp.services.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.todoapp.dto.CategoryDto;
import org.todoapp.exception.InvalidEntityException;
import org.todoapp.repositories.CategoryRepository;
import org.todoapp.services.CategoryService;
import org.todoapp.validators.CategoryValidator;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j(topic = "CATEGORY-SERVICE")
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public CategoryDto save(CategoryDto categoryDto) {
        List<String> errors = CategoryValidator.validatorCategory(categoryDto);
        if(!errors.isEmpty()){
            log.error("Category is not valid {}", categoryDto);
        }
        return CategoryDto.fromEntity(categoryRepository.save(CategoryDto.toEntity(categoryDto)));
    }

    @Override
    public List<CategoryDto> findAll() {

        return categoryRepository.findAll().stream()
                .map(CategoryDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CategoryDto> findAll(String keyword, Pageable page) {
        return categoryRepository.findByKeyword(keyword, page)
                .map(CategoryDto::fromEntity);
    }

    @Override
    public CategoryDto findById(Long id) {
        if (id == null){
            log.info("Cannot find the id, {}", id);
            return null;
        }

        return categoryRepository.findById(id).map(CategoryDto::fromEntity)
                .orElseThrow(()-> new EntityNotFoundException("Cannot find the category with id {}"));
    }

    @Override
    public List<CategoryDto> findAllByUserId(Long userId) {
        return categoryRepository.findCategoriesByUserId(userId).stream()
                .map(CategoryDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        if (id == null) {
            log.error("Category id is null");
            return;
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public List<CategoryDto> getAllToDoByCategoriesForToday(Long userId) {
        return categoryRepository.getAllTodoByCategoriesForToday(ZonedDateTime.now().withHour(0).withMinute(0),
                ZonedDateTime.now().withHour(23).withMinute(59), userId)
                .stream()
                .map(CategoryDto::fromEntity)
                .collect(Collectors.toList());
    }
}
