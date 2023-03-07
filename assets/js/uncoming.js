
console.log(data);


//Creamos una variable para llamar al div donde se van alojar las cards, por id de elemento.
//Usamos esta propiedad de fragment para que no se recargue el sitio xq cada vuelta de funcion.
//Creamos una variable para usar de referencia la fecha actual y separar las cards, pasamos el dato de strig a numero con la fucnion parse.
//Creamos la funcion for para crear las cards de manera dinamica, llamando al array de los elementos del archivo data, con data. events, a su vez debemos pasar a numero la fecha de cada evento, creamos la variable uncomingDate, y usando un if le pedimos que nos traiga los eventos posteriores a la fecha actual, para luego crear cada cards en contenedor.

//*Captura de contenedor de las cards
let cards_uncoming= document.getElementById('cardsUncoming');
console.log(cards_uncoming)

//*Variable para covertir en elemento tipo date y poder traer cards por fecha.
let newDate = Date.parse(data.currentDate);

//!Cards renderizadas - carga de manera dinamica las cards desde el archivo data.js

function renderCardUncoming (array, container){
    container.innerHTML=''
    let fragment= document.createDocumentFragment();

    for (let elements of array){
        let uncomingDate = Date.parse(elements.date);
        if (uncomingDate>newDate){
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
             <a href="./card.html" class="btn btn-warning">Details</a>
             </div>`
             console.log(elements);
             fragment.appendChild(div)
        }    
    }
    cards_uncoming.appendChild(fragment)
}

renderCardUncoming(data.events,cards_uncoming)

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
