const showFavoriteListings = (e) => {
    for (let i = 0; i < 48; ++i) {
        let petz = document.querySelector('#displayAllFaves')
        let petzdiv = document.createElement('div')
        petz.append(petzdiv)
        petzdiv.setAttribute('id', `displayPet${i + 1}`)
        document.querySelector(`#displayPet${i + 1}`).outerHTML = localStorage.getItem(`pet${i + 1}`);
    }
};

showFavoriteListings()