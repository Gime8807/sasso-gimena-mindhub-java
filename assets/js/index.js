console.log(data);
console.log([document])


//*Captura de contenedor de las cards
const cards_index= document.getElementById('cardsEvents');
console.log(cards_index)

//!Cards renderizadas - carga de manera dinamica las cards desde el archivo data.js

function renderCard (array, container){
    container.innerHTML=''
    let fragment= document.createDocumentFragment()
    
    for (let elements of array){
        let div = document.createElement('div')
        div.classList.add ("card","m-3")
        div.classList.add ("border-3","border-dark","rounded")
        div.classList.add( "shadow","p-3","mb-5","bg-body-tertiary","rounded")
        div.style.width ="18rem"
        div.innerHTML = `<img src="${elements.image}" class="card-img-top" alt="...">
        <div class="card-body">
         <h5 class="card-title">${elements.name}</h5>
         <p class="card-text">${elements.description}</p>
         <p class="d-flex text-center align-items-center">Price:${elements.price}</p>
         <a href="./card.html?id=${elements._id}" class="btn btn-warning">Details</a>
         </div>`
         console.log(elements);
         fragment.appendChild(div)    
    }
    cards_index.appendChild(fragment)

}
//*llamado de la funcion de cards
renderCard(data.events,cards_index);



//* Captura de contenedor de checkbox

const navCheckbox = document.getElementById ('checkbox');

//! funcion de checkbox por categorias - este trae las categorias de las cards

function checkbox (array){

    let arrayCategories = array.map(function (array){return array.category});
    let newCategorys = [...new Set (arrayCategories)]
     console.log(newCategorys)
    
    let fragment= document.createDocumentFragment()
    
    for (let element of newCategorys){
    let div = document.createElement('div')
    div.classList.add ("form-check")
    div.innerHTML = `<input class="form-check-input" type="checkbox" value="${element}" id="${element}">
    <label class="form-check-label text-light" for="flexCheckIndeterminate">${element}</label>`
     console.log(element);
   fragment.appendChild(div)
}
navCheckbox.appendChild (fragment)
}

//*llamado de la funcion de busqueda checkbox 
checkbox(data.events)

let allCheckbox = document.querySelectorAll ('input[type=checkbox]');
console.log(allCheckbox)

allCheckbox.forEach(checkbox=>{checkbox.addEventListener('change', newSelection)})

function newSelection(){

  let inputChecked = Array.from(allCheckbox).filter(checkbox => checkbox.checked)
  console.log(inputChecked);
  
  let inputsValue = inputChecked.map(input => input.value)
  console.log(inputsValue);

 let eventosFiltrados = data.events.filter(evento =>inputsValue.includes(evento.category))
    console.log(eventosFiltrados);
    renderCard(eventosFiltrados,cards_index)
}



// //*Captura de contenedor de search

const inputSearch = document.getElementById ('search')
 
//! Search - este busca las cards por nombre
 inputSearch.addEventListener('keyup', searchCards)

 function searchCards(e) {
    console.log(e.target.value)
    let nameCards = data.events.filter(evento => {
      return evento.name.toLowerCase().search(e.target.value.toLowerCase().trim()) !== -1 
  })
 console.log(nameCards) 
 renderCard (nameCards,cards_index)   
}

