package org.todoapp.validators;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.todoapp.dto.TodoDto;

import java.util.ArrayList;
import java.util.List;

@Slf4j(topic = "TODO-VALIDATOR")
public class TodoValidator {

    public static List<String> validateTodo(TodoDto todoDto){

        List<String> errors = new ArrayList<>();

        if(todoDto == null){
            errors.add("Please fill the title");
            errors.add("Please fill the description");
            errors.add("Please select a category");

        }

        if(StringUtils.isEmpty(todoDto.getTitle())){
            errors.add("Please fill the title");
        }

        if(StringUtils.isEmpty(todoDto.getDescription())){
            errors.add("Please fill the description");
        }

        if (todoDto.getCategory() == null || todoDto.getCategory().getId() == null) {
            errors.add("Please select a category");
        }

        return errors;
    }
}
