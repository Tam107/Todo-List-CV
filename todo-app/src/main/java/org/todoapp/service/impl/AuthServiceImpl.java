package org.todoapp.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import org.todoapp.common.TokenType;
import org.todoapp.dto.request.LoginRequest;
import org.todoapp.dto.request.RegisterRequest;
import org.todoapp.dto.response.AuthResponse;
import org.todoapp.entity.Token;
import org.todoapp.entity.UserEntity;
import org.todoapp.exception.BadRequestException;
import org.todoapp.exception.ResourceNotFoundException;
import org.todoapp.repository.TokenRepository;
import org.todoapp.repository.UserRepository;
import org.todoapp.service.AuthService;
import org.todoapp.service.JwtService;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    @SneakyThrows
    @Override
    @Transactional(rollbackFor = Exception.class)
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already in use");
        }

        var user = UserEntity.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        UserEntity savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        log.info("{}", jwtToken);
        savedUserToken(savedUser, jwtToken, refreshToken);

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }


    protected void savedUserToken(UserEntity savedUser, String accessToken, String refreshToken) {
        var token = Token.builder()
                .user(savedUser)
                .token(accessToken)
                .refreshToken(refreshToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();

        tokenRepository.save(token);
    }


    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserToken(user);
        savedUserToken(user, jwtToken, refreshToken);

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @SneakyThrows
    @Override
    public AuthResponse refreshToken(String refreshToken) {
        // validate refresh token
        String userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail == null || !jwtService.isTokenValid(refreshToken, loadUserByUsername(userEmail))){
            throw new BadRequestException("Invalid or expired refresh token");
        }

        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));
        // check if the refresh token exists and is valid in the database
        Token storedToken = tokenRepository.findByRefreshToken(refreshToken)
                .filter(token -> !token.isExpired() && !token.isRevoked())
                .orElseThrow(() -> new BadRequestException("Refresh token not valid"));

        // generate new access and refresh tokens
        String newAccessToken = jwtService.generateToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);

        // revoke the old token
        storedToken.setExpired(true);
        storedToken.setRevoked(true);
        savedUserToken(user, newAccessToken, newRefreshToken);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken).build();
    }



    private void revokeAllUserToken(UserEntity user) {
        var validUserToken = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserToken.isEmpty()){
            return;
        }

        validUserToken.forEach(token ->{
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserToken);

    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Retrieve user from the database
        UserEntity user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        // Return user without roles
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.getAuthorities() // This will return an empty list or default authority
        );
    }

    @Override
    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
