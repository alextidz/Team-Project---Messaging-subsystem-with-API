<?php
session_start();
if (isset($_SESSION['userID'])) {
    unset($_SESSION['userID']);
}
if (isset($_SESSION['userType'])) {
    unset($_SESSION['userType']);
}
if (isset($_SESSION['Username'])) {
    unset($_SESSION['Username']);
}



//$_SESSION['userID'] = 1;
//setcookie('userID', '0', time() + 360000, '/');

error_reporting(E_ALL);
ini_set('display_errors', 1);


//session_register('email');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Login</title>
</head>
<body>
    <div class="container">
        <div class="left-content"></div>
        <div class="left-container">
            <!-- <img src="sample-image.jpg" alt="Sample Image"> -->
        </div>
        <div class="right-container">
            <!-- <img src="logo.png" alt="logo Image"> -->
            <br>
            <br>
            <h1 class="typewriter">LOGIN</h1>
            
        <form id = "loginForm">
            <div class="form-group">
                    <!-- <label for="email">Email:</label> -->
                    <input type="email" placeholder="Email" class="textbox" id="email" name="email" required>
                </div>
                <div class="form-group">
                <!-- <label for="password">Password:</label> -->
                <div style="position: relative;">
                    <input type="password" name="password1" id="password" class="textbox"
                           placeholder="Enter your password" required>
                           
                    <i id="togglePassword" class="eye-icon" onclick="togglePasswordVisibility()">👁️</i>
                </div>
                <span id="passwordMessage" class="message"></span>
                <a href="forgotPassword.php" style="color: #007bff;">Forgotten password?</a>
            </div>
                <button type="submit" class="button" id="loginButton">Login</button>
                <!-- <a href="forgotPassword.php" style="color: #007bff;">Forgotten password?</a> -->
                <p>Don't have an account? <a href="registration.php" style="color: #007bff;">Register now</a></p>
            </form>

            <script> 
                document.getElementById("loginForm").addEventListener("submit", function(event) {
                    event.preventDefault(); // Prevent the form from submitting normally
            
                    var email = document.getElementById("email").value;
                    var password = document.getElementById("password").value;
            
                    console.log(email);
                    console.log(password);
                    
                    //changes made--------------------------------------------------------

                    fetch('http://localhost/Team22/API/users?Email='+email+'&Password='+password)
                            //will have to change url depending on file location
                            
                        .then(response => {
                            console.log('Response:', response);
                            return response.text(); // Get the response text
                        })
                        .then(text => {
                            console.log('Response Text:', text); // Log the response text
                            // Attempt to parse the response text as JSON
                            data = JSON.parse(text);
                            console.log('Data:', data);
                            //console.log(data[0]['Username']);

                            if (data.length==0){
                                alert("Wrong details");
                            }else{
                                //document.cookie = "userID="+data[0]['UserID'];
                                //console.log(document.cookie);
                                console.log("php start");

                                $.ajax({
                                    url: 'log in.php',
                                    type: 'POST',
                                    data: {
                                        userID: data[0]['UserID'],
                                        role: data[0]['UserType'],
                                        username: data[0]['Username']
                                    },
                                    success: function() {
                                        
                                        window.location.href = "homeScreen.php";
                                    },
                                    error: function() {
                                        alert("Error");
                                    }
                                });

                            }                        
                        
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                });
            </script>
