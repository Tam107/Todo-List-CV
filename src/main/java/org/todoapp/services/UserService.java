package org.todoapp.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.todoapp.dto.UserDto;

import java.util.List;

public interface UserService {

    UserDto save(UserDto user) throws Exception;

    List<UserDto> findAll();

    Page<UserDto> findAll(Pageable pageable);

    Page<UserDto> findAllByKeyword(String keyword, Pageable pageable);

    UserDto findById(Long id);

    UserDto update(UserDto userDto);

    void delete(Long id);

    UserDto login(UserDto user);
}
