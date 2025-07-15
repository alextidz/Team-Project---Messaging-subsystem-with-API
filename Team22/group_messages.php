<?php
session_start()
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Group Messages</title>
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
                        <button type="submit" class="sidebar-btn"><div class="sidebar-cell"><i class="bi bi-chat-right" style="padding-right:5px"></i><p style="padding-right: 5px;">Chats</p><div id="chats-notification" class="notification"></div></div></button>
                    </form>
                    <form action="groupchats.php" class="sidebar-form">
                        <button type="submit" class="sidebar-btn-clicked"><div class="sidebar-cell"><i class="bi bi-people-fill" style="padding-right:5px"></i><p style="padding-right: 5px;">Group Chats</p><div id="groupchats-notification" class="notification"></div></div></button>
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
   


        
        <main class="flex-1 p-6" id="main">
        <div class="chat_area"> 

            <div class="card" style="padding-top: 13px; padding-bottom: 23px;">
                    <div class="header_container">
                        <span class="material-symbols-outlined" id="back_symbol" style="font-size: 30px; color:white; margin-top: 14px;" onclick="clickbackspan()">arrow_back</span>
                        <div class="chat_name" id="chat_name"> 
                            <!-- Username is generated here by JS  -->
                        </div>  
                        <div class = "group-options-container">
                            <button class="new-button" onclick="redirectToOptions()">Group Options</button>
                        </div>
                    </div>
            </div>

            <div class="previous_messages_area" id="previous_messages_area">
                <div class="all_messages_container" id="all_messages">
                    <!-- messages are generated here by the javascript
                    date banners are also generated in here by the javascript -->
                    <!-- <div>Jack<div> -->
                    <!-- <div class="imessage">
                        <div class="member_Label">Jack</div>
                        <p class="group-from-them">Testingasadasda aaaaaaaa aaaaaaaa aaaaaa aaa aaaa aaaaaaa  aaaaaaaaaaaaaaaaa...    aaaaaaa aaaaaa aaaa</p>

                        <div>Jack</div>
                        <p class="group-from-them">Testing</p>

                        <div>Jack</div>
                        <p class="group-from-them">Testing</p>
                    </div> -->
                </div>
            </div>

            <div class="create_message_area">
                <div class="message_container">
                    <textarea id="new_msg_area" placeholder="Type a message..." rows="1"></textarea>
                    <button class="send_message" onclick="sendMessage()"><span class="material-symbols-outlined" id="send_symbol" style="font-size: 30px; color:white;">send</span></button>
                </div> 
            </div>


        </div>

    </main>
    </div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="group_messages.js"></script>
<script src = "notification.js"></script>
<script>
    const currentUserID = <?php echo $_SESSION['userID'] ?>;
    const currentUser = <?php echo $_SESSION['userID'] ?>;
    console.log("User id is:"+currentUserID);
</script>

</body>
</html>