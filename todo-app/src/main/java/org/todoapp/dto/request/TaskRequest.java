package org.todoapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.todoapp.common.TaskStatus;

import java.util.Date;

@Data
public class TaskRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private Date startDate;

    private Date endDate;

    private TaskStatus status;
}
