<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>Тест отправки заявки напрямую в базу данных</h2>";

try {
    // Подключаем базу данных
    require_once 'config/db.php';
    $pdo = getConnection();
    echo "✅ Подключение к БД успешно<br>";
    
    // Тестовые данные
    $testData = [
        'registration_type' => 'client',
        'contact_person' => 'Тестовый Пользователь',
        'phone' => '+7 (999) 123-45-67',
        'email' => 'test@example.com',
        'message' => 'Это тестовая заявка, созданная вручную для проверки работы базы данных.'
    ];
    
    // Вставляем тестовую запись
    $sql = "INSERT INTO requests (registration_type, contact_person, phone, email, message) 
            VALUES (:registration_type, :contact_person, :phone, :email, :message)";
    
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute($testData);
    
    if ($result) {
        $lastId = $pdo->lastInsertId();
        echo "✅ Тестовая заявка успешно добавлена! ID: " . $lastId . "<br>";
        
        // Проверяем, что запись добавилась
        $stmt = $pdo->query("SELECT * FROM requests WHERE id = " . $lastId);
        $newRecord = $stmt->fetch();
        echo "<h3>Добавленная запись:</h3>";
        echo "<pre>";
        print_r($newRecord);
        echo "</pre>";
    } else {
        echo "❌ Ошибка при добавлении тестовой заявки<br>";
    }
    
} catch (PDOException $e) {
    echo "❌ Ошибка базы данных: " . $e->getMessage() . "<br>";
}
?>