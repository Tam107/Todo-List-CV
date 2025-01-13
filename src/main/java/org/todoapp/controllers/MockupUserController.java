package org.todoapp.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.todoapp.model.Category;
import org.todoapp.model.User;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mockup/user")
@Tag(name = "Mockup User Controller")
public class MockupUserController {

    @Operation(summary = "Get user list", description = "API retrieve user from database")
    @GetMapping("/list-users")
    public Map<String, Object> getList(@RequestParam(required = false) String keyword,
                                       @RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "20") int size){
        User user = new User();

        user.setId(1l);
        user.setFirstName("Nguyen");
        user.setLastName("Tam");
        user.setUsername("tam107");
        user.setEmail("tam@gmail.com");
        user.setPassword("123456");
        user.setCategory(List.of(new Category()));

        User user2 = new User();

        user2.setId(2l);
        user2.setFirstName("messi");
        user2.setLastName("Tam");
        user2.setUsername("tam07");
        user2.setEmail("ta@gmail.com");
        user2.setPassword("123456");
        user2.setCategory(List.of(new Category()));

        List<User> userList = List.of(user, user2);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("status", HttpStatus.OK.value());
        result.put("message", "user list");
        result.put("data", userList);

        return result;
    }

    @GetMapping("/list")
    public Map<String, Object> listTodo(@RequestParam(required = false) String keyword,
                                        @RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "20") int size){
        return null;
    }
}
