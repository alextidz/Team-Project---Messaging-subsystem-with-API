function generateChatNotification() {
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

            var chats = [];

            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                if (element.userID1 == currentUser || element.userID2 == currentUser) {
                    if (element.lastSender != currentUser && element.isOpened == 0) {
                        chats.push(element);
                    }
                }
            }

            if (chats.length > 0) { 
                document.getElementById("chats-notification").style.background = "red";
                if (chats.length < 10) {
                    document.getElementById("chats-notification").innerHTML = chats.length; 
                } else {
                    document.getElementById("chats-notification").innerHTML = '9+'; 
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function generateGroupchatNotification() {
    fetch('http://localhost/Team22/API/usergroups')    
        .then(response => {
            console.log('Response:', response);
            return response.text(); // Get the response text
        })
        .then(text => {
            console.log('Response Text:', text); // Log the response text
            // Attempt to parse the response text as JSON
            const data = JSON.parse(text);
            console.log('Data:', data);

            var chats = [];

            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                if (element.UserID == currentUser) {
                    if (element.is_newChat == 1) {
                        chats.push(element);
                    }
                }
            }

            if (chats.length > 0) { 
                document.getElementById("groupchats-notification").style.background = "red";
                if (chats.length < 10) {
                    document.getElementById("groupchats-notification").innerHTML = chats.length; 
                } else {
                    document.getElementById("groupchats-notification").innerHTML = '9+'; 
                }
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function generateFriendsNotification() {
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

            var requests = [];

            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                if (element.friendsid == currentUser && element.is_accepted == 0) {
                    requests.push(element);
                }
            }

            if (requests.length > 0) { 
                document.getElementById("friends-notification").style.background = "red";
                if (requests.length < 10) {
                    document.getElementById("friends-notification").innerHTML = requests.length; 
                } else {
                    document.getElementById("friends-notification").innerHTML = '9+'; 
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function generateRequestsNotification() {
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

            var requests = [];

            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                if (element.friendsid == currentUser && element.is_accepted == 0) {
                    requests.push(element);
                }
            }

            if (requests.length > 0) { 
                document.getElementById("requests-notification").style.background = "red";
                if (requests.length < 10) {
                    document.getElementById("requests-notification").innerHTML = requests.length; 
                } else {
                    document.getElementById("requests-notification").innerHTML = '9+'; 
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


generateChatNotification();
generateGroupchatNotification();


setInterval(() => {
    generateFriendsNotification();
    }, 1000);


    

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
            if (data[i].UserID == currentUser) {
                username = data[i].Username;
            }
        }

        document.getElementById("user-logged-in").innerHTML = username + " Logged In";

    })
    .catch(error => {
        console.error('Error:', error);
    });
