<?php
session_start();
// $_SESSION['userID'] =1;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Groupchat</title>
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

        <main class="flex-1 p-6" id = "main">


                <div class="card">
                    <div style="display:flex;align-items:center">
                        <div style="width:5%;align-items:center;padding-bottom:12px">
                            <span class="material-symbols-outlined" id="back_symbol" style="font-size: 25px; color:white;" onclick="backButton()">arrow_back</span>
                        </div>
                        <div class="card-header" id="new-group-header" style="width:80%">New Group</div>
                        <div style="text-align:right; width:15%">
                            <button class="new-button" onclick = "createGroupChat()"><i class="bi bi-plus-lg"></i> Create Group</button>
                        </div>
                    </div>
                    


                    <div class="search-container">
                        <div class="search-container">
                            <input class="search-bar" id="title-search-bar" placeholder="Group Name" required></input>
                        </div>
                        <div class="search-container" style="display:flex">
                            <div style="padding-right: 10px">
                                <input class="search-bar" id="search-bar" placeholder="Add People"></input>
                            </div>
                            
                            <button class="filter-button" id="addFriendsButtonGC" type="button" onclick=addName()>Add Name</button>
                        </div>
                        
                        
                        <div class="results-box"></div>
                    </div>

                    

                </div>

                <div class="card">
                    <div class="card-header" id="members-header">Members</div>
                    <ul id="groupList">
                        <li class='people-list-items'><div class='members-list-container' id="member-current-user"><div class='members-list-name'></div></div></li>
                    </ul>
                </div>
            

        </main>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src = "notification.js"></script>

