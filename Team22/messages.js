// get the ChatID from the URL
const chatID = getURL_ChatID();

function getURL_ChatID(){    
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        return urlParams.get('chatID');
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
    window.location.href = 'chats.php';

} 




function fetchUsername(filters) {
    let url = 'http://localhost/Team22/API/users';

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
            chatHeader.innerHTML = data[0]['Username']; 
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
} 
function fetch_personchattingwith(filters){
    let url = 'http://localhost/Team22/API/chats';

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

            if (data[0]['userID1'] == currentUserID){
                fetchUsername({UserID: data[0]['userID2']});     
            }else{
                fetchUsername({UserID: data[0]['userID1']});
            }
            
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}     
fetch_personchattingwith({chatID: chatID});  //calls once at the load of the page



// Define the function to fetch messages and update the UI
function fetchAll_messages(filters) {
    let url = 'http://localhost/Team22/API/messages';

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
            // console.log(data);
            showall_Messages(data); // Update the UI with the fetched messages

            if(hasNewMessages()){   // if new messages- scroll them to bottom into view
                allmessagescontainer.scrollTop = allmessagescontainer.scrollHeight;
            }
            
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
} 




fetchAll_messages({chatID: chatID});

// Call fetchAll_messages every second to update messages asynchronously
setInterval(() => {
fetchAll_messages({ chatID: chatID });
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


    // before loading all messages- clear it first
    var allMessagesarea = document.querySelector('#all_messages');
    allMessagesarea.innerHTML = "";

    let lastdate;

    for (var i = 0; i < messagesarray.length; i++) {

            let date = messagesarray[i]['SentTime'].split(' ')[0];

            if (date != lastdate){  // 'if this is a new day'
                addDatebanner(date);

                if (messagesarray[i]['SenderID'] == currentUserID) {   // 'if the person logged in sent this message'
                    addsingle_Message(messagesarray[i]['body'], true, true, date);

                } else {
                    addsingle_Message(messagesarray[i]['body'], false, true, date);
                }

            } else{

                if (messagesarray[i]['SenderID'] == currentUserID) {
                    addsingle_Message(messagesarray[i]['body'], true, false, date);

                } else {
                    addsingle_Message(messagesarray[i]['body'], false, false, date);
                }
            }

            lastdate = date;          
        
    }

    scrollmessages_toBottom();
}


function addsingle_Message(message, isFromMe, makenewImessage, date){
    var newMessage = document.createElement('p');
    newMessage.textContent = message;

    // Determine whether the message is from you or not
    if (isFromMe) {
        newMessage.classList.add('from-me');
    } else {
        newMessage.classList.add('from-them');
    }


    if (makenewImessage == true){
        var new_imessageDiv = document.createElement('div');
        new_imessageDiv.className = "imessage";
        new_imessageDiv.id = "imessage"+date;

        var all_messages_container = document.querySelector('.all_messages_container');
        all_messages_container.appendChild(new_imessageDiv);

        new_imessageDiv.appendChild(newMessage);


    } else{
        var tempstring = "#imessage"+date;
        var imessageDiv = document.querySelector(tempstring);
        imessageDiv.appendChild(newMessage);
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


function fetch_IDChattingwith(filters) {
    let url = 'http://localhost/Team22/API/chats';

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
            if (data[0]['userID1'] == currentUserID) {
                return (data[0]['userID2']);
            } else {
                return (data[0]['userID1']);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error;
        });
}


    
function sendMessage() {
    var msgtextarea = document.getElementById('new_msg_area');
    var newtext = msgtextarea.value;

    if (newtext.trim() !== '') { // providing the message isn't just empty- then it will send it
        var newtext = msgtextarea.value;
        msgtextarea.value = ''; // Empty the textarea after sending

        fetch_IDChattingwith({ chatID: chatID })
            .then(receiver => {
                // Define the endpoint URL
                const endpoint = 'http://localhost/Team22/API/messages';

                // Get the current date and time
                var now = new Date();
                var formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');

                // Define the request data
                var requestData = {
                    body: newtext,
                    SenderID: currentUserID,
                    ReceiverID: receiver,
                    SentTime: formattedDateTime,
                    chatID: chatID
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
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // Handle the error as needed
                    });

                resetTextArea(); //after sending reset the text area
                update_lastSenders(); //edit last sent things in database
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error as needed
            });
    }
}

function resetTextArea(){   //resets changing text area back to original size
    var textarea = document.getElementById('new_msg_area');
    textarea.style.height = '30px';

    var previousmessagesdiv = document.getElementById('previous_messages_area');
    previousmessagesdiv.style.height = '80vh';
}


function update_lastSenders(){
    // Define the endpoint URL
    const endpoint = 'http://localhost/Team22/API/chats';

    // Get the current date and time
    var now = new Date();
    var formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');

    
    // Define the data you want to update (e.g., groupName and lastSender)
    const requestData = {
        chatID: chatID,
        lastSender: currentUserID,
        isOpened: 0,
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


