

// an array to hold user ID and username pairs
const groupusersArray = [];


// get the ChatID from the URL
const GroupID = getURL_GroupID();

function redirectToOptions() {
    window.location.href = "editgc.php?groupID=" + GroupID.toString();
}

function getURL_GroupID(){    
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        return urlParams.get('GroupID');
}




var textarea = document.getElementById('new_msg_area');
var previousmessagesdiv = document.getElementById('previous_messages_area');
var previousTextareaHeight = textarea.offsetHeight;
var allmessagescontainer = document.getElementById('all_messages');

textarea.addEventListener('input', function() {
    
    // fetchAll_messages();
    this.style.height = 'auto';
    var newTextareaHeight = this.scrollHeight;
    this.style.height = newTextareaHeight + 'px';

    // Adjust textarea position as it resizes
    this.style.bottom = 0 - newTextareaHeight + 'px';

    // Adjust the list of messages div to shrink whenever the text area expands
    var messagesdivHeight = previousmessagesdiv.offsetHeight;
    var heightDifference = newTextareaHeight - previousTextareaHeight;
    previousTextareaHeight = newTextareaHeight;

    if (heightDifference > 0) {
    // Textarea expanded, decrease size of messages div
    previousmessagesdiv.style.height = (messagesdivHeight - 27) + 'px';
    //   //Re-Scrolls the messagesdiv to the bottom again as we have shrunk it
    allmessagescontainer.scrollTop = allmessagescontainer.scrollHeight;

    } else if (heightDifference < 0) {
    // Textarea shrunk, increase size of messages div
    previousmessagesdiv.style.height = (messagesdivHeight + 27) + 'px';
    }
});


//for the back button <span> return to the previous window 
function clickbackspan() {
    // window.history.back();
    window.location.href = 'groupchats.php';

} 




