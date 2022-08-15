function saveFaves(e) {
    if (e.target.tagName !== "BUTTON") {
        return
    }
    var petSave = document.getElementsByClassName('saveFave')
    var lsKey = e.target.previousElementSibling.value
    localStorage.setItem('SavedPets', JSON.stringify(petSave))
    console.log(petSave)
    var test = '2wwat'
    localStorage.setItem(test, JSON.stringify(test))
}

function displayFaves() {
    document.querySelector('#displayFaves').value = localStorage.getItem('SavedPets')
}

displayFaves()