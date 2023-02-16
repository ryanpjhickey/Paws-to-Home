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
