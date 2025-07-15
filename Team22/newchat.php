<?php
session_start()
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Chat</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="chatstyle.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>
<body>    
    <div class="min-h-screen flex">
   
        <aside class="w-1/4 pt-6 shadow-lg flex flex-col justify-between transition duration-500 ease-in-out transform" id="sidebar">            
                <div>
                    <form action="chats.php" class="sidebar-form">
                        <button type="submit" class="sidebar-btn-clicked"><div class="sidebar-cell"><i class="bi bi-chat-right-fill" style="padding-right:5px"></i><p style="padding-right: 5px;">Chats</p><div id="chats-notification" class="notification"></div></div></button>
                    </form>
                    <form action="groupchats.php" class="sidebar-form">
                        <button type="submit" class="sidebar-btn"><div class="sidebar-cell"><i class="bi bi-people" style="padding-right:5px"></i><p style="padding-right: 5px;">Group Chats</p><div id="groupchats-notification" class="notification"></div></div></button>
                    </form>
                    <form action="friends.php" class="sidebar-form">
                        <button type="submit" class="sidebar-btn"><div class="sidebar-cell"><i class="bi bi-person-check" style="padding-right:5px"></i><p style="padding-right: 5px;">Friends</p><div id="friends-notification" class="notification"></div></div></button>
                    </form>

                </div>
            
                        <div class="p-6 transition duration-500 ease-in-out transform">
                            <p class="mb-4 text-m" style="color:gray;text-align:center" id="user-logged-in"></p>
                            <form class="sidebar-form" action="sign in.php">
                                <button type="submit" class="logout-btn">Log Out</button>
                            </form>
                        </div>
        </aside>

        <main class="flex-1 p-6" id = "main">

        

                <div class="card">
                    <div style="display:flex;align-items:center">
                        <div style="width:5%;align-items:center;padding-bottom:12px">
                            <span class="material-symbols-outlined" id="back_symbol" style="font-size: 25px; color:white;" onclick="backButton()">arrow_back</span>
                        </div>
                        <div class="card-header" id="new-group-header" style="width:80%">New Chat</div>
                        
                    </div>
                    


                    <div class="search-container">
                        <div class="search-container" style="display:flex">
                            <div style="padding-right: 10px">
                                <input class="search-bar" id="people-search" placeholder="Search People" onkeyup="searchFriends()"></input>
                            </div>
                            
                        </div>
                        
                        
                        <div class="results-box"></div>
                    </div>

                    

                </div>

                <div class="card">
                    <div class="card-header" id="members-header">People</div>
                    <table class="people-table">
                        <tbody id="people-table">
                        </tbody>
                    </table>
                </div>
            

        </main>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="newchat.js"></script>
<script src = "notification.js"></script>
<script>
    const currentUserID = <?php echo $_SESSION['userID'] ?>;
    const currentUser = <?php echo $_SESSION['userID'] ?>;
    console.log("User id is:"+currentUserID);
</script>

</body>
</html>