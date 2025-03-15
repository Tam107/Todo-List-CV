package org.todoapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.todoapp.common.TaskStatus;

import java.util.Date;

@Entity
@Table(name = "task")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TaskDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-incremented ID
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Enumerated(EnumType.STRING) // Thêm annotation này
    @Column(name = "task_status")
    private TaskStatus status = TaskStatus.DOING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Override
    public String toString() {
        return "TaskDetails(id=" + id + ", title=" + title + ", startDate=" + startDate + ", endDate=" + endDate + ")";
    }
}
