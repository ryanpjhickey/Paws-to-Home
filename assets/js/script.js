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
var manyPages = document.querySelector('#pages')
var counter2 = 0

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

function logAPI2() {
    var apiUrl2 = 'https://cat-fact.herokuapp.com/facts'
    fetch(apiUrl2
    ).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }).then(function (data) {
        index = Math.floor(Math.random() * 5) + 0;
        document.querySelector('#catFact').textContent = data[index].text
    })
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
    else if (petAgeFilter.value == 'Baby') {
        var apiUrlFinal = apiUrl + '&age=baby,young'
    }
    else if (petAgeFilter.value == 'Adult') {
        var apiUrlFinal = apiUrl + '&age=adult'
    }
    else if (petAgeFilter.value == 'Senior') {
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
            var petBtn = document.createElement('button')
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
                    petsec.className = 'card column is-one-third saveFave'
                    petsec.setAttribute('id', `pet${counter}`)
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
                    petdiv.append(petBtn)
                    petBtn.className = 'savePet'
                    petBtn.setAttribute('id', `petbtn${counter}`)
                    petBtn.textContent = `Save ${petName} to favorites`
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

function pageOne() {
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
    else if (petAgeFilter.value == 'Baby') {
        var apiUrlFinal = apiUrl + '&age=baby,young'
    }
    else if (petAgeFilter.value == 'Adult') {
        var apiUrlFinal = apiUrl + '&age=adult'
    }
    else if (petAgeFilter.value == 'Senior') {
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
            var petBtn = document.createElement('button')
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
                    petsec.className = 'card column is-one-third saveFave'
                    petsec.setAttribute('id', `pet${counter}`)
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
                    petdiv.append(petBtn)
                    petBtn.className = 'savePet'
                    petBtn.setAttribute('id', `petbtn${counter}`)
                    petBtn.textContent = `Save ${petName} to favorites`
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
    else if (petAgeFilter.value == 'Baby') {
        var apiUrlFinal = apiUrl + '&age=baby,young'
    }
    else if (petAgeFilter.value == 'Adult') {
        var apiUrlFinal = apiUrl + '&age=adult'
    }
    else if (petAgeFilter.value == 'Senior') {
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
            var petBtn = document.createElement('button')
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
                    petsec.append(peth1)
                    petsec.className = 'card column is-one-third saveFave'
                    petsec.setAttribute('id', `pet${counter}`)
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
                    petdiv.append(petBtn)
                    petBtn.className = 'savePet'
                    petBtn.setAttribute('id', `petbtn${counter}`)
                    petBtn.textContent = `Save ${petName} to favorites`
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
    else if (petAgeFilter.value == 'Baby') {
        var apiUrlFinal = apiUrl + '&age=baby,young'
    }
    else if (petAgeFilter.value == 'Adult') {
        var apiUrlFinal = apiUrl + '&age=adult'
    }
    else if (petAgeFilter.value == 'Senior') {
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
            var petBtn = document.createElement('button')
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
                    petsec.append(peth1)
                    petsec.className = 'card column is-one-third saveFave'
                    petsec.setAttribute('id', `pet${counter}`)
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
                    petdiv.append(petBtn)
                    petBtn.className = 'savePet'
                    petBtn.setAttribute('id', `petbtn${counter}`)
                    petBtn.textContent = `Save ${petName} to favorites`
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
    else if (petAgeFilter.value == 'Baby') {
        var apiUrlFinal = apiUrl + '&age=baby,young'
    }
    else if (petAgeFilter.value == 'Adult') {
        var apiUrlFinal = apiUrl + '&age=adult'
    }
    else if (petAgeFilter.value == 'Senior') {
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
            var petBtn = document.createElement('button')
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
                    petsec.append(peth1)
                    petsec.className = 'card column is-one-third saveFave'
                    petsec.setAttribute('id', `pet${counter}`)
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
                    petdiv.append(petBtn)
                    petBtn.className = 'savePet'
                    petBtn.setAttribute('id', `petbtn${counter}`)
                    petBtn.textContent = `Save ${petName} to favorites`
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

function saveFaves(e) {
    if (e.target.tagName !== "BUTTON") {
        return
    }
    if (e.target.id === `petbtn1`) {
        var petSave = document.getElementById(`pet1`).outerHTML
        var lskey = 'pet1'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn2`) {
        var petSave = document.getElementById(`pet2`).outerHTML
        var lskey = 'pet2'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn3`) {
        var petSave = document.getElementById(`pet3`).outerHTML
        var lskey = 'pet3'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn4`) {
        var petSave = document.getElementById(`pet4`).outerHTML
        var lskey = 'pet4'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn5`) {
        var petSave = document.getElementById(`pet5`).outerHTML
        var lskey = 'pet5'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn6`) {
        var petSave = document.getElementById(`pet6`).outerHTML
        var lskey = 'pet6'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn7`) {
        var petSave = document.getElementById(`pet7`).outerHTML
        var lskey = 'pet7'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn8`) {
        var petSave = document.getElementById(`pet8`).outerHTML
        var lskey = 'pet8'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn9`) {
        var petSave = document.getElementById(`pet9`).outerHTML
        var lskey = 'pet9'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn10`) {
        var petSave = document.getElementById(`pet10`).outerHTML
        var lskey = 'pet10'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn11`) {
        var petSave = document.getElementById(`pet11`).outerHTML
        var lskey = 'pet11'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn12`) {
        var petSave = document.getElementById(`pet12`).outerHTML
        var lskey = 'pet12'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn13`) {
        var petSave = document.getElementById(`pet13`).outerHTML
        var lskey = 'pet13'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn14`) {
        var petSave = document.getElementById(`pet14`).outerHTML
        var lskey = 'pet14'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn15`) {
        var petSave = document.getElementById(`pet15`).outerHTML
        var lskey = 'pet15'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn16`) {
        var petSave = document.getElementById(`pet16`).outerHTML
        var lskey = 'pet16'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn17`) {
        var petSave = document.getElementById(`pet17`).outerHTML
        var lskey = 'pet17'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn18`) {
        var petSave = document.getElementById(`pet18`).outerHTML
        var lskey = 'pet18'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn19`) {
        var petSave = document.getElementById(`pet19`).outerHTML
        var lskey = 'pet19'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn20`) {
        var petSave = document.getElementById(`pet20`).outerHTML
        var lskey = 'pet20'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn21`) {
        var petSave = document.getElementById(`pet21`).outerHTML
        var lskey = 'pet21'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn22`) {
        var petSave = document.getElementById(`pet22`).outerHTML
        var lskey = 'pet22'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn23`) {
        var petSave = document.getElementById(`pet23`).outerHTML
        var lskey = 'pet23'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn24`) {
        var petSave = document.getElementById(`pet24`).outerHTML
        var lskey = 'pet24'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn25`) {
        var petSave = document.getElementById(`pet25`).outerHTML
        var lskey = 'pet25'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn26`) {
        var petSave = document.getElementById(`pet26`).outerHTML
        var lskey = 'pet26'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn27`) {
        var petSave = document.getElementById(`pet27`).outerHTML
        var lskey = 'pet27'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn28`) {
        var petSave = document.getElementById(`pet28`).outerHTML
        var lskey = 'pet28'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn29`) {
        var petSave = document.getElementById(`pet29`).outerHTML
        var lskey = 'pet29'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn30`) {
        var petSave = document.getElementById(`pet30`).outerHTML
        var lskey = 'pet30'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn31`) {
        var petSave = document.getElementById(`pet31`).outerHTML
        var lskey = 'pet31'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn32`) {
        var petSave = document.getElementById(`pet32`).outerHTML
        var lskey = 'pet32'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn33`) {
        var petSave = document.getElementById(`pet33`).outerHTML
        var lskey = 'pet33'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn34`) {
        var petSave = document.getElementById(`pet34`).outerHTML
        var lskey = 'pet34'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn35`) {
        var petSave = document.getElementById(`pet35`).outerHTML
        var lskey = 'pet35'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn36`) {
        var petSave = document.getElementById(`pet36`).outerHTML
        var lskey = 'pet36'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn37`) {
        var petSave = document.getElementById(`pet37`).outerHTML
        var lskey = 'pet37'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn38`) {
        var petSave = document.getElementById(`pet38`).outerHTML
        var lskey = 'pet38'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn39`) {
        var petSave = document.getElementById(`pet39`).outerHTML
        var lskey = 'pet39'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn40`) {
        var petSave = document.getElementById(`pet40`).outerHTML
        var lskey = 'pet40'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn41`) {
        var petSave = document.getElementById(`pet41`).outerHTML
        var lskey = 'pet41'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn42`) {
        var petSave = document.getElementById(`pet42`).outerHTML
        var lskey = 'pet42'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn43`) {
        var petSave = document.getElementById(`pet43`).outerHTML
        var lskey = 'pet43'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn44`) {
        var petSave = document.getElementById(`pet44`).outerHTML
        var lskey = 'pet44'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn45`) {
        var petSave = document.getElementById(`pet45`).outerHTML
        var lskey = 'pet45'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn46`) {
        var petSave = document.getElementById(`pet46`).outerHTML
        var lskey = 'pet46'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn47`) {
        var petSave = document.getElementById(`pet47`).outerHTML
        var lskey = 'pet47'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
    else if (e.target.id === `petbtn48`) {
        var petSave = document.getElementById(`pet48`).outerHTML
        var lskey = 'pet48'
        localStorage.setItem(lskey, petSave)
        console.log(petSave)
        console.log(localStorage)
    }
}

function createPages() {
    var page1btn = document.createElement('button')
    var page2btn = document.createElement('button')
    var page3btn = document.createElement('button')
    var page4btn = document.createElement('button')
    manyPages.append(page1btn)
    manyPages.append(page2btn)
    manyPages.append(page3btn)
    manyPages.append(page4btn)
    page1btn.setAttribute('id', 'page1btn')
    page2btn.setAttribute('id', 'page2btn')
    page3btn.setAttribute('id', 'page3btn')
    page4btn.setAttribute('id', 'page4btn')
    page1btn.textContent = '1'
    page2btn.textContent = '2'
    page3btn.textContent = '3'
    page4btn.textContent = '4'
    document.querySelector('#page1btn').addEventListener('click', pageOne)
    document.querySelector('#page2btn').addEventListener('click', pageTwo)
    document.querySelector('#page3btn').addEventListener('click', pageThree)
    document.querySelector('#page4btn').addEventListener('click', pageFour)
    document.querySelector('#searchbtn').removeEventListener('click', createPages)
}

document.querySelector('#searchbtn').addEventListener('click', logAPI)
document.querySelector('#searchbtn').addEventListener('click', createPages)
document.querySelector('#searchbtn').addEventListener('click', getToken(petFinderURL, userName, passWord))
document.querySelector('.petContainer').addEventListener('click', saveFaves)
logAPI2()
