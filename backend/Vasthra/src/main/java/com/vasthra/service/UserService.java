package com.vasthra.service;

import java.util.Set;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vasthra.dto.LoginRequest;
import com.vasthra.dto.RegisterRequest;
import com.vasthra.entity.Role;
import com.vasthra.entity.User;
import com.vasthra.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ REGISTER
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        // encrypt password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // default role
        user.setRole(Set.of(Role.USER));

        userRepository.save(user);

        return "User registered successfully";
    }

    // ✅ LOGIN
    public void login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                    new RuntimeException("Invalid email or password"));

        boolean match = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!match) {
            throw new RuntimeException("Invalid email or password");
        }

        // If credentials are correct → method simply ends
    }

}