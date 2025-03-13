package org.todoapp.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.todoapp.model.User;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String username;

    private String password;

    @JsonIgnore
    private List<CategoryDto> category;

    public static User toEntity(UserDto userDto){
        final User user = new User();

        user.setId(userDto.getId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setCategory(
                userDto.getCategory() != null ? userDto.getCategory().stream().map(CategoryDto::toEntity).collect(Collectors.toList()) : null
        );
        return user;
    }

    public static UserDto fromEntity(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .password(user.getPassword())
                .email(user.getEmail())
                .category(
                        user.getCategory() != null ? user.getCategory().stream().map(CategoryDto::fromEntity).collect(Collectors.toList()) : null
                )
                .build();
    }
}
