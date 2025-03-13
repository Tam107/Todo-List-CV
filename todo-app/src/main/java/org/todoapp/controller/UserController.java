package org.todoapp.controller;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.todoapp.dto.request.UserUpdateRequest;
import org.todoapp.dto.response.ApiResponse;
import org.todoapp.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse> getUserProfile() {
        return ResponseEntity.ok(new ApiResponse(200, "User profile retrieved successfully",
                userService.getCurrentUserProfile()));
    }

    @SneakyThrows
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse> updateProfile(@RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(new ApiResponse(200, "Profile updated successfully",
                userService.updateProfile(request)));
    }

    @SneakyThrows
    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        userService.changePassword(oldPassword, newPassword);
        return ResponseEntity.ok(new ApiResponse(200, "Password changed successfully", null));
    }

    @SneakyThrows
    @DeleteMapping("/profile")
    public ResponseEntity<ApiResponse> deleteAccount() {
        userService.deleteAccount();
        return ResponseEntity.ok(new ApiResponse(200, "Account deleted successfully", null));
    }
}
