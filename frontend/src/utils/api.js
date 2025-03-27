const API_URL = "http://localhost:8888";

export function api_private_get(endpoint, successCallback) {
    fetch(API_URL + endpoint, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 401) {
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

export function api_private_post(endpoint, data, successCallback, errorCallback = null) {
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
