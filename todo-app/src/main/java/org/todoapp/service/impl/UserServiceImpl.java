package org.todoapp.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.todoapp.dto.request.UserUpdateRequest;
import org.todoapp.dto.response.UserResponse;
import org.todoapp.entity.UserEntity;
import org.todoapp.exception.BadRequestException;
import org.todoapp.exception.ResourceNotFoundException;
import org.todoapp.repository.UserRepository;
import org.todoapp.service.UserService;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @SneakyThrows
    @Override
    public UserResponse getCurrentUserProfile() {
        UserEntity user = getCurrentUser();

        return UserResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .createdAt(user.getCreatedAt())
                .build();
    }

    @SneakyThrows
    @Override
    public UserResponse updateProfile(UserUpdateRequest request) throws ResourceNotFoundException {
        UserEntity currentUser = getCurrentUser();

        if (!request.getEmail().equals(currentUser.getEmail()) &&
                userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already in use");
        }

        currentUser.setUsername(request.getUsername());
        currentUser.setEmail(request.getEmail());

        return mapToUserResponse(userRepository.save(currentUser));
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) throws BadRequestException, ResourceNotFoundException {
        UserEntity currentUser = getCurrentUser();

        if (!passwordEncoder.matches(oldPassword, currentUser.getPassword())) {
            throw new BadRequestException("Current password is incorrect");
        }

        currentUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(currentUser);
    }

    @Override
    public void deleteAccount() throws ResourceNotFoundException {
        userRepository.delete(getCurrentUser());
    }

    private UserEntity getCurrentUser() throws ResourceNotFoundException {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private UserResponse mapToUserResponse(UserEntity user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
