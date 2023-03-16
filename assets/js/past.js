
console.log(data);

//*Captura de contenedor de las cards
let cards_past= document.getElementById('cardsPast');
console.log(cards_past)

//*Variable para covertir en elemento tipo date y poder traer cards por fecha.

let newDate = Date.parse(data.currentDate);
let pastDate = data.events.filter(evento=>Date.parse(evento.date)<newDate);

//!Cards renderizadas - carga de manera dinamica las cards desde el archivo data.js
function renderCardPast (array, container){
    container.innerHTML=''
    let fragment= document.createDocumentFragment();
        if (array.length == 0){
            let alert = document.createElement('div')
            console.log(alert)
            alert.innerHTML = `<h3>There are no results for this search, try again.</h3>`
            container.appendChild(alert)
        }else{
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
                //console.log(elements);
                fragment.appendChild(div)
           
    }}
    container.appendChild(fragment)
}
  renderCardPast(pastDate,cards_past)

//* Captura de contenedor de checkbox
const navCheckbox = document.getElementById ('checkbox-past');

//! funcion de checkbox por categorias - este trae las categorias de las cards

function checkbox (array){

    // let arrayCategories = array.map(function (array){return array.category});
    //let newCategorys = [...new Set (arrayCategories)]

    let newCategorys = [...new Set(array.map(function (array){return array.category}))]
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
checkbox(pastDate)

let inputChecked =[]
let inputText= ''

//! funcion de filtros por Categorias
function newSelectionArrays(arrayCategorys, arrayObjets){
    if (arrayCategorys.length === 0) 
      return arrayObjets
      let newArrayFilter= arrayObjets.filter(evento =>arrayCategorys.includes(evento.category))
      return newArrayFilter
  }

//!Funcion de filtro por busqueda
function searchCards(value, arrayObjets) {
    if (value =='') return arrayObjets
    return arrayObjets.filter(evento => evento.name.toLowerCase().includes(value.toLowerCase().trim())     
   )}

//!Checks
const allCheckbox = document.querySelectorAll ('input[type=checkbox]');
    allCheckbox.forEach(checkbox=>{checkbox.addEventListener('change', ()=>{
     inputChecked = Array.from(allCheckbox).filter(checkbox => checkbox.checked).map(input => input.value)
     console.log(inputChecked)
    filterAll (pastDate);  
})})

//!Search
const inputSearch = document.getElementById ('search-past')
    inputSearch.addEventListener('keyup', (e)=>{
    inputText = inputSearch.value
    console.log(inputText)
   filterAll(pastDate)
 })

//! Funcion para filtros cruzados
 function filterAll (array){
    let cardsChecked= newSelectionArrays(inputChecked,array)
    let checkFinalSelect= searchCards(inputText,cardsChecked)
    console.log(checkFinalSelect)
    renderCardPast(checkFinalSelect,cards_past)
}