<script>

    

    //inserting friends from database:
    const inputtest = document.getElementById("search-bar").value;
    const listNames = document.getElementById("friendsList");
    const listRequests = document.getElementById("requestsList");

    const userID = <?php echo $_SESSION['userID'] ?>;
    console.log("User id is:"+userID);

    

    const inputBox = document.getElementById("search-bar");
    const resultsBox = document.querySelector(".results-box")


    function selectInput(x) {
            inputBox.value = x.innerHTML
            resultsBox.innerHTML = ""
        }

    fetch('http://localhost/Team22/API/users')
            .then(response => {
                console.log('Response:', response);
                return response.text(); // Get the response text
            })
            .then(text => {
                console.log('Response Text:', text); // Log the response text
                // Attempt to parse the response text as JSON
                const data = JSON.parse(text);
                console.log('Data:', data);

                var username;

                for (var i = 0; i < data.length; i++) {
                    if (data[i]['UserID'] == userID) {
                        username = data[i]['Username'];
                    }
                }

                document.getElementById("member-current-user").innerHTML = username + " (You)";
            })
            .catch(error => {
                console.error('Error:', error);
            });


    document.getElementById("search-bar").addEventListener("keyup", function() {
        
        const input = document.getElementById("search-bar").value

        if (input.length==0){
                console.log("NOTHING TYPED");
                resultsBox.innerHTML = ""
            }else{
                fetch('http://localhost/Team22/API/users')
                        .then(response => {
                            console.log('Response:', response);
                            return response.text(); // Get the response text
                        })
                        .then(text => {
                            console.log('Response Text:', text); // Log the response text
                            // Attempt to parse the response text as JSON
                            const users = JSON.parse(text);
                            console.log('Data:', users);

                            fetch('http://localhost/Team22/API/userfriends')
                            .then(response => {
                                console.log('Response:', response);
                                return response.text(); // Get the response text
                            })
                            .then(text => {
                                console.log('Response Text:', text); // Log the response text
                                // Attempt to parse the response text as JSON
                                const userfriends = JSON.parse(text);
                                console.log('Data:', userfriends);

                                var userfriends1 = [];
                                var userfriends2 = [];

                                for (var i = 0; i < userfriends.length; i++) {
                                    if (userfriends[i]['userid'] == userID) {
                                        userfriends1.push(userfriends[i]);
                                    } else if (userfriends[i]['friendsid'] == userID) {
                                        userfriends2.push(userfriends[i]);
                                    }
                                }


                                var friends = [];

                                for (var i = 0; i < userfriends1.length; i++) {
                                    for(var j = 0; j < users.length; j++) {
                                        if (users[j]['UserID'] == userfriends1[i]['friendsid']) {
                                            userfriends1[i]['Username'] = users[j]['Username'];
                                        }
                                    }
                                    friends.push(userfriends1[i]);
                                }

                                for (var i = 0; i < userfriends2.length; i++) {
                                    for(var j = 0; j < users.length; j++) {
                                        if (users[j]['UserID'] == userfriends2[i]['userid']) {
                                            userfriends2[i]['Username'] = users[j]['Username'];
                                        }
                                    }
                                    friends.push(userfriends2[i]);
                                }

                                content="";
                                friends.forEach(item=>{
                                    if (item.Username.toLowerCase().includes(input.toLowerCase())){
                                        content += "<li onclick=selectInput(this)>"+item.Username+"</li>";
                                    }
                                });
                                content = "<ul>"+content+"</ul>";
                                $(".results-box").html(content);

                                

                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });

                            

                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
            }


    });

    function addName() {
            
            const addname = document.getElementById("search-bar").value
            const listnames = document.getElementById("groupList")
            const listItems = listnames.getElementsByTagName("li")

            
            const membersList = []
            let duplicate = false

            

                for (let i = 0; i < listItems.length; i++) {
                    

                    //Line below ensures that the string only contains the name
                    const thename = listItems[i].textContent.replace("Remove", "")


                    if (thename === addname) {
                        //if name entered is already a team member then duplicate is set to true
                        duplicate = true
                        
                    } else {
                        //else adds name to list of team members
                        membersList.push(listItems[i].textContent.replace("Remove", ""))

                    }
                }

                if (duplicate==true){
                    alert("User already added");
                }else{
                    
                    fetch('http://localhost/Team22/API/users?Username='+addname)
                            .then(response => {
                                console.log('Response:', response);
                                return response.text(); // Get the response text
                            })
                            .then(text => {
                                console.log('Response Text:', text); // Log the response text
                                // Attempt to parse the response text as JSON
                                data = JSON.parse(text);
                                //console.log('Data:', data);
                                // console.log("Friend username is: "+data[0]['Username']);
                                // console.log("Friend userID is: "+data[0]['UserID']);
                                if (data.length==0){
                                alert("User not found");
                                }else{

                                listnames.innerHTML += "<li class='people-list-items'><div class='members-list-container'><div class='members-list-name'>"+addname+"</div><div class='members-list-button'><button class='remove-button' type='button' onclick='removeItem(this)'>Remove</button></div></div></li>";
                                
                                }
                                
                                
                            })
                            //---------------------------------------------------------------
                            .catch(error => {
                                console.error('Error:', error);
                            });

                
                }
            

                

            

    }

    function createGroupChat(){
        const listnames = document.getElementById("groupList")
        const listItems = listnames.getElementsByTagName("li")

        
        const peopleList = []

        const groupTitle = document.getElementById("title-search-bar").value
        console.log(groupTitle);

        if (groupTitle == "") {
            alert("Group Name required");
        } else if (listItems.length < 3) {
            alert("A minimum of 3 members are required to make a group");
        } else {
            //--------------------------------------
            const endpoint = 'http://localhost/Team22/API/groups';

            var now = new Date();
            var formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');

            var num = Math.floor((Math.random() * 10));


            const requestData = {
                GroupName: groupTitle,
                lastSender: userID,
                lastEvent: formattedDateTime,
                colour: num
            };
            
            console.log(requestData);

            // Convert the request data to a query string
            const queryParams = new URLSearchParams(requestData).toString();

            // Append the query parameters to the endpoint URL
            const requestUrl = `${endpoint}?${queryParams}`;

            // Define the request options
            const requestOptions = {
                method: 'POST',
                headers: {
                    'X-API-KEY': 'abc123' // Replace with a valid API key
                }
            };

            // Send the request
            fetch(requestUrl, requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Request failed with status ' + response.status);
                    }
                })
                .then(data => {
                    console.log('Response data:', data);
                    //alert("Request has been sent");
                    // Handle the response data as needed

                    console.log("post request works");

                    //---------------------------------------------------------------------------
                    fetch('http://localhost/Team22/API/groups?GroupName='+groupTitle)
                        .then(response => {
                            console.log('Response:', response);
                            return response.text(); // Get the response text
                        })
                        .then(text => {
                            console.log('Response Text:', text); // Log the response text
                            // Attempt to parse the response text as JSON
                            const data = JSON.parse(text);
                            console.log('Data:', data);
                            addToUserGroups(data[0]['GroupID']);


                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                        
                    //--------------------------------------------------------------------------
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle the error as needed
                });
            }


        //-----------------------------------------




        

       

    }

    function addToUserGroups(groupID){
        const listnames = document.getElementById("groupList")
        const listItems = listnames.getElementsByTagName("li")

        
        const newList = [];

        for (let i = 0; i < listItems.length; i++) {

            newList.push(listItems[i].textContent.replace("Remove", ""));
            console.log(newList[i]);

        }

        const peopleList = [];

        for (var i =0; i < newList.length; i++) {
            const textContent = newList[i];
            if (textContent) {
                peopleList.push(textContent.replace(" (You)", ""));
                console.log(peopleList[i]);
        }
        }

        membersList = []
        fetch('http://localhost/Team22/API/users')
            .then(response => {
                console.log('Response:', response);
                return response.text(); // Get the response text
            })
            .then(text => {
                console.log('Response Text:', text); // Log the response text
                // Attempt to parse the response text as JSON
                data = JSON.parse(text);
                //console.log('Data:', data);
                // console.log("Friend username is: "+data[0]['Username']);
                // console.log("Friend userID is: "+data[0]['UserID']);

                data.forEach(item=>{
                    for (let i = 0; i < peopleList.length; i++) {
                        if (item.Username==peopleList[i]){
                            membersList.push(item);
                        }
                        

                    }
                })

                for (let i = 0; i < membersList.length; i++) {
                    console.log("-------------------------------------------")
                    console.log("For user: "+membersList[i].UserID);
                    console.log("Group id is:"+groupID);
                    
                //---------
                    const endpoint = 'http://localhost/Team22/API/usergroups';

                    const requestData = {
                        UserID: membersList[i]['UserID'],
                        GroupID: groupID,
                        is_newChat: 0
                    };

                    // Convert the request data to a query string
                    const queryParams = new URLSearchParams(requestData).toString();

                    // Append the query parameters to the endpoint URL
                    const requestUrl = `${endpoint}?${queryParams}`;

                    // Define the request options
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'X-API-KEY': 'abc123' // Replace with a valid API key
                        }
                    };

                    // Send the request
                    fetch(requestUrl, requestOptions)
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error('Request failed with status ' + response.status);
                            }
                        })
                        .then(data => {
                            console.log('Response data:', data);
                            
                            // Handle the response data as needed
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            // Handle the error as needed
                        });




                //--------------------
                    }
                    alert("Group chat is created");
                    window.location.href = 'group_messages.php?GroupID=' + groupID;

                
                
                
            })
            //---------------------------------------------------------------
            .catch(error => {
                console.error('Error:', error);
            });
    }




    function removeItem(element) {
        //removeItem is called when the 'remove' button is pressed to remove a name from a team
        const urlParams = new URLSearchParams(window.location.search)

        
        let listItem = element.parentNode.parentNode.parentNode;
        console.log(listItem);


        // Get the parent <ul> element
        const list = listItem.parentNode

        // Remove the <li> element from the <ul> element
        list.removeChild(listItem)

    }

    function backButton() {
        window.location.href = 'groupchats.php';
    }

</script>
<script>
    const currentUserID = <?php echo $_SESSION['userID'] ?>;
    const currentUser = <?php echo $_SESSION['userID'] ?>;
    console.log("User id is:"+currentUserID);

</script>

</body>
</html>
