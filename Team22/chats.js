var allChatsFlag = true;


function buildUnreadChats(chats) {
    var unreadChats = [];

    for(var i=0; i<chats.length; i++) {
        const element = chats[i];
        if (element.lastSender != currentUser && element.isOpened == 0) {
            unreadChats.push(element);
        }
    }
    return unreadChats;
}

sortByDate = (a,b) => {
    const dateA = new Date(a.lastEvent);
    const dateB = new Date(b.lastEvent);
    if (dateA < dateB) {
        return 1;
    } else if (dateA > dateB) {
        return -1;
    } else {
        return 0;
    }
}


function disableAllChatsButton() {
    document.getElementById("all-chats-button").disabled = true;
    document.getElementById("all-chats-button").style.background = "#77aafc";
    document.getElementById("all-chats-button").style.pointerEvents = "none";
}

function disableUnreadChatsButton() {
    document.getElementById("unread-chats-button").disabled = true;
    document.getElementById("unread-chats-button").style.background = "#77aafc";
    document.getElementById("unread-chats-button").style.pointerEvents = "none";
}

function enableAllChatsButton() {
    document.getElementById("all-chats-button").disabled = false;
    document.getElementById("all-chats-button").style.background = "#1F75FE";
    document.getElementById("all-chats-button").style.pointerEvents = "all";
}

function enableUnreadChatsButton() {
    document.getElementById("unread-chats-button").disabled = false;
    document.getElementById("unread-chats-button").style.background = "#1F75FE";
    document.getElementById("unread-chats-button").style.pointerEvents = "all";
}

function showAllChats() {
    const cardHeader = document.getElementById("chats-header");
    cardHeader.textContent = "All Chats"; 

    allChatsFlag = true;

    fetch('http://localhost/Team22/API/chats')    
    .then(response => {
        console.log('Response:', response);
        return response.text(); // Get the response text
    })
    .then(text => {
        console.log('Response Text:', text); // Log the response text
        // Attempt to parse the response text as JSON
        const list = JSON.parse(text);
        console.log('Data:', list);

        var data = [];

        for (var i = 0; i < list.length; i++) {
            if(list[i].userID1 == currentUser || list[i].userID2 == currentUser) {
                data.push(list[i]);
            }
        }

        data.sort(sortByDate);
        showChats(data);
        disableAllChatsButton();
        enableUnreadChatsButton();
        
        
    })
    .catch(error => {
        console.error('Error:', error);
    });

    
}

