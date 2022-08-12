var token_ // variable will store the token
var userName = "oVZ5FdhYCgBs9YDLsTt3ue4B1vfLHZZE68Knl3asVI8Je1u49J"; // app clientID
var passWord = "q41oLHMowHzg43asWLf72FJgRTMleScmdXAXeiiD"; // app clientSecret
var petFinderURL = "https://api.petfinder.com/v2/oauth2/token"; // Your application token endpoint  
var request = new XMLHttpRequest();
var petListing = document.querySelector('#petListing')

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
    fetch('https://api.petfinder.com/v2/animals?location=94534&distance=25&limit=10&status=adoptable', {
        headers: {
            'Authorization': `Bearer ${token_}`
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }).then(function (data) {
        console.log(data.animals);
        for (let index = 0; index < data.animals.length; index++) {
            var petName = data.animals[index].name
            var petAge = data.animals[index].age
            var petDistance = data.animals[index].distance
            // var petDistanceShort = petDistanceFull.splice(0, 2)
            var petEmail = data.animals[index].contact.email
            var petPhone = data.animals[index].contact.phone
            var petSpecies = data.animals[index].species
            var cardTemplate =
                `${petName}`;
            var petsec = document.createElement('section')
            var peth1 = document.createElement('h1')
            var petdiv = document.createElement('div')
            var petimg = document.createElement('img')
            var petInfoSpecies = document.createElement('p')
            var petInfoAge = document.createElement('p')
            var petInfoDist = document.createElement('p')
            var petInfoContact = document.createElement('p')

            if (data.animals[index].photos.length === 0) {
                continue
            }
            else {
                var petPhoto = data.animals[index].photos[0].full
                petListing.appendChild(petsec)
                peth1.className = 'flexPets-h1'
                petsec.append(peth1)
                petsec.className = 'card column is-one-third'
                peth1.textContent = cardTemplate
                petsec.append(petdiv)
                petdiv.append(petimg)
                petimg.src = petPhoto
                petdiv.append(petInfoSpecies)
                petdiv.append(petInfoAge)
                petdiv.append(petInfoDist)
                petInfoDist.textContent = `${petDistance} miles away from your zipcode`
                petdiv.append(petInfoContact)
                petInfoSpecies.textContent = `Species: ${petSpecies}`
                petInfoAge.textContent = `Age: ${petAge}`
                if (data.animals[index].contact.email === null) {
                    return
                }
                else {
                    petInfoContact.textContent = `Contact: ${petEmail}`
                    if (data.animals[index].contact.phone === null) {
                    }
                    else {
                        petInfoContact.textContent = `Contact: ${petEmail} ${petPhone}`
                    }
                }
                if (data.animals[index].contact.phone === null) {
                }
                else {
                    petInfoContact.textContent = `Contact: ${petPhone}`
                    if (data.animals[index].contact.email === null) {
                        return
                    }
                    else {
                        petInfoContact.textContent = `Contact: ${petEmail} ${petPhone}`
                    }
                }

            }
        }
    }).catch(function (error) {
        console.warn(error);
    });
}

document.querySelector('#btn').addEventListener('click', logAPI)
document.querySelector('#btn').addEventListener('click', getToken(petFinderURL, userName, passWord))