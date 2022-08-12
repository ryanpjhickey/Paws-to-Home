var token_ // variable will store the token
var userName = "oVZ5FdhYCgBs9YDLsTt3ue4B1vfLHZZE68Knl3asVI8Je1u49J"; // app clientID
var passWord = "q41oLHMowHzg43asWLf72FJgRTMleScmdXAXeiiD"; // app clientSecret
var petFinderURL = "https://api.petfinder.com/v2/oauth2/token"; // Your application token endpoint  
var request = new XMLHttpRequest();

function getToken(url, clientID, clientSecret) {
    var key;
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("grant_type=client_credentials&client_id=" + clientID + "&" + "client_secret=" + clientSecret); // specify the credentials to receive the token on request
    request.onreadystatechange = function () {
        if (request.readyState == request.DONE) {
            var response = request.responseText;
            var obj = JSON.parse(response);
            key = obj.access_token; //store the value of the accesstoken
            token_ = key; // store token in your global variable "token_" or you could simply return the value of the access token from the function
        }
    }
}
// Get the token

function logAPI() {
    fetch('https://api.petfinder.com/v2/animals?type=dog&page=2', {
        headers: {
            'Authorization': `Bearer ${token_}`
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }).then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.warn(error);
    });
}

document.querySelector('#btn').addEventListener('click', logAPI)
document.querySelector('#btn').addEventListener('click', getToken(petFinderURL, userName, passWord))