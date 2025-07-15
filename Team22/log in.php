<?php
session_start(); // Start session if not already started

$userID = $_POST['userID'];
$_SESSION['userID'] = $userID;

$role = $_POST['role'];
$_SESSION['userType'] = $role;

$username = $_POST['username'];
$_SESSION['Username'] = $username;

