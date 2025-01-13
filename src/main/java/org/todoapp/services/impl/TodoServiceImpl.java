package org.todoapp.services.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.todoapp.dto.TodoDto;
import org.todoapp.repositories.TodoRepository;
import org.todoapp.services.TodoService;

import java.util.List;

@Service
@Slf4j(topic = "TODO-SERVICE")
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;


    @Override
    public TodoDto save(TodoDto todoDto) {
        return null;
    }

    @Override
    public List<TodoDto> findAll() {
        return List.of();
    }

    @Override
    public TodoDto findById(Long id) {
        return null;
    }

    @Override
    public List<TodoDto> findByCategory(Long id) {
        return List.of();
    }

    @Override
    public void delete(Long id) {

    }
}
