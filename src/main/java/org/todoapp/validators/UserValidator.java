package org.todoapp.validators;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.todoapp.dto.UserDto;

import java.util.ArrayList;
import java.util.List;
@Slf4j(topic = "USER-VALIDATOR")
public class UserValidator {

    public static List<String> validateUser(UserDto user){
        List<String> errors = new ArrayList<>();
        if(user == null){
            errors.add("Please fill the first name");
            errors.add("Please fill the last name");
            errors.add("Please fill the username");
            errors.add("Please fill the email");
            errors.add("Please fill the user password");
            return errors;
        }

        if(StringUtils.isEmpty(user.getFirstName())){
            errors.add("Please fill the first name");
        }

        if(StringUtils.isEmpty(user.getLastName())){
            errors.add("Please fill the last name");
        }

        if(StringUtils.isEmpty(user.getUsername())){
            errors.add("Please fill the username");

        }

        if(StringUtils.isEmpty(user.getEmail())){
            errors.add("Please fill the email");
        }

        if(StringUtils.isEmpty(user.getPassword())){
            errors.add("Please fill the password");
        }
        if (errors.isEmpty()){
            log.info("the errors, {} ", errors);
        }

        return errors;
    }

    public static List<String> validateUserCredentials(String email, String password){
        List<String> errors = new ArrayList<>();

        if (StringUtils.isEmpty(email)){
            errors.add("Please fill the email");

        }

        if (StringUtils.isEmpty(password)){
            errors.add("Please fill the password");

        }

        return errors;
    }
}
