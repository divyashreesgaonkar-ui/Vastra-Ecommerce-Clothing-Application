package com.vasthra.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vasthra.dto.AdminRegisterRequest;
import com.vasthra.dto.LoginRequest;
import com.vasthra.entity.Admin;
import com.vasthra.entity.Role;
import com.vasthra.repository.AdminRepository;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository,
                        PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 🔹 ADMIN REGISTER (INTERNAL USE ONLY)
    public void register(AdminRegisterRequest request) {

        if (adminRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Admin already exists");
        }

        Admin admin = new Admin();
        admin.setName(request.getName());
        admin.setEmail(request.getEmail());
        admin.setPhone(request.getPhone());

        // ✅ ALWAYS hash password
        admin.setPassword(passwordEncoder.encode(request.getPassword()));

        admin.setRole(Role.ADMIN);

        adminRepository.save(admin);
    }

    // 🔹 ADMIN LOGIN (STRICT & RELIABLE)
    public void login(LoginRequest request) {

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid admin credentials"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword()
        )) {
            throw new RuntimeException("Invalid admin credentials");
        }

        // ✔ success → method exits
    }
}
