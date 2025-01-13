package org.todoapp.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.todoapp.dto.UserDto;
import org.todoapp.services.UserService;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j(topic = "USER-CONTROLLER")
@Tag(name = "User Controller")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private final UserService userService;

    @Operation(summary = "Get User list", description = "API retrive user from db")
    @GetMapping("/list")
    public Map<String, Object> getAllUsers(@RequestParam(required = false)  String keyword,
                                           @RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "20") int size){
        log.info("Get user list.....");
        Pageable pageable = PageRequest.of(page, size);

        // Add filtering logic if needed
        Page<UserDto> userPage = (keyword != null && !keyword.isEmpty()) ? userService.findAllByKeyword(keyword, pageable)
                : userService.findAll(pageable);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("status", HttpStatus.OK.value());
        result.put("message", "user list");
        result.put("data", userPage.getContent());
        return result;
    }

    @Operation(summary = "Get user detail", description = "API retrieve user detail by ID from database")
    @GetMapping("/{userId}")

    public Map<String, Object> getUserDetail(@PathVariable @Min(value = 1, message = "userId must be equals or greater than 1") Long userId) {
        log.info("Get user detail by ID: {}", userId);

        UserDto userDetail = userService.findById(userId);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("status", HttpStatus.OK.value());
        result.put("message", "user");
        result.put("data", userDetail);

        return result;
    }

    @PostMapping("/create")
    @Operation(summary = "Create user api", description = "create user")
    public Map<String, Object> createUser(@RequestBody UserDto user) throws Exception {
        log.info("Create user {}", user);

        UserDto savedUser = userService.save(user);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("status", HttpStatus.CREATED.value());
        result.put("message", "create user");
        result.put("data", savedUser);

        return result;
    }

    @PutMapping("/update")
    @Operation(summary = "Update user API")
    public Map<String, Object> updateUser(@RequestBody UserDto user){
        log.info("Update user {}", user);

        UserDto updatedUser = userService.update(user);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("status", HttpStatus.ACCEPTED.value());
        result.put("message", "update user");
        result.put("data", updatedUser);

        return result;
    }

    @DeleteMapping("/delete{id}")
    @Operation(summary = "delete user")
    public Map<String, Object> deleteUser(@RequestParam Long id){
        log.info("Delete User with id {}", id);

        userService.delete(id);
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("status", HttpStatus.NO_CONTENT.value());
        result.put("message", "delete user");
        result.put("data", id);

        return result;
    }


}
