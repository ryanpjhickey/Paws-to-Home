var token_ // variable will store the token
var userName = "oVZ5FdhYCgBs9YDLsTt3ue4B1vfLHZZE68Knl3asVI8Je1u49J"; // app clientID
var passWord = "q41oLHMowHzg43asWLf72FJgRTMleScmdXAXeiiD"; // app clientSecret
var petFinderURL = "https://api.petfinder.com/v2/oauth2/token"; // Your application token endpoint  
var request = new XMLHttpRequest();
var petListing = document.querySelector('#petListing')
var zipcode = document.querySelector('#zip')
var petType = document.querySelector('.petType')
var petAgeFilter = document.querySelector('.petAgeFilter')
var counter = 0

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
    let counter = 0
    petListing.replaceChildren()
    if (petType.value == 'Any animal') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim()
    }
    else if (petType.value == 'Cats') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim() + '&type=cat'
    }
    else if (petType.value == 'Dogs') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim() + '&type=dog'
    }
    if (petAgeFilter.value == 'Any age') {
        var apiUrlFinal = apiUrl
    }
    else if (petAgeFilter.value == 'BABY') {
        var apiUrlFinal = apiUrl + '&age=baby,young'
    }
    else if (petAgeFilter.value == 'ADULT') {
        var apiUrlFinal = apiUrl + '&age=adult'
    }
    else if (petAgeFilter.value == 'SENIOR') {
        var apiUrlFinal = apiUrl + '&age=senior'
    }
    fetch(apiUrlFinal, {
        headers: {
            'Authorization': `Bearer ${token_}`
        }
    }).then(function (response) {
        if (response.ok) {
            document.querySelector('#invalid').style.display = 'none';
            return response.json();
        } else {
            document.querySelector('#invalid').style.display = 'inline';
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
            var cardTemplate = `${petName}`;
            var peth1 = document.createElement('h1')
            var petdiv = document.createElement('div')
            var petimg = document.createElement('img')
            var petInfoSpecies = document.createElement('p')
            var petInfoAge = document.createElement('p')
            var petInfoDist = document.createElement('p')
            var petInfoContact = document.createElement('p')
            var petsec = document.createElement('section')
            if (data.animals[index].photos.length === 0) {
                continue
            } else if (data.animals[index].contact.email === null && data.animals[index].contact.phone === null) {
                continue
            }
            else {
                counter++;
                if (counter < 13) {
                    var petPhoto = data.animals[index].photos[0].full
                    petListing.appendChild(petsec)
                    petsec.append(peth1)
                    petsec.className = 'card column is-one-third'
                    peth1.textContent = cardTemplate
                    petsec.append(petdiv)
                    petdiv.append(petimg)
                    petimg.src = petPhoto
                    petdiv.append(petInfoSpecies)
                    petdiv.append(petInfoAge)
                    petdiv.append(petInfoDist)
                    petInfoDist.textContent = `${petDistance} miles away from ` + zipcode.value.trim()
                    petdiv.append(petInfoContact)
                    petInfoSpecies.textContent = `Species: ${petSpecies}`
                    petInfoAge.textContent = `Age: ${petAge}`
                    petInfoContact.textContent = `Contact: ${petEmail} ${petPhone}`
                    if (data.animals[index].contact.email === null) {
                        petInfoContact.textContent = `Contact: ${petPhone}`
                    }
                    else if (data.animals[index].contact.phone === null) {
                        petInfoContact.textContent = `Contact: ${petEmail}`
                    }
                }

            }
        }
    }).catch(function (error) {
        console.warn(error);
    });
}

