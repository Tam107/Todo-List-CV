package org.todoapp.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.todoapp.dto.TodoDto;

import java.util.List;

public interface TodoService {

    TodoDto save(TodoDto todoDto);

    List<TodoDto> findAll();

    Page<TodoDto> findByKeyWord(String keyword, Pageable pageable);

    TodoDto findById(Long id);

    List<TodoDto> findByCategory(Long id);

    void delete(Long id);
}
