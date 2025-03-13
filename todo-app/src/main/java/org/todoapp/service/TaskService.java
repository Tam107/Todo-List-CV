package org.todoapp.service;

import org.springframework.data.domain.Page;
import org.todoapp.dto.request.TaskRequest;
import org.todoapp.dto.response.TaskResponse;

public interface TaskService {
     Page<?> getAllTasks(String keyword, int page, int size, String sortBy, String direction);
     TaskResponse getTask(Long id);
     TaskResponse createTask(TaskRequest request);
     TaskResponse updateTask(Long id, TaskRequest request);
     void deleteTask(Long id);
}
