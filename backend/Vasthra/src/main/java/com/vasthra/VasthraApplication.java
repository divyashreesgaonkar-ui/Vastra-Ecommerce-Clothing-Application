package com.vasthra;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.vasthra.entity.Admin;
import com.vasthra.entity.Role;
import com.vasthra.repository.AdminRepository;

@SpringBootApplication
public class VasthraApplication {

    public static void main(String[] args) {
        SpringApplication.run(VasthraApplication.class, args);
    }

    // 🔐 CREATE DEFAULT ADMIN ON STARTUP
    @Bean
    CommandLineRunner createAdmin(
            AdminRepository repo,
            PasswordEncoder encoder) {

        return args -> {
            if (repo.findByEmail("admin@vasthra.com").isEmpty()) {

                Admin admin = new Admin();
                admin.setName("Super Admin");
                admin.setEmail("admin@vasthra.com");
                admin.setPassword(encoder.encode("admin123"));
                admin.setPhone("9999999999");
                admin.setRole(Role.ADMIN);

                repo.save(admin);

                System.out.println(
                    "✅ Default admin created: admin@vasthra.com / admin123"
                );
            }
        };
    }
}