function pageTwo() {
    let counter = 0
    petListing.replaceChildren()
    if (petType.value == 'Any animal') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim()
    }
    else if (petType.value == 'Cats') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim() + '&type=cat'
    }
    else if (petType.value == 'Dogs') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim() + '&type=dog'
    }
    if (petAgeFilter.value == 'Any age') {
        var apiUrlFinal = apiUrl
    }
    else if (petAgeFilter.value == 'BABY') {
        var apiUrlFinal = apiUrl + '&age=baby,young'
    }
    else if (petAgeFilter.value == 'ADULT') {
        var apiUrlFinal = apiUrl + '&age=adult'
    }
    else if (petAgeFilter.value == 'SENIOR') {
        var apiUrlFinal = apiUrl + '&age=senior'
    }
    fetch(apiUrlFinal, {
        headers: {
            'Authorization': `Bearer ${token_}`
        }
    }).then(function (response) {
        if (response.ok) {
            document.querySelector('#invalid').style.display = 'none';
            return response.json();
        } else {
            document.querySelector('#invalid').style.display = 'inline';
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
            var cardTemplate = `${petName}`;
            var peth1 = document.createElement('h1')
            var petdiv = document.createElement('div')
            var petimg = document.createElement('img')
            var petInfoSpecies = document.createElement('p')
            var petInfoAge = document.createElement('p')
            var petInfoDist = document.createElement('p')
            var petInfoContact = document.createElement('p')
            var petsec = document.createElement('section')
            if (data.animals[index].photos.length === 0) {
                continue
            } else if (data.animals[index].contact.email === null && data.animals[index].contact.phone === null) {
                continue
            }
            else {
                counter++;
                if (counter > 12 && counter < 25) {
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
                    petInfoDist.textContent = `${petDistance} miles away from ` + zipcode.value.trim()
                    petdiv.append(petInfoContact)
                    petInfoSpecies.textContent = `Species: ${petSpecies}`
                    petInfoAge.textContent = `Age: ${petAge}`
                    petInfoContact.textContent = `Contact: ${petEmail} ${petPhone}`
                    if (data.animals[index].contact.email === null) {
                        petInfoContact.textContent = `Contact: ${petPhone}`
                    }
                    else if (data.animals[index].contact.phone === null) {
                        petInfoContact.textContent = `Contact: ${petEmail}`
                    }
                }

            }
        }
    }).catch(function (error) {
        console.warn(error);
    });
}

function pageThree() {
    let counter = 0
    petListing.replaceChildren()
    if (petType.value == 'Any animal') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim()
    }
    else if (petType.value == 'Cats') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim() + '&type=cat'
    }
    else if (petType.value == 'Dogs') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim() + '&type=dog'
    }
    if (petAgeFilter.value == 'Any age') {
        var apiUrlFinal = apiUrl
    }
    else if (petAgeFilter.value == 'BABY') {
        var apiUrlFinal = apiUrl + '&age=baby,young'
    }
    else if (petAgeFilter.value == 'ADULT') {
        var apiUrlFinal = apiUrl + '&age=adult'
    }
    else if (petAgeFilter.value == 'SENIOR') {
        var apiUrlFinal = apiUrl + '&age=senior'
    }
    fetch(apiUrlFinal, {
        headers: {
            'Authorization': `Bearer ${token_}`
        }
    }).then(function (response) {
        if (response.ok) {
            document.querySelector('#invalid').style.display = 'none';
            return response.json();
        } else {
            document.querySelector('#invalid').style.display = 'inline';
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
            var cardTemplate = `${petName}`;
            var peth1 = document.createElement('h1')
            var petdiv = document.createElement('div')
            var petimg = document.createElement('img')
            var petInfoSpecies = document.createElement('p')
            var petInfoAge = document.createElement('p')
            var petInfoDist = document.createElement('p')
            var petInfoContact = document.createElement('p')
            var petsec = document.createElement('section')
            if (data.animals[index].photos.length === 0) {
                continue
            } else if (data.animals[index].contact.email === null && data.animals[index].contact.phone === null) {
                continue
            }
            else {
                counter++;
                if (counter > 24 && counter < 37) {
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
                    petInfoDist.textContent = `${petDistance} miles away from ` + zipcode.value.trim()
                    petdiv.append(petInfoContact)
                    petInfoSpecies.textContent = `Species: ${petSpecies}`
                    petInfoAge.textContent = `Age: ${petAge}`
                    petInfoContact.textContent = `Contact: ${petEmail} ${petPhone}`
                    if (data.animals[index].contact.email === null) {
                        petInfoContact.textContent = `Contact: ${petPhone}`
                    }
                    else if (data.animals[index].contact.phone === null) {
                        petInfoContact.textContent = `Contact: ${petEmail}`
                    }
                }

            }
        }
    }).catch(function (error) {
        console.warn(error);
    });
}

