package org.todoapp;

import com.google.firebase.FirebaseApp;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class FirebaseConfigTest {

    @Autowired
    private FirebaseApp firebaseApp;

    @Test
    void testFirebaseConnection() {
        assertNotNull(firebaseApp);
        // Chỉ kiểm tra null là đủ vì mục đích là test kết nối
        // Hoặc nếu muốn test name, có thể dùng:
        assertEquals("[DEFAULT]", firebaseApp.getName());
    }
}
