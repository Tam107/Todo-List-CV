package org.todoapp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.todoapp.dto.response.ApiResponse;
import org.todoapp.dto.request.LoginRequest;
import org.todoapp.dto.request.RegisterRequest;
import org.todoapp.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(new ApiResponse(200, "User registered successfully",
                authService.register(request)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(new ApiResponse(200, "Login successful",
                authService.login(request)));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout() {
        authService.logout();
        return ResponseEntity.ok(new ApiResponse(200, "Logout successful", null));
    }
}
