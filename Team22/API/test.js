// Define the endpoint URL
const endpoint = 'http://localhost/API/users';

// Define the request data
const requestData = {
    Username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'mypassword',
    userType: 'regular'
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