package org.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.todoapp.entity.UserEntity;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

//    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findByEmail(String email);



    boolean existsByEmail(String email);
}
