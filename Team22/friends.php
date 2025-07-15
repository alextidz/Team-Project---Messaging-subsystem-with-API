<?php
session_start()
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Friends</title>
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
                        <button type="submit" class="sidebar-btn"><div class="sidebar-cell"><i class="bi bi-people" style="padding-right:5px"></i><p style="padding-right: 5px;">Group Chats</p><div id="groupchats-notification" class="notification"></div></div></button>
                    </form>
                    <form action="friends.php" class="sidebar-form">
                        <button type="submit" class="sidebar-btn-clicked"><div class="sidebar-cell"><i class="bi bi-person-check-fill" style="padding-right:5px"></i><p style="padding-right: 5px;">Friends</p><div id="friends-notification" class="notification"></div></div></button>
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
                    <div class="card-header">Friends</div>
                    <div style="display: flex;">
                        <div class="button-container">
                            <button class="filter-button" id="my-friends-button" onclick="showFriends()">Friends</button>
                        </div>
                        <div class="button-container">
                            <button class="filter-button" id="requests-button" style="display:flex; padding-right: 5px;" onclick="showRequests()">Requests<div id="requests-notification" class="requests-notification"></div></button>
                        </div>
                    </div>
                </div>

                <div class="card" id="add-friends-card">
                    <div class = "card-header">Add Friends</div>
                    
                    <div class="search-container">
                        <input class="search-bar" id="search-bar" placeholder="Search for people" style ="margin-right:5px"></input>
                        <button class="filter-button" id="addFriendsButton" type="button" onclick=addName()>Add</button>
                        <div class="results-box"></div>
                    </div>
                </div>


                <div class="card">
                    <div class="card-header" id="friends-header">My Friends</div>

                    <div class="search-container" style="padding-bottom:20px">
                        <input class="search-bar" id="my-friends-search-bar" placeholder="Search My Friends" style ="margin-right:5px"></input>
                    </div>
                    
                    <ul id="friendsList">
                    </ul>

                    <ul id="requestsList">
                    </ul>

                </div>

                <div class = "card" id ="sent-requests-card">
                    <div class = "card-header">Sent Requests</div>
                    <ul id="sentRequestsList">

                    </ul>
                </div>

            </div>

        </main>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src = "friends.js"></script>
