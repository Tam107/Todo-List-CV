package org.todoapp.services.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.todoapp.dto.CategoryDto;
import org.todoapp.dto.TodoDto;
import org.todoapp.exception.InvalidEntityException;
import org.todoapp.model.Category;
import org.todoapp.model.Todo;
import org.todoapp.repositories.CategoryRepository;
import org.todoapp.repositories.TodoRepository;
import org.todoapp.services.TodoService;
import org.todoapp.validators.TodoValidator;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@Slf4j(topic = "TODO-SERVICE")
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;

    private CategoryRepository categoryRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public TodoDto save(TodoDto todoDto) {

        List<String> errors = TodoValidator.validateTodo(todoDto);
        if(!errors.isEmpty()){
            log.info("Todo is null");
            throw new InvalidEntityException("The todo is null");
        }

        return TodoDto.fromEntity(todoRepository.save(TodoDto.toEntity(todoDto)));
    }

    @Override
    public List<TodoDto> findAll() {

        return todoRepository.findAll().stream().map(TodoDto::fromEntity).collect(Collectors.toList());
    }

    @Override
    public Page<TodoDto> findByKeyWord(String keyword, Pageable pageable) {
        return todoRepository.findTodoByKeyWord(keyword, pageable).map(TodoDto::fromEntity);
    }

    @Override
    public TodoDto findById(Long id) {

        if (id == null){
            log.info("The id is null, {}", id);
        }

        final Long categoryId = categoryRepository.findCategoryByTodoId(id);
        Category category = new Category();
        category.setId(categoryId);

        final Optional<Todo> todo = todoRepository.findById(id);
        todo.ifPresent(value -> value.setCategory(category));

        // build to do from database public T get() {
        final TodoDto todoDto = TodoDto.fromEntity(todo.get());
        CategoryDto categoryDto = CategoryDto.fromEntity(category);
        todoDto.setCategory(categoryDto);

        return todoRepository.findById(id).map(TodoDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find the todo "));
    }

    @Override
    public List<TodoDto> findByCategory(Long id) {
        return List.of();
    }

    @Override
    public void delete(Long id) {

    }
}
