const showFavoriteListings = (e) => {
    for (let i = 0; i < 48; ++i) {
        let petz = document.querySelector('#petListing')
        let petzdiv = document.createElement('div')
        petz.append(petzdiv)
        petzdiv.setAttribute('id', `displayPet${i + 1}`)
        document.querySelector(`#displayPet${i + 1}`).outerHTML = localStorage.getItem(`pet${i + 1}`);
        var petBtn = document.getElementById(`petbtn${i + 1}`)


        // Select section
        var parent = document.getElementById(`pet${i + 1}`);

        // Check the section if is undefined or not
        if(parent) {
            var petName = parent.firstChild;
            var sibling = petName.nextSibling;
            var btn = sibling.lastElementChild; 
            petBtn.removeAttribute('class')
            petBtn.className = 'petdel'
            document.querySelector(`#petbtn${i + 1}`).textContent = `Remove ${petName.textContent} from favorites`

            // Add event listener to button/s
             btn.addEventListener('click', (e) => {
                var item = localStorage.getItem(`pet${i + 1}`);
                var parent = document.getElementById(`pet${i + 1}`);
                var button = document.getElementById(`${e.target.id}`)
                var petName = parent.firstChild;
     
                 // Check the favorite pet in local storage
                if(item && button.textContent == `Remove ${petName.textContent} from favorites` ) {
                    button.textContent = `Are you sure you want to unfavorite ${petName.textContent}?`
                    } 
                else {
                    // Delete the favorite pet in local storage
                    localStorage.removeItem(`pet${i + 1}`);
                    button.textContent = `Removing ${petName.textContent}...`
                    // Delay for 2s
                    setTimeout(() => {
                        deletefavorite(i + 1)
                    }, 1000)


                    console.log(`${petName.textContent} is deleted`);
                }
             
            })
         
        }
    }

};

// Delete favorite visually 
function deletefavorite(item) {
    // End the function
    if(!item) return

    // remove the entire section element from  DOM
    document.getElementById(`pet${item}`).remove()
}

// function removeDuplicates(item) {
//     var nodes = [...document.getElementsByClassName('petimageClass')];
//     const texts = new Set(nodes.map(x => x.innerHTML));
//     nodes.forEach(node => {
//       if(texts.has(node.innerHTML)){
//         texts.delete(node.innerHTML);
//       }
//       else{
//         document.getElementById(`pet${item + 1}`).remove()
//       }
//     })
// }

// removeDuplicates()
showFavoriteListings()

// Old code, changed after review with mentor

// function saveFaves(e) {
//     document.querySelector('.displayPet1').outerHTML = localStorage.getItem('pet1')
//     document.querySelector('.displayPet2').outerHTML = localStorage.getItem('pet2')
//     document.querySelector('.displayPet3').outerHTML = localStorage.getItem('pet3')
//     document.querySelector('.displayPet4').outerHTML = localStorage.getItem('pet4')
//     document.querySelector('.displayPet5').outerHTML = localStorage.getItem('pet5')
//     document.querySelector('.displayPet6').outerHTML = localStorage.getItem('pet6')
//     document.querySelector('.displayPet7').outerHTML = localStorage.getItem('pet7')
//     document.querySelector('.displayPet8').outerHTML = localStorage.getItem('pet8')
//     document.querySelector('.displayPet9').outerHTML = localStorage.getItem('pet9')
//     document.querySelector('.displayPet10').outerHTML = localStorage.getItem('pet10')
//     document.querySelector('.displayPet11').outerHTML = localStorage.getItem('pet11')
//     document.querySelector('.displayPet12').outerHTML = localStorage.getItem('pet12')
//     document.querySelector('.displayPet13').outerHTML = localStorage.getItem('pet13')
//     document.querySelector('.displayPet14').outerHTML = localStorage.getItem('pet14')
//     document.querySelector('.displayPet15').outerHTML = localStorage.getItem('pet15')
//     document.querySelector('.displayPet16').outerHTML = localStorage.getItem('pet16')
//     document.querySelector('.displayPet17').outerHTML = localStorage.getItem('pet17')
//     document.querySelector('.displayPet18').outerHTML = localStorage.getItem('pet18')
//     document.querySelector('.displayPet19').outerHTML = localStorage.getItem('pet19')
//     document.querySelector('.displayPet20').outerHTML = localStorage.getItem('pet20')
//     document.querySelector('.displayPet21').outerHTML = localStorage.getItem('pet21')
//     document.querySelector('.displayPet22').outerHTML = localStorage.getItem('pet22')
//     document.querySelector('.displayPet23').outerHTML = localStorage.getItem('pet23')
//     document.querySelector('.displayPet24').outerHTML = localStorage.getItem('pet24')
//     document.querySelector('.displayPet25').outerHTML = localStorage.getItem('pet25')
//     document.querySelector('.displayPet26').outerHTML = localStorage.getItem('pet26')
//     document.querySelector('.displayPet27').outerHTML = localStorage.getItem('pet27')
//     document.querySelector('.displayPet28').outerHTML = localStorage.getItem('pet28')
//     document.querySelector('.displayPet29').outerHTML = localStorage.getItem('pet29')
//     document.querySelector('.displayPet30').outerHTML = localStorage.getItem('pet30')
//     document.querySelector('.displayPet31').outerHTML = localStorage.getItem('pet31')
//     document.querySelector('.displayPet32').outerHTML = localStorage.getItem('pet32')
//     document.querySelector('.displayPet33').outerHTML = localStorage.getItem('pet33')
//     document.querySelector('.displayPet34').outerHTML = localStorage.getItem('pet34')
//     document.querySelector('.displayPet35').outerHTML = localStorage.getItem('pet35')
//     document.querySelector('.displayPet36').outerHTML = localStorage.getItem('pet36')
//     document.querySelector('.displayPet37').outerHTML = localStorage.getItem('pet37')
//     document.querySelector('.displayPet38').outerHTML = localStorage.getItem('pet38')
//     document.querySelector('.displayPet39').outerHTML = localStorage.getItem('pet39')
//     document.querySelector('.displayPet40').outerHTML = localStorage.getItem('pet40')
//     document.querySelector('.displayPet41').outerHTML = localStorage.getItem('pet41')
//     document.querySelector('.displayPet42').outerHTML = localStorage.getItem('pet42')
//     document.querySelector('.displayPet43').outerHTML = localStorage.getItem('pet43')
//     document.querySelector('.displayPet44').outerHTML = localStorage.getItem('pet44')
//     document.querySelector('.displayPet45').outerHTML = localStorage.getItem('pet45')
//     document.querySelector('.displayPet46').outerHTML = localStorage.getItem('pet46')
//     document.querySelector('.displayPet47').outerHTML = localStorage.getItem('pet47')
//     document.querySelector('.displayPet48').outerHTML = localStorage.getItem('pet48')