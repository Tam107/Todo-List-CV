package org.todoapp.services.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.todoapp.dto.UserDto;
import org.todoapp.exception.InvalidEntityException;
import org.todoapp.model.User;
import org.todoapp.repositories.UserRepository;
import org.todoapp.services.UserService;
import org.todoapp.validators.UserValidator;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j(topic = "USER-SERVICE")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    @Override
    @Transactional(rollbackFor = Exception.class)
    public UserDto save(UserDto user)  {
        List<String> errors = UserValidator.validateUser(user);
        if (!errors.isEmpty()){
            log.info("User is not valid {}", user);
            throw new InvalidEntityException("User is not valid");
        }

        return UserDto.fromEntity(userRepository.save(UserDto.toEntity(user)));
    }

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll().stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public Page<UserDto> findAll(Pageable pageable) {
        return userRepository.findAll(pageable).map(UserDto::fromEntity);
    }

    @Override
    public Page<UserDto> findAllByKeyword(String keyword, Pageable pageable) {
        return userRepository.findByKeyword(keyword, pageable).map(UserDto::fromEntity);
    }

    @Override
    public UserDto findById(Long id) {

        if (id == null){
            log.info("User id is null");
            return null;
        }
        return userRepository.findById(id).map(UserDto::fromEntity)
                .orElseThrow(() ->  new EntityNotFoundException("No user found with ID= " + id));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public UserDto update(UserDto userDto) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new EntityNotFoundException("User not found"));

        user.setFirstName(userDto.getFirstName());
        user.setLastName(user.getLastName());

        return UserDto.fromEntity(userRepository.save(user));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (id == null){
            log.error("User id is null");
            throw  new EntityNotFoundException("User id is null");
        }

        userRepository.deleteById(id);
    }

    @Override
    public UserDto login(UserDto user) {
        return null;
    }
}
