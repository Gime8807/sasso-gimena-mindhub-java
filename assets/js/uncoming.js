
console.log(data);

//Creamos una variable para llamar al div donde se van alojar las cards, por id de elemento.
let cards_uncoming= document.getElementById('cardsUncoming');
console.log(cards_uncoming)
//Usamos esta propiedad de fragment para que no se recargue el sitio xq cada vuelta de funcion.
let fragment= document.createDocumentFragment();
//Creamos una variable para usar de referencia la fecha actual y separar las cards, pasamos el dato de strig a numero con la fucnion parse.
let newDate = Date.parse(data.currentDate);
//Creamos la funcion for para crear las cards de manera dinamica, llamando al array de los elementos del archivo data, con data. events, a su vez debemos pasar a numero la fecha de cada evento, creamos la variable uncomingDate, y usando un if le pedimos que nos traiga los eventos posteriores a la fecha actual, para luego crear cada cards en contenedor. 
for (let elements of data.events){
    let uncomingDate = Date.parse(elements.date);
    if (uncomingDate>newDate){
        let div = document.createElement('div')
        div.classList.add ("card","m-3")
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