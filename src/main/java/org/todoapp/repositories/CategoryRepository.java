package org.todoapp.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.todoapp.dto.CategoryDto;
import org.todoapp.model.Category;
import org.todoapp.model.Todo;
import org.todoapp.model.User;

import java.time.ZonedDateTime;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findCategoriesByUserId(Long userId);

    @Query("select t.category.id from Todo t where t.id = :todoId")
    Long findCategoryByTodoId(Long todoId);

    @Query("SELECT c FROM Category c WHERE " +
            "LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%')) ")
    Page<Category> findByKeyword(String keyword, Pageable pageable);

    @Query("select c from Category c inner  join Todo t on t.category.id = c.id where t.startDate >= :startDate and t.startDate <= :endDate and c.user.id =:userId")
    List<Category> getAllTodoByCategoriesForToday(@Param("startDate")ZonedDateTime startDate, @Param("endDate") ZonedDateTime endDate, @Param("userId") Long userId );
}
