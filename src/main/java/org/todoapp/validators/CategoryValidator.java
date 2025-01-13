package org.todoapp.validators;

import lombok.extern.slf4j.Slf4j;

import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.todoapp.dto.CategoryDto;

import java.util.ArrayList;
import java.util.List;

@Slf4j(topic = "CATEGORY-VALIDATOR")
public class CategoryValidator {


    public static List<String> validatorCategory(CategoryDto categoryDto){
        List<String> errors = new ArrayList<>();

        if (categoryDto == null){
            errors.add("Please fill the name");
            errors.add("Please fill the description");
            return errors;
        }
        if(StringUtils.isEmpty(categoryDto.getName())){
            errors.add("Please fill the name");
        }
        if (StringUtils.isEmpty(categoryDto.getDescription())){
            errors.add("Please fill the description");
        }

        if(errors.isEmpty()){
            log.info("the errors with category validator {}", errors);
        }
        return errors;
    }
}