<script src = "notification.js"></script>
<script>
    //inserting friends from database:
    const inputtest = document.getElementById("search-bar").value;
    const listNames = document.getElementById("friendsList");
    const listRequests = document.getElementById("requestsList");
    const listSentRequests =document.getElementById("sentRequestsList");

    const userID = <?php echo $_SESSION['userID'] ?>;
    console.log("User id is:"+userID);

    let sentRequestsCard =document.getElementById("sent-requests-card");
    sentRequestsCard.setAttribute("hidden", "hidden");

    
    fetch('http://localhost/Team22/API/userfriends?UserID='+userID+'&is_accepted=1')
        .then(response => {
            //console.log('Response:', response);
            return response.text(); // Get the response text
        })
        .then(text => {
           //console.log('Response Text:', text); // Log the response text
            // Attempt to parse the response text as JSON
            const data = JSON.parse(text);
            //console.log('Data:', data);
            //content="";

            fetch('http://localhost/Team22/API/users')
                .then(response => {
                    //console.log('Response:', response);
                    return response.text(); // Get the response text
                })
                .then(text => {
                    //console.log('Response Text:', text); // Log the response text
                    // Attempt to parse the response text as JSON
                    const data2 = JSON.parse(text);
                    console.log('Data:', data2);
                    content="";
                    userNames=[];
                    data2.forEach(item2=>{
                        data.forEach(item=>{
                            if (item.friendsid==item2.UserID){
                                content += "<li class='people-list-items'><div class='members-list-container'><div class='members-list-name'>"+item2.Username+"</div><div class='members-list-button'><button class='remove-button' type='button' onclick='removeFriend(this)'>Remove</button></div></div></li>";
                                //content += "<li>"+item2.Username+"<button type='button' onclick='removeItem(this)'>remove</button></li>";
                                userNames.push(item2.Username);
                                        
                            }
                        })
                        
                        
                    });



                    fetch('http://localhost/Team22/API/userfriends?FriendsID='+userID+'&is_accepted=1')
                        .then(response => {
                            console.log('Response:', response);
                            return response.text(); // Get the response text
                        })
                        .then(text => {
                            console.log('Response Text:', text); // Log the response text
                            // Attempt to parse the response text as JSON
                            const data3 = JSON.parse(text);
                            console.log('Data:', data3);
                            //content="";
                            data3.forEach(item3=>{
                                data2.forEach(x=>{
                                    if (x.UserID==item3.userid){
                                        if (userNames.includes(x.Username)){
                                            console.log(x.Username+" is already in the list");
                                        }else{
                                            console.log(x.Username+" is now part of the list");
                                            userNames.push(x.Username);
                                            content += "<li class='people-list-items'><div class='members-list-container'><div class='members-list-name'>"+x.Username+"</div><div class='members-list-button'><button class='remove-button' type='button' onclick='removeFriend(this)'>Remove</button></div></div></li>";
                                            //content += "<li>"+x.Username+"<button type='button' onclick='removeItem(this)'>remove</button></li>";

                                        }
                                    }
                                })
                            })

                            //console.log(content);
                            console.log("Your friends are:");
                            for (let i = 0; i < userNames.length; i++) {
                                console.log(userNames[i]);
                            }
                            console.log(content);
                            listNames.innerHTML = content;
                                
                                
                                
                                

                        })
                    .catch(error => {
                        console.error('Error:', error);
                    });



                })
                .catch(error => {
                    console.error('Error:', error);
                });
                    
                    

            })
            .catch(error => {
                console.error('Error:', error);
            });





    const inputBox = document.getElementById("search-bar");
    const resultsBox = document.querySelector(".results-box")

    //Functions to disable/enable buttons depedning on which is clicked

    function disableMyFriendsButton() {
        document.getElementById("my-friends-button").disabled = true;
        document.getElementById("my-friends-button").style.background = "#77aafc";
        document.getElementById("my-friends-button").style.pointerEvents = "none";
    }

    function disableRequestsButton() {
        document.getElementById("requests-button").disabled = true;
        document.getElementById("requests-button").style.background = "#77aafc";
        document.getElementById("requests-button").style.pointerEvents = "none";
    }

    function enableMyFriendsButton() {
        document.getElementById("my-friends-button").disabled = false;
        document.getElementById("my-friends-button").style.background = "#1F75FE";
        document.getElementById("my-friends-button").style.pointerEvents = "all";
    }

    function enableRequestsButton() {
        document.getElementById("requests-button").disabled = false;
        document.getElementById("requests-button").style.background = "#1F75FE";
        document.getElementById("requests-button").style.pointerEvents = "all";
    }


    function showFriends() {
        generateFriendsNotification();
        generateRequestsNotification();

        const cardHeader = document.getElementById("friends-header");
        cardHeader.textContent = "My Friends"; 

        disableMyFriendsButton();
        enableRequestsButton();

        let addFriendsCard = document.getElementById("add-friends-card");
        let hidden = addFriendsCard.getAttribute("hidden");
        //alert("test");
        if (hidden) {
            addFriendsCard.removeAttribute("hidden");
        }

        unhideFriendsList();

        let requestsElement = document.getElementById("requestsList");
        requestsElement.setAttribute("hidden", "hidden");

        let sentRequestsElement =document.getElementById("sent-requests-card");
        sentRequestsElement.setAttribute("hidden", "hidden");

        let myFriendsSearchBar =document.getElementById("my-friends-search-bar");
        let hidden2 = myFriendsSearchBar.getAttribute("hidden");
        //alert("test");
        if (hidden2) {
            myFriendsSearchBar.removeAttribute("hidden");
        }
    }

    function showRequests(){
        const cardHeader = document.getElementById("friends-header");
        cardHeader.textContent = "Requests"; 

        disableRequestsButton();
        enableMyFriendsButton();

        let element = document.getElementById("friendsList");
        element.setAttribute("hidden", "hidden");

        let addFriendsCard = document.getElementById("add-friends-card");
        addFriendsCard.setAttribute("hidden", "hidden")


        let requestsElement = document.getElementById("requestsList");
        let hidden = requestsElement.getAttribute("hidden");
        //alert("test");
        if (hidden) {
            requestsElement.removeAttribute("hidden");
        }

        let sentRequestsElement = document.getElementById("sent-requests-card");
        let hidden2 = sentRequestsElement.getAttribute("hidden");
        //alert("test");
        if (hidden2) {
            sentRequestsElement.removeAttribute("hidden");
        }

        let myFriendsSearchBar =document.getElementById("my-friends-search-bar");
        myFriendsSearchBar.setAttribute("hidden", "hidden");


        fetch('http://localhost/Team22/API/userfriends?FriendsID='+userID+'is_accepted=0')
                .then(response => {
                    console.log('Response:', response);
                    return response.text(); // Get the response text
                })
                .then(text => {
                    console.log('Response Text:', text); // Log the response text
                    // Attempt to parse the response text as JSON
                    const data = JSON.parse(text);
                    //data is userfriends table
                    console.log('Data:', data);
                    //content="";

                    

                    fetch('http://localhost/Team22/API/users')
                        .then(response => {
                            console.log('Response:', response);
                            return response.text(); // Get the response text
                        })
                        .then(text => {
                            console.log('Response Text:', text); // Log the response text
                            // Attempt to parse the response text as JSON
                            const data2 = JSON.parse(text);
                            console.log('Data:', data2);
                            content="";

                            //data is userfriends table
                            //data2 is users table
                            data2.forEach(item2=>{
                                data.forEach(item=>{
                                    if (item.userid==item2.UserID && item.is_accepted==0){
                                        content += "<li class='people-list-items'><div class='members-list-container'><div class='members-list-name'>"+item2.Username+"</div><div class='members-list-button' style='space-between:'><button class='remove-button' type='button' id='denyRequest' onclick='denyRequest(this)'>Deny</button><button class='accept-button' type='button' onclick='acceptRequest(this)'>Accept</button></div></div></li>";
                                    }
                                })
                                //content += "<li>"+item2.Username+"<button type='button' onclick='removeItem(this)'>remove</button></li>";
                            });
                            listRequests.innerHTML = content;

                            showSentRequests();

                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    
                    
                        
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        
                

    }


    function showSentRequests () {
        fetch('http://localhost/Team22/API/userfriends?userid='+userID+'is_accepted=0')
                .then(response => {
                    console.log('Response:', response);
                    return response.text(); // Get the response text
                })
                .then(text => {
                    console.log('Response Text:', text); // Log the response text
                    // Attempt to parse the response text as JSON
                    const data = JSON.parse(text);
                    //data is userfriends table
                    console.log('Data:', data);
                    //content="";

                    

                    fetch('http://localhost/Team22/API/users')
                        .then(response => {
                            console.log('Response:', response);
                            return response.text(); // Get the response text
                        })
                        .then(text => {
                            console.log('Response Text:', text); // Log the response text
                            // Attempt to parse the response text as JSON
                            const data2 = JSON.parse(text);
                            console.log('Data:', data2);
                            content="";

                            //data is userfriends table
                            //data2 is users table
                            data2.forEach(item2=>{
                                data.forEach(item=>{
                                    if (item.friendsid==item2.UserID && item.is_accepted==0 && item.friendsid != userID){
                                        content += "<li class='people-list-items'><div class='members-list-container'><div class='members-list-name'>"+item2.Username+"</div><div class='members-list-button' style='space-between:'><button class='remove-button' type='button' id='cancelRequest' onclick='cancelRequest(this)'>Cancel</button></div></div></li>";
                                    }
                                })
                                //content += "<li>"+item2.Username+"<button type='button' onclick='removeItem(this)'>remove</button></li>";
                            });
                            listSentRequests.innerHTML = content;

                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    
                    
                        
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    }


    function unhideFriendsList(){
        let friendsListElement = document.getElementById("friendsList");

        let hidden = friendsListElement.getAttribute("hidden");
        //alert("test");
        if (hidden) {
            friendsListElement.removeAttribute("hidden");
        }


    }

    function selectInput(x) {
            //selectInput is called by clicking on a name displayed in the div results-box
            //the name is then displayed in the input box with id 'members-entry'
            inputBox.value = x.innerHTML
            resultsBox.innerHTML = ""
        }

    document.getElementById("search-bar").addEventListener("keyup", function() {
        //When the input box 'members-entry' has had a key entered in it
        const input = document.getElementById("search-bar").value

        if (input.length == 0) {
            resultsBox.innerHTML = "";
        } else {
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
                        content="";
                        data.forEach(item=>{
                            if (item.UserID == userID) {

                            } else if (item.Username.toLowerCase().includes(input.toLowerCase())){
                                content += "<li onclick=selectInput(this)>"+item.Username+"</li>";
                            }
                        });
                        content = "<ul>"+content+"</ul>";
                        $(".results-box").html(content);

                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
        }


    });

    document.getElementById("my-friends-search-bar").addEventListener("keyup", function() {
        //When the input box 'members-entry' has had a key entered in it
        const input = document.getElementById("my-friends-search-bar").value.toUpperCase();
        console.log(input);

        fetch('http://localhost/Team22/API/userfriends')
                    .then(response => {
                        console.log('Response:', response);
                        return response.text(); // Get the response text
                    })
                    .then(text => {
                        console.log('Response Text:', text); // Log the response text
                        // Attempt to parse the response text as JSON
                        const data = JSON.parse(text);
                        console.log('Data:', data);

                        var userfriends = [];

                        for (var i = 0; i < data.length; i++) {
                            if ((data[i]['userid'] == userID || data[i]['friendsid'] == userID) && data[i]['is_accepted'] == 1) {
                                userfriends.push(data[i]);
                            }
                        }

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

                            content = "";

                            for (var i = 0; i < userfriends.length; i++) {
                                if (userfriends[i]['userid'] == userID) {
                                    for (var j = 0; j < users.length; j++) {
                                        if (userfriends[i]['friendsid'] == users[j]['UserID']) {
                                            var name = String(users[j]['Username']).toUpperCase();
                                            if (name.indexOf(input) !== -1) {
                                                content += "<li class='people-list-items'><div class='members-list-container'><div class='members-list-name'>"+users[j]['Username']+"</div><div class='members-list-button'><button class='remove-button' type='button' onclick='removeFriend(this)'>Remove</button></div></div></li>";
                                            }
                                        }
                                    }
                                } else if (userfriends[i]['friendsid'] == userID) {
                                    for (var j = 0; j < users.length; j++) {
                                        if (userfriends[i]['userid'] == users[j]['UserID']) {
                                            var name = String(users[j]['Username']).toUpperCase();
                                            if (name.indexOf(input) !== -1) {
                                                content += "<li class='people-list-items'><div class='members-list-container'><div class='members-list-name'>"+users[j]['Username']+"</div><div class='members-list-button'><button class='remove-button' type='button' onclick='removeFriend(this)'>Remove</button></div></div></li>";
                                            }
                                        }
                                    }
                                }
                                
                            }
                            console.log(content);
                            listNames.innerHTML = content;

                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });

                    
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });


    });

    function addName() {
            //buttonfunc is a function that adds the name entered in input box 'members-entry' and displays it in 'team-members- as a list
            const addname = document.getElementById("search-bar").value
            const listnames = document.getElementById("friendsList")
            const listItems = listnames.getElementsByTagName("li")

            // Checks for name entered is already in the team
            const membersList = []
            let duplicate = false

            for (let i = 0; i < listItems.length; i++) {
                //for loop goes through the current team members

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
                alert("You are already friends with this person");
            }else{

                //fetch('http://localhost/API/users?Username='+addname)
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
                        

                        if (data.length == 0) {
                            alert("No User found");
                        } else {

                        console.log("Friend username is: "+data[0]['Username']);
                        console.log("Friend userID is: "+data[0]['UserID']);

                        fetch('http://localhost/Team22/API/userfriends')
                            .then(response => {
                                console.log('Response:', response);
                                return response.text(); // Get the response text
                            })
                            .then(text => {
                                console.log('Response Text:', text); // Log the response text
                                // Attempt to parse the response text as JSON
                                userfriends = JSON.parse(text);

                                var proceed = true;
                                    
                                for (var i = 0; i < userfriends.length; i++) {
                                    if (userfriends[i]['userid'] == userID && userfriends[i]['friendsid'] == data[0]['UserID'] && userfriends[i]['is_accepted'] == 0) {
                                        alert("You have already sent this person a Friend Request");
                                        proceed = false
                                    } else if (userfriends[i]['friendsid'] == userID && userfriends[i]['userid'] == data[0]['UserID'] && userfriends[i]['is_accepted'] == 0) {
                                        alert("You have a pending Friend Request from this user");
                                        proceed = false;
                                    }
                                }

                                if (proceed == true) {

                                    //POST
                                    //---------------------------------------------------------------------------
                                    const endpoint = 'http://localhost/Team22/API/userfriends';

                                    const requestData = {
                                        userid: userID.toString(),
                                        friendsid: data[0]['UserID'].toString()
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
                                            alert("Request has been sent");
                                            // Handle the response data as needed
                                        })
                                        .catch(error => {
                                            console.error('Error:', error);
                                            // Handle the error as needed
                                        });
                                    
                                    
                                }
                            })
                            
                            //---------------------------------------------------------------

                            .catch(error => {
                                console.error('Error:', error);
                            });
                        }
                                
                    })
                    
                    //---------------------------------------------------------------

                    .catch(error => {
                        console.error('Error:', error);
                    });

            }

            

    }

    function removeFriend(element) {
        if (confirm("Are you sure you want to remove this friend?") == true) {
        const urlParams = new URLSearchParams(window.location.search)

        let listItem = element.parentNode.parentNode

        const text = listItem.textContent.trim()
        const name = text.replace("Remove", "")

        console.log(name);

        fetch('http://localhost/Team22/API/users?Username='+name)
                .then(response => {
                    console.log('Response:', response);
                    return response.text(); // Get the response text
                })
                .then(text => {
                    console.log('Response Text:', text); // Log the response text
                    // Attempt to parse the response text as JSON
                    data = JSON.parse(text);
                    //console.log('Data:', data);
                    console.log("Friend username is: "+data[0]['Username']);
                    console.log("Friend userID is: "+data[0]['UserID']);

                    

                    fetch('http://localhost/Team22/API/userfriends')
                        .then(response => {
                            console.log('Response:', response);
                            return response.text(); // Get the response text
                        })
                        .then(text => {
                            console.log('Response Text:', text); // Log the response text
                            // Attempt to parse the response text as JSON
                            userfriends = JSON.parse(text);

                            var thisUserID;
                            var friendsUserID;

                            for (var i = 0; i < userfriends.length; i++) {
                                if (userfriends[i]['userid'] == userID && userfriends[i]['friendsid'] == data[0]['UserID'] && userfriends[i]['is_accepted'] == 1) {
                                    thisUserID = userID;
                                    friendsUserID = data[0]['UserID'];
                                } else if (userfriends[i]['friendsid'] == userID && userfriends[i]['userid'] == data[0]['UserID'] && userfriends[i]['is_accepted'] == 1) {
                                    thisUserID = data[0]['UserID'];
                                    friendsUserID = userID;
                                }
                            }


                            const endpoint = 'http://localhost/Team22/API/userfriends';

                            const requestData = {
                                userid: thisUserID,
                                friendsid: friendsUserID
                            };

                            const queryParams = new URLSearchParams(requestData).toString();

                            // Append the query parameters to the endpoint URL
                            const requestUrl = `${endpoint}?${queryParams}`;

                            // Define the request options
                            const requestOptions = {
                                method: 'DELETE',
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
                                    removeItem(element);
                                    alert("Friend removed");
                                    // Handle the response data as needed
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    // Handle the error as needed
                                });

                            })
                            
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    

                })
                
                .catch(error => {
                    console.error('Error:', error);
                });
            }

    }


    function denyRequest(element) {
        if (confirm("Are you sure you want to deny friend request?") == true) {
        const urlParams = new URLSearchParams(window.location.search)

        let listItem = element.parentNode.parentNode

        const text = listItem.textContent.trim()
        const name = text.replace("DenyAccept", "")

        fetch('http://localhost/Team22/API/users?Username='+name)
            .then(response => {
                console.log('Response:', response);
                return response.text(); // Get the response text
            })
            .then(text => {
                console.log('Response Text:', text); // Log the response text
                // Attempt to parse the response text as JSON
                data = JSON.parse(text);
                //console.log('Data:', data);
                console.log("Friend username is: "+data[0]['Username']);
                console.log("Friend userID is: "+data[0]['UserID']);

                fetch('http://localhost/Team22/API/userfriends')
                    .then(response => {
                        console.log('Response:', response);
                        return response.text(); // Get the response text
                    })
                    .then(text => {
                        console.log('Response Text:', text); // Log the response text
                        // Attempt to parse the response text as JSON
                        userfriends = JSON.parse(text);

                        var thisUserID;
                        var friendsUserID;
                        
                        for (var i = 0; i < userfriends.length; i++) {
                            if (userfriends[i]['userid'] == data[0]['UserID'] && userfriends[i]['friendsid'] == userID && userfriends[i]['is_accepted'] == 0) {
                                thisUserID = data[0]['UserID'];
                                friendsUserID = userID;
                            }
                        }

                        const endpoint = 'http://localhost/Team22/API/userfriends';

                            const requestData = {
                                userid: thisUserID,
                                friendsid: friendsUserID
                            };

                            const queryParams = new URLSearchParams(requestData).toString();

                            // Append the query parameters to the endpoint URL
                            const requestUrl = `${endpoint}?${queryParams}`;

                            // Define the request options
                            const requestOptions = {
                                method: 'DELETE',
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
                                    removeItem(element);
                                    alert("Request Denied");
                                    // Handle the response data as needed
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    // Handle the error as needed
                                });
                        



                    })
                    
                    .catch(error => {
                        console.error('Error:', error);
                    });



            })
            
            .catch(error => {
                console.error('Error:', error);
            });
        }
        
    }


    function cancelRequest(element) {
        if (confirm("Are you sure you want to cancel friend request?") == true) {
        const urlParams = new URLSearchParams(window.location.search)

        let listItem = element.parentNode.parentNode

        const text = listItem.textContent.trim()
        const name = text.replace("Cancel", "")

        fetch('http://localhost/Team22/API/users?Username='+name)
            .then(response => {
                console.log('Response:', response);
                return response.text(); // Get the response text
            })
            .then(text => {
                console.log('Response Text:', text); // Log the response text
                // Attempt to parse the response text as JSON
                data = JSON.parse(text);
                //console.log('Data:', data);
                console.log("Friend username is: "+data[0]['Username']);
                console.log("Friend userID is: "+data[0]['UserID']);

                fetch('http://localhost/Team22/API/userfriends')
                    .then(response => {
                        console.log('Response:', response);
                        return response.text(); // Get the response text
                    })
                    .then(text => {
                        console.log('Response Text:', text); // Log the response text
                        // Attempt to parse the response text as JSON
                        userfriends = JSON.parse(text);

                        var thisUserID;
                        var friendsUserID;
                        
                        for (var i = 0; i < userfriends.length; i++) {
                            if (userfriends[i]['friendsid'] == data[0]['UserID'] && userfriends[i]['userid'] == userID && userfriends[i]['is_accepted'] == 0) {
                                thisUserID = userID;
                                friendsUserID = data[0]['UserID'];
                            }
                        }

                        const endpoint = 'http://localhost/Team22/API/userfriends';

                            const requestData = {
                                userid: thisUserID,
                                friendsid: friendsUserID
                            };

                            const queryParams = new URLSearchParams(requestData).toString();

                            // Append the query parameters to the endpoint URL
                            const requestUrl = `${endpoint}?${queryParams}`;

                            // Define the request options
                            const requestOptions = {
                                method: 'DELETE',
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
                                    removeItem(element);
                                    alert("Request Cancelled");
                                    // Handle the response data as needed
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    // Handle the error as needed
                                });
                        



                    })
                    
                    .catch(error => {
                        console.error('Error:', error);
                    });



            })
            
            .catch(error => {
                console.error('Error:', error);
            });
        }
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
    
        function acceptRequest(element){
            if (confirm("Are you sure you want to accept friend request??") == true) {
            generateFriendsNotification();
            generateRequestsNotification();

            let listItem = element.parentNode.parentNode
            console.log(element.parentNode);

            const text = listItem.textContent.trim()
            console.log(text);

            let name = text.replace('Deny','');
            console.log(name);

            name = name.replace('Accept','');
            console.log(name);


            fetch('http://localhost/Team22/API/users?Username='+name)
                        .then(response => {
                            console.log('Response:', response);
                            return response.text(); // Get the response text
                        })
                        .then(text => {
                            console.log('Response Text:', text); // Log the response text
                            // Attempt to parse the response text as JSON
                            data = JSON.parse(text);
                            //console.log('Data:', data);
                            console.log("Friend username is: "+data[0]['Username']);
                            console.log("Friend userID is: "+data[0]['UserID']);

                            //PUT
                            //---------------------------------------------------------------------------
                            const endpoint = 'http://localhost/Team22/API/userfriends';

                            const requestData = {
                                userid: data[0]['UserID'].toString(),
                                friendsid: userID.toString(),
                                is_accepted: 1
                            };

                            // Convert the request data to a query string
                            const queryParams = new URLSearchParams(requestData).toString();

                            // Append the query parameters to the endpoint URL
                            const requestUrl = `${endpoint}?${queryParams}`;

                            // Define the request options
                            const requestOptions = {
                                method: 'PUT',
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
                                    alert("Friend Added");
                                    removeItem(element);
                                    // Handle the response data as needed
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    // Handle the error as needed
                                });
                        })
                    
                        //---------------------------------------------------------------

                        .catch(error => {
                            console.error('Error:', error);
                        });
            }
        
            
        }

        
        disableMyFriendsButton();
        setInterval(() => {
            generateRequestsNotification();
        }, 1000);

</script>
<script>
    const currentUserID = <?php echo $_SESSION['userID'] ?>;
    const currentUser = <?php echo $_SESSION['userID'] ?>;
    console.log("User id is:"+currentUserID);
</script>

</body>
</html>
