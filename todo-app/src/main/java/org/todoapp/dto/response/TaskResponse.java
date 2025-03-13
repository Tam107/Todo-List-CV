package org.todoapp.dto.response;

import lombok.Builder;
import lombok.Data;
import org.todoapp.common.TaskStatus;
import org.todoapp.entity.UserEntity;

import java.util.Date;

@Data
@Builder
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private Date startDate;
    private Date endDate;
    private TaskStatus status;
    private UserEntity user;
}
