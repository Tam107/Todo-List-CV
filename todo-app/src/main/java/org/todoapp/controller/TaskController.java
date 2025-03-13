package org.todoapp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.todoapp.dto.response.ApiResponse;
import org.todoapp.dto.request.TaskRequest;
import org.todoapp.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllTasks(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "startDate") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction) {

        Page<?> tasks = taskService.getAllTasks(keyword, page, size, sortBy, direction);
        return ResponseEntity.ok(new ApiResponse(200, "Tasks retrieved successfully", tasks));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getTask(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse(200, "Task retrieved successfully",
                taskService.getTask(id)));
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createTask(@Valid @RequestBody TaskRequest request) {
        return ResponseEntity.ok(new ApiResponse(200, "Task created successfully",
                taskService.createTask(request)));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request) {
        return ResponseEntity.ok(new ApiResponse(200, "Task updated successfully",
                taskService.updateTask(id, request)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok(new ApiResponse(200, "Task deleted successfully", null));
    }
}
