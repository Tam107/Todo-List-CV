package org.todoapp.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable; // Correct import
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.todoapp.entity.TaskDetails;
import org.todoapp.entity.UserEntity;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskDetails, Long> {

    Page<TaskDetails> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    Page<TaskDetails> findAll(Pageable pageable);

//    List<TaskDetails> findByUsername(String username);

    Page<TaskDetails> findByUser(UserEntity user, Pageable pageable);

    Page<TaskDetails> findByUserAndTitleContainingIgnoreCase(UserEntity user, String keyword, Pageable pageable);

    long countByUser(UserEntity user);

    @Modifying
    @Query("delete from TaskDetails t where t.user = :user")
    void deleteByUser(@Param("user") UserEntity user);

}
