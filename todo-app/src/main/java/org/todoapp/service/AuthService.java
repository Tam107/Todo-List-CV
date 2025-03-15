package org.todoapp.service;

import org.todoapp.dto.request.LoginRequest;
import org.todoapp.dto.request.RegisterRequest;
import org.todoapp.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refreshToken(String refreshToken);
    void logout();
}
