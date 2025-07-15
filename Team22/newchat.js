function backButton() {
    window.location.href = 'chats.php';
}

function showAllFriends() {
    fetch('http://localhost/Team22/API/chats')    
    .then(response => {
        console.log('Response:', response);
        return response.text(); // Get the response text
    })
    .then(text => {
        console.log('Response Text:', text); // Log the response text
        // Attempt to parse the response text as JSON
        const chats = JSON.parse(text);
        console.log('Data:', chats);

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

                var friendsList = [];

                for (var i = 0; i < userfriends.length; i++) {
                    if (userfriends[i].userid == currentUser && userfriends[i].is_accepted == 1) {
                        for (var j = 0; j < users.length; j++) {
                            if (users[j].UserID == userfriends[i].friendsid) {
                                friendsList.push(users[j]);
                            }
                        }
                    } else if (userfriends[i].friendsid == currentUser && userfriends[i].is_accepted == 1) {
                        for (var j = 0; j < users.length; j++) {
                            if (users[j].UserID == userfriends[i].userid) {
                                friendsList.push(users[j]);
                            }
                        }
                    }
                }

                var noChatFriends = [];

                for (var i = 0; i < friendsList.length; i++) {
                    var hasNoChat = true;
                    for (var j = 0; j < chats.length; j++) {
                        if ((chats[j].userID2 == friendsList[i].UserID && chats[j].userID1 == currentUser) || (chats[j].userID1 == friendsList[i].UserID && chats[j].userID2 == currentUser)) {
                            hasNoChat = false;
                        }
                    }
                    if (hasNoChat == true) {
                        noChatFriends.push(friendsList[i]);
                    }
                }

                showFriends(noChatFriends);
            
            
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
}

function showFriends(friends) {
    console.log(friends);

    var table = document.getElementById("people-table");
    table.innerHTML = "";

    if (friends.length == 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.className = "no-chats-cell";
        const header = document.createElement('h1');
        header.innerHTML = "It's a bit quiet in here...";
        const body = document.createElement('p');
        body.innerHTML = "Add friends to chat with more people!"
        body.className = "no-people-body";
        cell.appendChild(header);
        cell.appendChild(body);
        row.appendChild(cell);
        table.appendChild(row);
    } else {
        for(var i=0; i<friends.length; i++) {
            const element = friends[i];
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            const button = document.createElement("button");
            button.className = "chat-button";

            button.addEventListener("click", (function(UserID) {
                return function() {
                    createNewChat(UserID);
                };
            })(friends[i]['UserID']));

            button.id = "people-button";
            const buttonDiv = document.createElement("div");
            buttonDiv.className = "people-button-div";

            const plusIcon = document.createElement("i");
            plusIcon.className = "bi bi-plus-circle";
            const plusDiv = document.createElement("div");
            plusDiv.className = "plus-div";
            plusDiv.appendChild(plusIcon);

            const nameDiv = document.createElement("div");
            nameDiv.className = "name-div";
            nameDiv.innerHTML = element.Username;

            buttonDiv.appendChild(plusDiv);
            buttonDiv.appendChild(nameDiv);

            button.appendChild(buttonDiv);
            cell.appendChild(button);
            row.appendChild(cell);
            table.appendChild(row);
        }
    }
}

function searchFriends() {
    fetch('http://localhost/Team22/API/chats')    
    .then(response => {
        console.log('Response:', response);
        return response.text(); // Get the response text
    })
    .then(text => {
        console.log('Response Text:', text); // Log the response text
        // Attempt to parse the response text as JSON
        const chats = JSON.parse(text);
        console.log('Data:', chats);

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

                var friendsList = [];

                for (var i = 0; i < userfriends.length; i++) {
                    if (userfriends[i].userid == currentUser && userfriends[i].is_accepted == 1) {
                        for (var j = 0; j < users.length; j++) {
                            if (users[j].UserID == userfriends[i].friendsid) {
                                friendsList.push(users[j]);
                            }
                        }
                    } else if (userfriends[i].friendsid == currentUser && userfriends[i].is_accepted == 1) {
                        for (var j = 0; j < users.length; j++) {
                            if (users[j].UserID == userfriends[i].userid) {
                                friendsList.push(users[j]);
                            }
                        }
                    }
                }

                var noChatFriends = [];

                for (var i = 0; i < friendsList.length; i++) {
                    var hasNoChat = true;
                    for (var j = 0; j < chats.length; j++) {
                        if ((chats[j].userID2 == friendsList[i].UserID && chats[j].userID1 == currentUser) || (chats[j].userID1 == friendsList[i].UserID && chats[j].userID2 == currentUser)) {
                            hasNoChat = false;
                        }
                    }
                    if (hasNoChat == true) {
                        noChatFriends.push(friendsList[i]);
                    }
                }

                var input = document.getElementById("people-search").value.toUpperCase();
                var newChats= [];
                
                for (var i = 0; i < noChatFriends.length; i++) {
                    var name = String(noChatFriends[i].Username).toUpperCase();
                    if (name.indexOf(input) !== -1) {
                        newChats.push(noChatFriends[i]);
                    }
                }

                showFriends(newChats);
            
            
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
}


function createNewChat(UserID) {
    const endpoint = 'http://localhost/Team22/API/chats';

        // Get the current date and time
        var now = new Date();
        var formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');

        var num = Math.floor((Math.random() * 10));

        const requestData = {
            userID1: currentUser,
            userID2: UserID,
            lastSender: currentUser,
            isOpened: 0,
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
                
                fetch('http://localhost/Team22/API/chats')    
                .then(response => {
                    console.log('Response:', response);
                    return response.text(); // Get the response text
                })
                .then(text => {
                    console.log('Response Text:', text); // Log the response text
                    // Attempt to parse the response text as JSON
                    const chats = JSON.parse(text);
                    console.log('Data:', chats);
            
                    var chatID;
            
                    for (var i = 0; i < chats.length; i++) {
                        if(chats[i]['userID1'] == currentUser && chats[i]['userID2'] == UserID) {
                            chatID = chats[i]['chatID'];
                        }
                    }
            
                    console.log(chatID);
                    window.location.href = 'messages.php?chatID=' + chatID.toString();
                    
                    
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error as needed
            });


        
    
}


showAllFriends();

/* TO DO LIST
FIX GROUP MESSAGES DISPLAY ERROR WHEN MEMBER IS DELETED
SLIGHT DISPLAY ISSUE SOMTIMES WITH MESSAGE BUBBLE ALIGNMENT

*/