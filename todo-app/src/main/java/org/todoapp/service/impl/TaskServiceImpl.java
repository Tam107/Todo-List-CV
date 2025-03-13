package org.todoapp.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.todoapp.dto.request.TaskRequest;
import org.todoapp.dto.response.TaskResponse;
import org.todoapp.entity.TaskDetails;
import org.todoapp.entity.UserEntity;
import org.todoapp.exception.ResourceNotFoundException;
import org.todoapp.repository.TaskRepository;
import org.todoapp.repository.UserRepository;
import org.todoapp.service.TaskService;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public Page<?> getAllTasks(String keyword, int page, int size, String sortBy, String direction) {
        UserEntity currentUser = getCurrentUser();
        Sort.Direction sort = direction.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, sort);

        if (keyword != null && !keyword.isEmpty()) {
            return taskRepository.findByUserAndTitleContainingIgnoreCase(currentUser, keyword, pageable)
                    .map(this::mapToTaskResponse);
        }
        return taskRepository.findByUser(currentUser, pageable)
                .map(this::mapToTaskResponse);
    }

    @Override
    public TaskResponse getTask(Long id) {
        TaskDetails task = getTaskById(id);
        return mapToTaskResponse(task);
    }

    @Override
    public TaskResponse createTask(TaskRequest request) {
        UserEntity currentUser = getCurrentUser();

        TaskDetails task = TaskDetails.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(request.getStatus())
                .user(currentUser)
                .build();

        return mapToTaskResponse(taskRepository.save(task));
    }

    @Override
    public TaskResponse updateTask(Long id, TaskRequest request) {
        TaskDetails task = getTaskById(id);

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStartDate(request.getStartDate());
        task.setEndDate(request.getEndDate());
        task.setStatus(request.getStatus());

        return mapToTaskResponse(taskRepository.save(task));
    }

    @Override
    public void deleteTask(Long id) {
        TaskDetails task = getTaskById(id);
        taskRepository.delete(task);
    }

    @SneakyThrows
    private TaskDetails getTaskById(Long id) {
        UserEntity currentUser = getCurrentUser();
        TaskDetails task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Task not found");
        }
        return task;
    }

    @SneakyThrows
    private UserEntity getCurrentUser() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private TaskResponse mapToTaskResponse(TaskDetails task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .startDate(task.getStartDate())
                .endDate(task.getEndDate())
                .status(task.getStatus())
                .user(task.getUser())
                .build();
    }
}
