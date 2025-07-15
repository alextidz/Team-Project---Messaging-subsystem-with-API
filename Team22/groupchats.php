<?php
session_start()
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Groupchats</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="chatstyle.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
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

        
        <main class="flex-1 p-6" id = "main">

            <div class="grid grid-cols-1 gap-6">
                <div class="card">
                    <div style="display:flex">
                        <div class="card-header" style="width:85%">Group Chats</div>
                        <div style="width:15%">
                            <button class="new-button" onclick=newgc()><i class="bi bi-plus-lg"></i> New Group</button>
                        </div>
                    </div>
                    <div style="display: flex;">
                        <div class="button-container">
                            <button class="filter-button" id="all-groups-button" onclick="showAllGroups()">All Groups</button>
                        </div>
                        <div class="button-container">
                            <button class="filter-button" id="unread-groups-button" onclick="showUnreadGroups()">Unread Groups</button>
                        </div>
                    </div>

                    <div class="search-container">
                        <input class="search-bar" id="groupchat-search" placeholder="Search for group" onkeyup="search()"></input>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="groups-header">All Groups</div>
                    <table class="chats-table">
                        <tbody id="groupchats-table">
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="groupchats.js"></script>
<script src = "notification.js"></script>
<script>
    function newgc(){
        window.location.href = "newgc.php";
    }
</script>
<script>
    const currentUserID = <?php echo $_SESSION['userID'] ?>;
    const currentUser = <?php echo $_SESSION['userID'] ?>;
    console.log("User id is:"+currentUserID);
</script>

</body>
</html>
