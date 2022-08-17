var token_
var userName = "oVZ5FdhYCgBs9YDLsTt3ue4B1vfLHZZE68Knl3asVI8Je1u49J";
var passWord = "q41oLHMowHzg43asWLf72FJgRTMleScmdXAXeiiD";
var petFinderURL = "https://api.petfinder.com/v2/oauth2/token";
var request = new XMLHttpRequest();
var petListing = document.querySelector('#petListing')
var zipcode = document.querySelector('#zip')
var petType = document.querySelector('.petType')
var petAgeFilter = document.querySelector('.petAgeFilter')
var counter = 0
var manyPages = document.querySelector('#pages')

function getToken(url, clientID, clientSecret) {
    var key;
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("grant_type=client_credentials&client_id=" + clientID + "&" + "client_secret=" + clientSecret);
    request.onreadystatechange = function () {
        if (request.readyState == request.DONE) {
            var response = request.responseText;
            var obj = JSON.parse(response);
            key = obj.access_token;
            token_ = key;
        }
    }
}

var catData = ['While us humans have 206 bones, cats on average have 244.', 'A house cat is genetically 95.6% tiger.', 'Cats can run around 48 kph (30 mph), but only over short distances.', 'Cats can jump 5 times their height.', 'Adult cats have 30 teeth, while kittens have 26.'
]

indexCatFacts = Math.floor(Math.random() * 5) + 0;
document.querySelector('#catFact').textContent = catData[indexCatFacts]

function logAPI2() {
    var apiUrl2 = 'https://cat-fact.herokuapp.com/facts';
    fetch(apiUrl2
    ).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            indexCatFacts = Math.floor(Math.random() * 5) + 0;
            document.querySelector('#catFact').textContent = catData[indexCatFacts]
        }
        throw response;
    }).then(function (data) {
        index = Math.floor(Math.random() * 5) + 0;
        document.querySelector('#catFact').textContent = data[index].text
        console.log(data)
    }).catch(function (error) {
        console.warn(error);
    });
}

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
            var petDistance = data.animals[index].distance.toFixed(1)
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
            var petDistance = data.animals[index].distance.toFixed(1)
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
            var petDistance = data.animals[index].distance.toFixed(1)
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
            var petDistance = data.animals[index].distance.toFixed(1)
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
            var petDistance = data.animals[index].distance.toFixed(1)
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
    for (let petListI = 0; petListI < 48; petListI++) {
        if (e.target.id === `petbtn${petListI + 1}`) {
            var petSave = document.getElementById(`pet${petListI + 1}`).outerHTML
            var lskey = `pet${petListI + 1}`
            localStorage.setItem(lskey, petSave)
            console.log(petSave)
            console.log(localStorage)
        }
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
    page1btn.textContent = 'Page 1'
    page2btn.textContent = 'Page 2'
    page3btn.textContent = 'Page 3'
    page4btn.textContent = 'Page 4'
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

