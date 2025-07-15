<?php
session_start()
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<script>
        <?php
            $testString = "Session user id:".$_SESSION['userID'];
            echo "console.log('".$testString."');";

            $testString = "Session user role:".$_SESSION['userType'];
            echo "console.log('".$testString."');";
        ?>
</script>
<body>
    <header class="navbar">
        <div class="navbar-brand"></div>
    </header>
    <aside class="sidebar">
        <div class="user-info">Current User ID is: <?php echo $_SESSION['userID'] ?>



        </div> <!-- Hard-coded user name -->
        <button class="sidebar-btn" onclick="window.location.href = './chats.php'">Text Chat</button>
        <button class="sidebar-btn" onclick="window.location.href = './DataAnalytics'">Data Analytics</button>
    </aside>
    <main class="content">
        <!-- Your main content goes here -->


    </main>
</body>
</html>