function pageFour() {
    let counter = 0
    petListing.replaceChildren()
    if (petType.value == 'Any animal') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim()
    }
    else if (petType.value == 'Cats') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim() + '&type=cat'
    }
    else if (petType.value == 'Dogs') {
        var apiUrl = 'https://api.petfinder.com/v2/animals?distance=500&sort=distance&limit=100&status=adoptable&location=' + zipcode.value.trim() + '&type=dog'
    }
    if (petAgeFilter.value == 'Any age') {
        var apiUrlFinal = apiUrl
    }
    else if (petAgeFilter.value == 'BABY') {
        var apiUrlFinal = apiUrl + '&age=baby,young'
    }
    else if (petAgeFilter.value == 'ADULT') {
        var apiUrlFinal = apiUrl + '&age=adult'
    }
    else if (petAgeFilter.value == 'SENIOR') {
        var apiUrlFinal = apiUrl + '&age=senior'
    }
    fetch(apiUrlFinal, {
        headers: {
            'Authorization': `Bearer ${token_}`
        }
    }).then(function (response) {
        if (response.ok) {
            document.querySelector('#invalid').style.display = 'none';
            return response.json();
        } else {
            document.querySelector('#invalid').style.display = 'inline';
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
            var cardTemplate = `${petName}`;
            var peth1 = document.createElement('h1')
            var petdiv = document.createElement('div')
            var petimg = document.createElement('img')
            var petInfoSpecies = document.createElement('p')
            var petInfoAge = document.createElement('p')
            var petInfoDist = document.createElement('p')
            var petInfoContact = document.createElement('p')
            var petsec = document.createElement('section')
            var petfav = document.createElement('button')
            if (data.animals[index].photos.length === 0) {
                continue
            } else if (data.animals[index].contact.email === null && data.animals[index].contact.phone === null) {
                continue
            }
            else {
                counter++;
                if (counter > 36 && counter < 49) {
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
                    petInfoDist.textContent = `${petDistance} miles away from ` + zipcode.value.trim()
                    petdiv.append(petInfoContact)
                    petdiv.append(petfave)
                    petfave.className = 'favebtn'
                    petInfoSpecies.textContent = `Species: ${petSpecies}`
                    petInfoAge.textContent = `Age: ${petAge}`
                    petInfoContact.textContent = `Contact: ${petEmail} ${petPhone}`
                    petfav.textContent = 'Favorite'
                    if (data.animals[index].contact.email === null) {
                        petInfoContact.textContent = `Contact: ${petPhone}`
                    }
                    else if (data.animals[index].contact.phone === null) {
                        petInfoContact.textContent = `Contact: ${petEmail}`
                    }
                }

            }
        }
    }).catch(function (error) {
        console.warn(error);
    });
}

function saveFavorite(e) {
    if (e.target.className !== "favebtn") {
        return
    }
    var textAreaVal = e.target.previousElementSibling.value
    var lsKey = e.target.previousElementSibling.getAttribute('id')
    localStorage.setItem(lsKey, JSON.stringify(textAreaVal))
}

function displayFavorite() {
    document.querySelector('#favorites').value = JSON.parse(localStorage.getItem)
}

displayFavorite()

document.querySelector('#searchbtn').addEventListener('click', logAPI)
document.querySelector('#searchbtn').addEventListener('click', getToken(petFinderURL, userName, passWord))
// document.querySelector('#page1btn').addEventListener('click', logAPI)
// document.querySelector('#page2btn').addEventListener('click', pageTwo)
// document.querySelector('#page3btn').addEventListener('click', pageThree)
// document.querySelector('#page4btn').addEventListener('click', pageFour)