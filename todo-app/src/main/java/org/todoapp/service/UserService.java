package org.todoapp.service;

import org.todoapp.dto.request.UserUpdateRequest;
import org.todoapp.dto.response.UserResponse;
import org.todoapp.exception.BadRequestException;
import org.todoapp.exception.ResourceNotFoundException;

public interface UserService {
    UserResponse getCurrentUserProfile();
    UserResponse updateProfile(UserUpdateRequest request) throws ResourceNotFoundException;
    void changePassword(String oldPassword, String newPassword) throws BadRequestException, ResourceNotFoundException;
    void deleteAccount() throws ResourceNotFoundException;
}
