package org.todoapp.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.todoapp.dto.TodoDto;
import org.todoapp.model.Todo;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findTodoByCategoryId(Long categoryId);


    @Query("SELECT t from Todo t where (lower(t.title) like :keyword) " +
            "or (lower(t.description) like :keyword) ")
    Page<Todo> findTodoByKeyWord( String keyword, Pageable pageable);

}