function fetch_Groupname(filters) {
    let url = 'http://localhost/Team22/API/groups';

    // Append filters to the URL if provided
    if (filters) {
        url += '?' + new URLSearchParams(filters).toString();
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            var chatHeader = document.getElementById('chat_name');
            chatHeader.innerHTML = data[0]['GroupName']; 
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
} 


fetch_Groupname({GroupID: GroupID});         //calls once at the load of the page






function fetchAll_groupMemberIDs(filters) {
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

            return data;
            // showall_Messages(data); // Update the UI with the fetched messages
            
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}


function fetchAll_groupMemberUsernames(filters) {
    let url = 'http://localhost/Team22/API/users';

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
        .catch(error => {
            console.error('Fetch error:', error);
        });
}


function findGroupMembers() {
    Promise.all([
        fetchAll_groupMemberIDs({ GroupID: GroupID }),
        fetchAll_groupMemberUsernames()
    ])
    .then(([groupIDs, groupUsers]) => {

        // Loop through groupIDs and match with usernames from groupUsers
        for (let i = 0; i < groupIDs.length; i++) {
            let userID = groupIDs[i]['UserID'];
            let username = findUsername(groupUsers, userID);
            groupusersArray.push({ userID: userID, username: username });
        }

        console.log("Users Array:", groupusersArray);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Function to find username by user ID
function findUsername(groupUsers, userID) {
    for (let i = 0; i < groupUsers.length; i++) {
        if (groupUsers[i]['UserID'] === userID) {
            return groupUsers[i]['Username'];
        }
    }
    return null; // Return null if username is not found
}

findGroupMembers();














// Define the function to fetch messages and update the UI
function fetchAll_messages(filters) {
    let url = 'http://localhost/Team22/API/groupmessages';

    // Append filters to the URL if provided
    if (filters) {
        url += '?' + new URLSearchParams(filters).toString();
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            console.log(data);
            showall_Messages(data); // Update the UI with the fetched messages

            if(hasNewMessages()){   // if new messages- scroll them to bottom into view
                allmessagescontainer.scrollTop = allmessagescontainer.scrollHeight;
            }
            
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
} 




fetchAll_messages({GroupID: GroupID});

// Call fetchAll_messages every second to update messages asynchronously
setInterval(() => {
fetchAll_messages({ GroupID: GroupID });
}, 1000);








var previousMessageCount = 0;

function hasNewMessages() {
    var currentMessageCount = document.querySelectorAll('.imessage p').length;
    var isNewMessage = currentMessageCount > previousMessageCount;
    // console.log(currentMessageCount);
    // console.log(isNewMessage);
    previousMessageCount = currentMessageCount;
    return isNewMessage;
}


















//sorts the messages array so that least recent are at the top and most recent last    
function sortByDateTime(a, b) {
    var dateA = new Date(a['SentTime']);
    var dateB = new Date(b['SentTime']);
    
    return dateA - dateB;
}




function showall_Messages(messagesarray){
    messagesarray.sort(sortByDateTime);
    console.log(messagesarray)

    // before loading all messages- clear it first
    var allMessagesarea = document.querySelector('#all_messages');
    allMessagesarea.innerHTML = "";

    let lastdate;

    for (var i = 0; i < messagesarray.length; i++) {

            let date = messagesarray[i]['SentTime'].split(' ')[0];

            if (date != lastdate){  // 'if this is a new day'
                addDatebanner(date);

                addsingle_Message(messagesarray[i]['body'], messagesarray[i]['SenderID'], true, date);



                // if (messagesarray[i]['SenderID'] == currentUserID) {   // 'if the person logged in sent this message'
                //     addsingle_Message(messagesarray[i]['body'], messagesarray[i]['SenderID'], true, date);

                // } else {
                    
                //     addsingle_Message(messagesarray[i]['body'], messagesarray[i]['SenderID'], true, date);
                // }

            } else{

                addsingle_Message(messagesarray[i]['body'], messagesarray[i]['SenderID'], false, date);

                // if (messagesarray[i]['SenderID'] == currentUserID) {
                //     addsingle_Message(messagesarray[i]['body'], messagesarray[i]['SenderID'], false, date);

                // } else {
                //     addsingle_Message(messagesarray[i]['body'], messagesarray[i]['SenderID'], false, date);
                // }
            }

            lastdate = date;          
        
    }

    scrollmessages_toBottom();
}



function addname_Label (idSentBy){
    var newnameLabel = document.createElement('div');
    newnameLabel.className = "member_Label";
    newnameLabel.textContent = idSentBy;

    return newnameLabel;
}



function addsingle_Message(message, senderID, makenewImessage, date) {
    var newMessage = document.createElement('p');
    newMessage.textContent = message;

    // Determine whether the message is from you or not
    if (senderID == currentUserID) {
        newMessage.classList.add('from-me');


        if (makenewImessage == true) {
            var new_imessageDiv = document.createElement('div');
            new_imessageDiv.className = "imessage";
            new_imessageDiv.id = "imessage" + date;

            var all_messages_container = document.querySelector('.all_messages_container');
            all_messages_container.appendChild(new_imessageDiv);
            new_imessageDiv.appendChild(newMessage);
        } else {
            var tempstring = "#imessage" + date;
            var imessageDiv = document.querySelector(tempstring);
            imessageDiv.appendChild(newMessage);
        }



    } else {
       // search through the groupusersArray for the username belonging to whoever sent this message
        for (let i = 0; i < groupusersArray.length; i++) {
            if (groupusersArray[i]['userID'] == senderID){
                var newnameLabel = addname_Label(groupusersArray[i]['username']);
            }
     
        }

        newMessage.classList.add('group-from-them');

        if (makenewImessage == true) {
            var new_imessageDiv = document.createElement('div');
            new_imessageDiv.className = "imessage";
            new_imessageDiv.id = "imessage" + date;

            var all_messages_container = document.querySelector('.all_messages_container');
            all_messages_container.appendChild(new_imessageDiv);

            new_imessageDiv.appendChild(newnameLabel);
            new_imessageDiv.appendChild(newMessage);
        } else {
            var tempstring = "#imessage" + date;
            var imessageDiv = document.querySelector(tempstring);

            // Append newnameLabel to the imessageDiv
            imessageDiv.appendChild(newnameLabel);
            imessageDiv.appendChild(newMessage);
            

            var default_messagewidth = parseFloat(window.getComputedStyle(newMessage).width);
            var default_nameLabelwidth = parseFloat(window.getComputedStyle(newnameLabel).width);

            if (default_messagewidth > default_nameLabelwidth){
                newnameLabel.style.width = default_messagewidth + "px";
            } else{
                newMessage.style.width = default_nameLabelwidth + "px";
            }   
        }
    }
}



function addDatebanner(date){
    var newBanner = document.createElement('div');
    newBanner.className = "date_banner";
    newBanner.textContent = date;

    var all_messages_container = document.querySelector('.all_messages_container');
    all_messages_container.appendChild(newBanner);
}



function scrollmessages_toBottom() {
    var allmessagescontainer = document.getElementById("all_messages");

    // Check if the user is already at the bottom of the container
    var isAtBottom = allmessagescontainer.scrollHeight - allmessagescontainer.clientHeight <= allmessagescontainer.scrollTop + 1;

    // If the user is at the bottom or if the page is not scrolled up, scroll to the bottom
    if (isAtBottom || allmessagescontainer.scrollTop === 0) {
        allmessagescontainer.scrollTop = allmessagescontainer.scrollHeight;
    }
}



function sendMessage() {

    var msgtextarea = document.getElementById('new_msg_area');
    var newtext = msgtextarea.value;

    if (newtext.trim() !== '') {  // providing the message isn't just empty- then it will send it
  
        var newtext = msgtextarea.value;
        msgtextarea.value = ''; // Empty the textarea after sending


        // Define the endpoint URL
        const endpoint = 'http://localhost/Team22/API/groupmessages';

        
        // Get the current date and time
        var now = new Date();
        var formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');

        // Define the request data
        var requestData = {
            body: newtext,
            SenderID: currentUserID,
            GroupID: GroupID,
            SentTime: formattedDateTime,
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
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error as needed
            });



        resetTextArea();  //after sending reset the text area
        update_lastSenders();
        set_myIsOpened();

        for (let i = 0; i < groupusersArray.length; i++) {
            if (groupusersArray[i]['userID'] != currentUserID){
                update_isNewChats(groupusersArray[i]['userID']);
            }
            

        }

    }

}


function update_lastSenders(){
        // Define the endpoint URL
        const endpoint = 'http://localhost/Team22/API/groups';

        // Get the current date and time
        var now = new Date();
        var formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');

        
        // Define the data you want to update (e.g., groupName and lastSender)
        const requestData = {
            lastSender: currentUserID, 
            lastEvent: formattedDateTime
        };
        
        // Convert the request data to a query string
        const queryParams = new URLSearchParams(requestData).toString();
        
        // Append the group ID to the endpoint URL
        const requestUrl = `${endpoint}?groupID=${GroupID}&${queryParams}`;
        
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



function update_isNewChats(user) {
    const endpoint = 'http://localhost/Team22/API/usergroups';


    // Define the data you want to update (e.g., groupName and lastSender)
    const requestData = {
        GroupID: GroupID,
        UserID: user,
        is_newChat: 1
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

function set_myIsOpened() {
    const endpoint = 'http://localhost/Team22/API/usergroups';


    // Define the data you want to update (e.g., groupName and lastSender)
    const requestData = {
        GroupID: GroupID,
        UserID: currentUserID,
        isOpened: 0
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


function resetTextArea(){   //resets changing text area back to original size
    var textarea = document.getElementById('new_msg_area');
    textarea.style.height = '30px';

    var previousmessagesdiv = document.getElementById('previous_messages_area');
    previousmessagesdiv.style.height = '80vh';
}