function showUnreadChats() {
    const cardHeader = document.getElementById("chats-header");
    cardHeader.textContent = "Unread Chats"; 

    allChatsFlag = false;

    fetch('http://localhost/Team22/API/chats')    
    .then(response => {
        console.log('Response:', response);
        return response.text(); // Get the response text
    })
    .then(text => {
        console.log('Response Text:', text); // Log the response text
        // Attempt to parse the response text as JSON
        const list = JSON.parse(text);
        console.log('Data:', list);

        var data = [];

        for (var i = 0; i < list.length; i++) {
            if(list[i].userID1 == currentUser || list[i].userID2 == currentUser) {
                data.push(list[i]);
            }
        }

        var unreadChats = buildUnreadChats(data);
        unreadChats.sort(sortByDate);
        showChats(unreadChats);
        disableUnreadChatsButton();
        enableAllChatsButton();
        
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showChats(chats) {
    var table = document.getElementById("chats-table");
    table.innerHTML = "";

    if (chats.length == 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.className = "no-chats-cell";
        const header = document.createElement('h1');
        header.innerHTML = "No Chats";
        cell.appendChild(header);
        row.appendChild(cell);
        table.appendChild(row);
    } else {
        for(var i=0; i<chats.length; i++) {
            const element = chats[i];
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            const button = document.createElement("button");
            button.className = "chat-button";

            button.addEventListener("click", (function(chatID) {
                return function() {
                    redirect_toMessages(chatID);
                };
            })(chats[i]['chatID']));


            const buttonDiv = document.createElement("div"); // div containing everything on the button
            buttonDiv.className = "chat-button-div";
            const picture = document.createElement("button");
            picture.className = "pfp";
            if (element.colour == 0) {
                picture.style.background = "darkred";
            } else if (element.colour == 1) {
                picture.style.background = "darkorange";
            } else if (element.colour == 2) {
                picture.style.background = "darkgoldenrod";
            } else if (element.colour == 3) {
                picture.style.background = "darkgreen";
            } else if (element.colour == 4) {
                picture.style.background = "darkcyan";
            } else if (element.colour == 5) {
                picture.style.background = "darkmagenta";
            } else if (element.colour == 6) {
                picture.style.background = "darkolivegreen";
            } else if (element.colour == 7) {
                picture.style.background = "darkslateblue";
            } else if (element.colour == 8) {
                picture.style.background = "darkslategray";
            } else if (element.colour == 9) {
                picture.style.background = "coral";
            } 
            const infoDiv = document.createElement("div"); // div containing all info on the button next to PFP
            infoDiv.className = "chat-info-div";
            const person = document.createElement("p");
            person.className = "chat-person";
            const innerInfoDiv = document.createElement("div"); // div containing the info on the bottom line: icon, status and timestamp
            innerInfoDiv.className = "chat-inner-info-div";
            const statusIconDiv = document.createElement("div"); // div containing the status icon
            statusIconDiv.className = "chat-status-icon-div";
            const statusDiv = document.createElement("div"); // div containing the status
            statusDiv.className = "chat-status-div";
            const status = document.createElement("p");
            const timestampDiv = document.createElement("div"); // div containing the timestamp
            timestampDiv.className = "chat-timestamp-div"
            const timestamp = document.createElement("p");

            // All possible icons
            const deliveredIcon = document.createElement("i");
            deliveredIcon.className = "bi bi-send-fill";
            const openedIcon = document.createElement("i");
            openedIcon.className = "bi bi-send";
            const newChatIcon = document.createElement("i");
            newChatIcon.className = "bi bi-chat-right-fill"; 
            const receivedIcon = document.createElement("i");
            receivedIcon.className = "bi bi-chat-right"; 

            if (element.userID1 == currentUser) {
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

                        var userName;

                        for (var i = 0; i < users.length; i++) {
                            if (users[i].UserID == element.userID2) {
                                userName = users[i].Username;
                            }
                        }
                picture.innerHTML = userName.substring(0,1).toUpperCase(); 
                if (element.lastSender == currentUser) {
                    if (element.isOpened == 0) {
                        person.innerHTML = userName;
                        status.innerHTML = 'Delivered';
                        timestamp.innerHTML = element.lastEvent;
                        infoDiv.appendChild(person);
                        statusIconDiv.appendChild(deliveredIcon);
                        statusDiv.appendChild(status);
                        innerInfoDiv.appendChild(statusIconDiv);
                        innerInfoDiv.appendChild(statusDiv);
                        timestampDiv.appendChild(timestamp);
                        innerInfoDiv.appendChild(timestampDiv);
                        innerInfoDiv.className = "chat-inner-info-div-delivered";
                        infoDiv.appendChild(innerInfoDiv);
                        buttonDiv.appendChild(picture);
                        buttonDiv.appendChild(infoDiv);
                        button.appendChild(buttonDiv);
                        cell.appendChild(button);
                    } else {
                        person.innerHTML = userName;
                        status.innerHTML = 'Opened';
                        timestamp.innerHTML = element.lastEvent;
                        infoDiv.appendChild(person);
                        statusIconDiv.appendChild(openedIcon);
                        statusDiv.appendChild(status);
                        innerInfoDiv.appendChild(statusIconDiv);
                        innerInfoDiv.appendChild(statusDiv);
                        timestampDiv.appendChild(timestamp);
                        innerInfoDiv.appendChild(timestampDiv);
                        innerInfoDiv.className = "chat-inner-info-div-opened";
                        infoDiv.appendChild(innerInfoDiv);
                        buttonDiv.appendChild(picture);
                        buttonDiv.appendChild(infoDiv);
                        button.appendChild(buttonDiv);
                        cell.appendChild(button);
                    }

                    
                } else {
                    if (element.isOpened == 0) {
                        person.innerHTML = userName;
                        status.innerHTML = 'New Chat';
                        timestamp.innerHTML = element.lastEvent;
                        infoDiv.appendChild(person);
                        statusIconDiv.appendChild(newChatIcon);
                        statusDiv.appendChild(status);
                        innerInfoDiv.appendChild(statusIconDiv);
                        innerInfoDiv.appendChild(statusDiv);
                        timestampDiv.appendChild(timestamp);
                        innerInfoDiv.appendChild(timestampDiv);
                        innerInfoDiv.className = "chat-inner-info-div-new-chat";
                        infoDiv.appendChild(innerInfoDiv);
                        buttonDiv.appendChild(picture);
                        buttonDiv.appendChild(infoDiv);
                        button.appendChild(buttonDiv);
                        cell.appendChild(button);
                    } else {
                        person.innerHTML = userName;
                        status.innerHTML = 'Received';
                        timestamp.innerHTML = element.lastEvent;
                        infoDiv.appendChild(person);
                        statusIconDiv.appendChild(receivedIcon);
                        statusDiv.appendChild(status);
                        innerInfoDiv.appendChild(statusIconDiv);
                        innerInfoDiv.appendChild(statusDiv);
                        timestampDiv.appendChild(timestamp);
                        innerInfoDiv.appendChild(timestampDiv);
                        innerInfoDiv.className = "chat-inner-info-div-received";
                        infoDiv.appendChild(innerInfoDiv);
                        buttonDiv.appendChild(picture);
                        buttonDiv.appendChild(infoDiv);
                        button.appendChild(buttonDiv);
                        cell.appendChild(button);
                    }
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });

            } else if (element.userID2 == currentUser) {

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

                        var userName;

                        for (var i = 0; i < users.length; i++) {
                            if (users[i].UserID == element.userID1) {
                                userName = users[i].Username;
                            }
                        }
                picture.innerHTML = userName.substring(0,1).toUpperCase(); 
                if (element.lastSender == currentUser) {
                    if (element.isOpened == 0) {
                        person.innerHTML = userName;
                        status.innerHTML = 'Delivered';
                        timestamp.innerHTML = element.lastEvent;
                        infoDiv.appendChild(person);
                        statusIconDiv.appendChild(deliveredIcon);
                        statusDiv.appendChild(status);
                        innerInfoDiv.appendChild(statusIconDiv);
                        innerInfoDiv.appendChild(statusDiv);
                        timestampDiv.appendChild(timestamp);
                        innerInfoDiv.appendChild(timestampDiv);
                        innerInfoDiv.className = "chat-inner-info-div-delivered";
                        infoDiv.appendChild(innerInfoDiv);
                        buttonDiv.appendChild(picture);
                        buttonDiv.appendChild(infoDiv);
                        button.appendChild(buttonDiv);
                        cell.appendChild(button);
                    } else {
                        person.innerHTML = userName;
                        status.innerHTML = 'Opened';
                        timestamp.innerHTML = element.lastEvent;
                        infoDiv.appendChild(person);
                        statusIconDiv.appendChild(openedIcon);
                        statusDiv.appendChild(status);
                        innerInfoDiv.appendChild(statusIconDiv);
                        innerInfoDiv.appendChild(statusDiv);
                        timestampDiv.appendChild(timestamp);
                        innerInfoDiv.appendChild(timestampDiv);
                        innerInfoDiv.className = "chat-inner-info-div-opened";
                        infoDiv.appendChild(innerInfoDiv);
                        buttonDiv.appendChild(picture);
                        buttonDiv.appendChild(infoDiv);
                        button.appendChild(buttonDiv);
                        cell.appendChild(button);
                    }
                } else {
                    if (element.isOpened == 0) {
                        person.innerHTML = userName;
                        status.innerHTML = 'New Chat';
                        timestamp.innerHTML = element.lastEvent;
                        infoDiv.appendChild(person);
                        statusIconDiv.appendChild(newChatIcon);
                        statusDiv.appendChild(status);
                        innerInfoDiv.appendChild(statusIconDiv);
                        innerInfoDiv.appendChild(statusDiv);
                        timestampDiv.appendChild(timestamp);
                        innerInfoDiv.appendChild(timestampDiv);
                        innerInfoDiv.className = "chat-inner-info-div-new-chat";
                        infoDiv.appendChild(innerInfoDiv);
                        buttonDiv.appendChild(picture);
                        buttonDiv.appendChild(infoDiv);
                        button.appendChild(buttonDiv);
                        cell.appendChild(button);
                    } else {
                        person.innerHTML = userName;
                        status.innerHTML = 'Received';
                        timestamp.innerHTML = element.lastEvent;
                        infoDiv.appendChild(person);
                        statusIconDiv.appendChild(receivedIcon);
                        statusDiv.appendChild(status);
                        innerInfoDiv.appendChild(statusIconDiv);
                        innerInfoDiv.appendChild(statusDiv);
                        timestampDiv.appendChild(timestamp);
                        innerInfoDiv.appendChild(timestampDiv);
                        innerInfoDiv.className = "chat-inner-info-div-received";
                        infoDiv.appendChild(innerInfoDiv);
                        buttonDiv.appendChild(picture);
                        buttonDiv.appendChild(infoDiv);
                        button.appendChild(buttonDiv);
                        cell.appendChild(button);
                    }
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });

            } 

            row.appendChild(cell);
            table.appendChild(row);
        }
    }
}

function search() {
    fetch('http://localhost/Team22/API/chats')    
    .then(response => {
        console.log('Response:', response);
        return response.text(); // Get the response text
    })
    .then(text => {
        console.log('Response Text:', text); // Log the response text
        // Attempt to parse the response text as JSON
        const data = JSON.parse(text);
        console.log('Data:', data);

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

            if (allChatsFlag == true) {
                var newChats = searchChats(data, users);
                newChats.sort(sortByDate);
                showChats(newChats);
            } else if (allChatsFlag == false) {
                var unreadChats = buildUnreadChats(data)
                var newChats = searchChats(unreadChats, users);
                showChats(newChats);
            }
        
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}


function searchChats(chats, users) {
        var user;
        var newChats = [];
        var input = document.getElementById("chat-search").value.toUpperCase();

        for(var i=0; i<chats.length; i++) {
            //const element = chats[i];
            if (chats[i].userID1 == currentUser) {
        
                for (var j = 0; j < users.length; j++) {
                    if (users[j].UserID == chats[i].userID2) {
                        user = users[j];
                    }
                }

                var name = String(user.Username).toUpperCase();
                if (name.indexOf(input) !== -1) {
                    newChats.push(chats[i]);
                }

            } else if (chats[i].userID2 == currentUser) {

                for (var j = 0; j < users.length; j++) {
                    if (users[j].UserID == chats[i].userID1) {
                        user = users[j];
                    }
                }

                var name = String(user.Username).toUpperCase();
                if (name.indexOf(input) !== -1) {
                    newChats.push(chats[i]);
                }
            }
        }

        return newChats;
        
    

}


function redirect_toMessages(ID) {
    const url = 'messages.php?chatID=' + encodeURIComponent(ID);

    // Call is_newChat and handle the returned promise
    is_newChat({ chatID: ID })
        .then(isChat => {
            if (isChat){
                console.log('True!!');
                set_isOpened(ID);
            }
            // Redirect to messages
            window.location.href = url;
        })
        .catch(error => {
            console.error('Error getting chat info:', error);
            // Handle the error as needed
        });
}



function is_newChat(filters) {
    let url = 'http://localhost/Team22/API/chats';

    // Append filters to the URL if provided
    if (filters) {
        url += '?' + new URLSearchParams(filters).toString();
    }

    // Return the fetch promise chain
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            console.log(data);
            // Always return a value from this function
            if (data[0]['lastSender'] != currentUser){
                if(data[0]['isOpened'] == 0){
                    return true;
                } else {
                    return false; // Add this line to handle when isOpened is not 0
                }
            } else {
                return false; // Add this line to handle when lastSender is currentUser
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error; // Re-throw the error to propagate it down the chain
        });
}



function set_isOpened(ID){
    // Define the endpoint URL
    const endpoint = 'http://localhost/Team22/API/chats';

    // Get the current date and time
    var now = new Date();
    var formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');

    
    // Define the data you want to update (e.g., groupName and lastSender)
    const requestData = {
        chatID: ID,
        isOpened: 1,
        lastEvent: formattedDateTime
    };
    
    // Convert the request data to a query string
    const queryParams = new URLSearchParams(requestData).toString();
    
    // Append the group ID to the endpoint URL
    const requestUrl = `${endpoint}?${queryParams}`;
    
    // Define the request options
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
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
}


showAllChats();
