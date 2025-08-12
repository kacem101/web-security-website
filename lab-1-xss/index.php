<!DOCTYPE html>
<html>
<head>
    <title>Reflected XSS Lab</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #1e1e1e; /* Dark background */
        color: #f0f0f0; /* Light text color */
      }
      h1, h2 {
        color: #f0f0f0; /* Light heading color */
      }
      form {
        margin-top: 20px;
      }
      input[type="text"] {
        padding: 8px;
        width: 300px;
        background-color: #333; /* Darker input background */
        color: #f0f0f0; /* Light text in input field */
        border: 1px solid #555;
      }
      input[type="submit"] {
        padding: 8px 12px;
        background-color: #007BFF;
        color: white;
        border: none;
        cursor: pointer;
      }
    </style>
    <script>
      const flag = "FLAG{XSS_SUCCESS_e16c31f2}";
    </script>
</head>
<body>
    <h1>Reflected XSS Lab</h1>
    <p>Enter your name below and see what happens!</p>
    <form action="" method="GET">
        <input type="text" name="name" placeholder="Your Name">
        <input type="submit" value="Submit">
    </form>

    <?php
    if (isset($_GET['name'])) {
        $name = $_GET['name'];
        echo "<h2>Hello, " . $name . "!</h2>";
    }
    ?>
</body>
</html>