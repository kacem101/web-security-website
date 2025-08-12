<!DOCTYPE html>
<html>
<head>
    <title>SQL Injection Lab</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      h1, h2 { color: #333; }
      form { margin-top: 20px; }
      input[type="text"] { padding: 8px; width: 300px; }
      input[type="submit"] { padding: 8px 12px; background-color: #28a745; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h1>SQL Injection Lab</h1>
    <p>Search for a user by ID:</p>
    <form action="" method="GET">
        <input type="text" name="id" placeholder="Enter User ID">
        <input type="submit" value="Search">
    </form>

    <?php
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $conn = new mysqli('db', 'root', 'password', 'testdb');
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM users WHERE id = $id";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<h2>User Found:</h2>";
                echo "ID: " . $row["id"]. " - Name: " . $row["name"]. "<br>";
            }
        } else {
            echo "<h2>No user found with ID: " . $id . "</h2>";
        }
        $conn->close();
    }
    ?>
</body>
</html>