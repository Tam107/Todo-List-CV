package org.todoapp.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.todoapp.common.TaskStatus;
import org.todoapp.dto.request.TaskRequest;
import org.todoapp.dto.response.PageResponse;
import org.todoapp.dto.response.TaskResponse;
import org.todoapp.entity.TaskDetails;
import org.todoapp.entity.UserEntity;
import org.todoapp.exception.ResourceNotFoundException;
import org.todoapp.repository.TaskRepository;
import org.todoapp.repository.UserRepository;
import org.todoapp.service.TaskService;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j(topic = "TASK-SERVICE")
@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public PageResponse<TaskResponse> getAllTasks(String keyword, int page, int size, String sortBy, String direction) {
        log.info("Fetching tasks for page: {}, size: {}, sortBy: {}, direction: {}", page, size, sortBy, direction);
        UserEntity currentUser = getCurrentUser();

        Sort.Direction sort = direction.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sortByField = Sort.by(sort, sortBy != null ? sortBy : "startDate");
        Pageable pageable = PageRequest.of(page, size, sortByField);

        Page<TaskDetails> taskPage;
        if (keyword != null && !keyword.isEmpty()) {
            taskPage = taskRepository.findByTitleContainingIgnoreCase(keyword, pageable);
        } else {
            taskPage = taskRepository.findByUser(currentUser, pageable);
        }
        log.info("Fetched {} tasks for page {}, total pages: {}", taskPage.getContent().size(), page, taskPage.getTotalPages());

        List<TaskResponse> taskResponses = taskPage.getContent().stream()
                .map(this::mapToTaskResponse)
                .collect(Collectors.toList());
        return new PageResponse<>(taskResponses, taskPage.getTotalElements(), taskPage.getTotalPages(), taskPage.getNumber());
    }

    @Override
    public TaskResponse getTask(Long id) {
        TaskDetails task = getTaskById(id);
        return mapToTaskResponse(task);
    }

    @Override
    public TaskResponse createTask(TaskRequest request) {
        log.info("Creating task with request: {}", request);
        UserEntity currentUser = getCurrentUser();
        log.info("Current user {}", currentUser);

        TaskDetails task = TaskDetails.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.PENDING)
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
                .orElseThrow(() -> new ResourceNotFoundException("Tasks not found"));

        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Tasks not found");
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
                .build();
    }
}
