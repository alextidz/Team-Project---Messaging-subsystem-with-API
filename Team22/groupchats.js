
var allGroupchatsFlag = true;

function buildUnreadChats(groupchats) {
    unreadChats = [];

    for(var i=0; i<groupchats.length; i++) {
        const element = groupchats[i];
        if (element.lastSender != currentUser && element.is_newChat == 1) {
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


function disableAllGroupsButton() {
    document.getElementById("all-groups-button").disabled = true;
    document.getElementById("all-groups-button").style.background = "#77aafc";
    document.getElementById("all-groups-button").style.pointerEvents = "none";
}

function disableUnreadGroupsButton() {
    document.getElementById("unread-groups-button").disabled = true;
    document.getElementById("unread-groups-button").style.background = "#77aafc";
    document.getElementById("unread-groups-button").style.pointerEvents = "none";
}

function enableAllGroupsButton() {
    document.getElementById("all-groups-button").disabled = false;
    document.getElementById("all-groups-button").style.background = "#1F75FE";
    document.getElementById("all-groups-button").style.pointerEvents = "all";
}

function enableUnreadGroupsButton() {
    document.getElementById("unread-groups-button").disabled = false;
    document.getElementById("unread-groups-button").style.background = "#1F75FE";
    document.getElementById("unread-groups-button").style.pointerEvents = "all";
}

function showAllGroups() {
    const cardHeader = document.getElementById("groups-header");
    cardHeader.textContent = "All Groups"; 

    allGroupchatsFlag = true;

    fetch('http://localhost/Team22/API/groups')    
    .then(response => {
        console.log('Response:', response);
        return response.text(); // Get the response text
    })
    .then(text => {
        console.log('Response Text:', text); // Log the response text
        // Attempt to parse the response text as JSON
        const groups = JSON.parse(text);
        console.log('Data:', groups);

        fetch('http://localhost/Team22/API/usergroups')    
        .then(response => {
            console.log('Response:', response);
            return response.text(); // Get the response text
        })
        .then(text => {
            console.log('Response Text:', text); // Log the response text
            // Attempt to parse the response text as JSON
            const list = JSON.parse(text);
            console.log('Data:', list);

            var usergroup = [];

            for (var i = 0; i < list.length; i++) {
                if(list[i].UserID == currentUser) {
                    usergroup.push(list[i]);
                }
            }
            
            for (var i = 0; i < usergroup.length; i++) {
                for (var j = 0; j < groups.length; j++) {
                    if (usergroup[i].GroupID == groups[j].GroupID) {
                        usergroup[i].GroupName = groups[j].GroupName;
                        usergroup[i].lastSender = groups[j].lastSender;
                        usergroup[i].lastEvent = groups[j].lastEvent;
                        usergroup[i].colour = groups[j].colour;
                    }
                }
                
            }

            usergroup.sort(sortByDate);
            showGroups(usergroup);
            disableAllGroupsButton();
            enableUnreadGroupsButton();
        
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        
    })
    .catch(error => {
        console.error('Error:', error);
    });


}

function showUnreadGroups() {
    const cardHeader = document.getElementById("groups-header");
    cardHeader.textContent = "Unread Groups"; 

    allGroupchatsFlag = false;

    fetch('http://localhost/Team22/API/groups')    
    .then(response => {
        console.log('Response:', response);
        return response.text(); // Get the response text
    })
    .then(text => {
        console.log('Response Text:', text); // Log the response text
        // Attempt to parse the response text as JSON
        const groups = JSON.parse(text);
        console.log('Data:', groups);

        fetch('http://localhost/Team22/API/usergroups')    
        .then(response => {
            console.log('Response:', response);
            return response.text(); // Get the response text
        })
        .then(text => {
            console.log('Response Text:', text); // Log the response text
            // Attempt to parse the response text as JSON
            const list = JSON.parse(text);
            console.log('Data:', list);

            var usergroup = [];

            for (var i = 0; i < list.length; i++) {
                if(list[i].UserID == currentUser) {
                    usergroup.push(list[i]);
                }
            }
            
            for (var i = 0; i < usergroup.length; i++) {
                    for (var j = 0; j < groups.length; j++) {
                        if (usergroup[i].GroupID == groups[j].GroupID) {
                            usergroup[i].GroupName = groups[j].GroupName;
                            usergroup[i].lastSender = groups[j].lastSender;
                            usergroup[i].lastEvent = groups[j].lastEvent;
                            usergroup[i].colour = groups[j].colour;
                        }
                    }
            }

            var unreadGroupchats = buildUnreadChats(usergroup);
            unreadGroupchats.sort(sortByDate);
            showGroups(unreadGroupchats);
            disableUnreadGroupsButton();
            enableAllGroupsButton();
        
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

function showGroups(groupchats) {
    var table = document.getElementById("groupchats-table");
    table.innerHTML = "";

    if (groupchats.length == 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.className = "no-chats-cell";
        const header = document.createElement('h1');
        header.innerHTML = "No Groups";
        cell.appendChild(header);
        row.appendChild(cell);
        table.appendChild(row);
    } else {
        groupchats.sort(sortByDate);
        for(var i=0; i<groupchats.length; i++) {
            const element = groupchats[i];
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            const button = document.createElement("button");
            button.className = "chat-button";

            button.addEventListener("click", (function(GroupID) {
                return function() {
                    redirect_toMessages(GroupID);
                };
            })(groupchats[i]['GroupID']));


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

            picture.innerHTML = element.GroupName.substring(0,1).toUpperCase(); 
                if (element.lastSender == currentUser) {
                    if (element.isOpened == 0) {
                        person.innerHTML = element.GroupName;
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
                        person.innerHTML = element.GroupName;
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
                    if (element.is_newChat == 1) {
                        person.innerHTML = element.GroupName;
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
                        person.innerHTML = element.GroupName;
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
            

            row.appendChild(cell);
            table.appendChild(row);
        }
    }
}

function search() {

    fetch('http://localhost/Team22/API/groups')    
    .then(response => {
        console.log('Response:', response);
        return response.text(); // Get the response text
    })
    .then(text => {
        console.log('Response Text:', text); // Log the response text
        // Attempt to parse the response text as JSON
        const groups = JSON.parse(text);
        console.log('Data:', groups);

        fetch('http://localhost/Team22/API/usergroups')    
        .then(response => {
            console.log('Response:', response);
            return response.text(); // Get the response text
        })
        .then(text => {
            console.log('Response Text:', text); // Log the response text
            // Attempt to parse the response text as JSON
            const usergroup = JSON.parse(text);
            console.log('Data:', usergroup);

            var newGroups =[];
            
            for (var i = 0; i < usergroup.length; i++) {
                if (usergroup[i].UserID == currentUser) {
                    for (var j = 0; j < groups.length; j++) {
                        if (usergroup[i].GroupID == groups[j].GroupID) {
                            usergroup[i].GroupName = groups[j].GroupName;
                            usergroup[i].lastSender = groups[j].lastSender;
                            usergroup[i].lastEvent = groups[j].lastEvent;
                            usergroup[i].colour = groups[j].colour;
                        }
                    }
                    newGroups.push(usergroup[i]);
                }
            }

            if (allGroupchatsFlag == true) {
                var newChats = searchGroups(newGroups);
                showGroups(newChats);
            } else if (allGroupchatsFlag == false) {
                var unreadGroupchats = buildUnreadChats(newGroups);
                var newChats = searchGroups(unreadGroupchats);
                console.log(newChats);
                showGroups(newChats);
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

function searchGroups(chats) {
    var newChats = [];
    var input = document.getElementById("groupchat-search").value.toUpperCase();

    for(var i=0; i<chats.length; i++) {
        const element = chats[i];
        var name = String(element.GroupName).toUpperCase();
            if (name.indexOf(input) !== -1) {
                newChats.push(element)
            }
    }

    return newChats;
}


showAllGroups();



function redirect_toMessages(ID){
    const url = 'group_messages.php?GroupID=' + encodeURIComponent(ID);

     // Call is_newChat and handle the returned promise
    is_newChat({ GroupID: ID, UserID: currentUser})
        .then(isChat => {
            if (isChat){
                // console.log('True!!');
                set_isNewChatforMe(ID);
                update_lastSendersOpen(ID);
            }
            console.log(isChat);

            // Redirect to groupchat messages
            window.location.href = url;
        })
        .catch(error => {
            console.error('Error getting chat info:', error);
            // Handle the error as needed
        });



}


function is_newChat(filters) {
    let url = 'http://localhost/Team22/API/usergroups';

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

            if(data[0]['is_newChat'] == 1){
                return true;
            } else {
                return false; // Add this line to handle when isOpened is not 0
            }
            
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error; // Re-throw the error to propagate it down the chain
        });
}




function set_isNewChatforMe(ID){

    // Firstly set isnewChat as false for me

    // Define the endpoint URL
    const endpoint = 'http://localhost/Team22/API/usergroups';


    // Define the data you want to update (e.g., groupName and lastSender)
    const requestData = {
        GroupID: ID,
        UserID: currentUser,
        is_newChat: 0
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


function get_lastSender(filters) {
    let url = 'http://localhost/Team22/API/groups';

    // Append filters to the URL if provided
    if (filters) {
        url += '?' + new URLSearchParams(filters).toString();
    }

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            // Return the first element of the response data array
            return data[0]['lastSender'];
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error; // Re-throw the error to propagate it down the chain
        });
}

function update_lastSendersOpen(groupID) {
    console.log("BAM");
    get_lastSender({ GroupID: groupID })
        .then(lastSender => {
            console.log(lastSender);

            // Define the endpoint URL
            const endpoint = 'http://localhost/Team22/API/usergroups';

            console.log("UPDATING");
            // Define the data you want to update
            const requestData = {
                GroupID: groupID,
                UserID: lastSender,
                isOpened: 1
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
            return fetch(requestUrl, requestOptions);
        })
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


