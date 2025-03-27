const API_URL = "http://localhost:3000"

function api_private_get(endpoint, successCallback) {
    fetch(API_URL + endpoint, {
        method: 'GET',
        credentials: 'include'  // Include cookies
    })
        .then(response => {
            if (response.status === 401) {
                // alert('You are not logged in. Redirecting to login page...');
                window.location.href = 'login.html?error-msg=You have been logged out due to inactivity. Please log in again.';
            } else if (response.status !== 200) {
                console.error('Error:', response);
            }
            return response;
        })
        .then(response => response.json())
        .then(successCallback)
        .catch((error) => {
            console.error('Error:', error);
        });
}

function api_private_post(endpoint, data, successCallback, errorCallback=null) {
    fetch(API_URL + endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status === 401) {
                // alert('You are not logged in. Redirecting to login page...');
                window.location.href = 'login.html?error-msg=You have been logged out due to inactivity. Please log in again.';
            } else if (response.status !== 200) {
                console.error('Error:', response);
            }
            return response;
        })
        .then(response => response.json())
        .then(successCallback)
        .catch((error) => {
            console.error('Error:', error);
            if (errorCallback) {
                errorCallback(error);
            }
        });
}

export default api;