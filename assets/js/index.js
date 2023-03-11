// console.log(data);
// console.log([document])

const cardContainer = document.getElementById ('cardsEvents');
const navCheckbox = document.getElementById ('checkbox');


let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function newData(){
  try{
    let response = await fetch(urlApi)
    let dataDos = await response.json()

    renderCard(dataDos.events,cardContainer);
    checkbox(dataDos.events)

    //!Checks
      const allCheckbox = document.querySelectorAll ('input[type=checkbox]');
      allCheckbox.forEach(checkbox=>{checkbox.addEventListener('change', ()=>{
      inputChecked = Array.from(allCheckbox).filter(checkbox => checkbox.checked).map(input => input.value)
      console.log(inputChecked)
        filterAll (dataDos.events);  
      })})

    //!Search
    const inputSearch = document.getElementById ('search')
    inputSearch.addEventListener('keyup', (e)=>{
    inputText = inputSearch.value
    console.log(inputText)
    filterAll(dataDos.events)
    })
  }catch(error){
      console.log('Estoy en el catch:' + error.message)
  } 
}
newData()


//!Cards renderizadas - carga de manera dinamica las cards desde el archivo data.js

function renderCard (array,container){
    container.innerHTML= ''
    let fragment= document.createDocumentFragment()
      if (array.length == 0){
            let alert = document.createElement('div')
            console.log(alert)
            alert.innerHTML = `<h3>No hay resultados para esta busqueda, intentalo nuevamente.</h3>`
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
          console.log(elements);
          fragment.appendChild(div)    
         }
    container.appendChild(fragment)
}
}


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


let inputChecked =[]
let inputText= ''

//!Funcion para filtro por Categorias
function newSelectionArrays(arrayCategorys, arrayObjets){
    if (arrayCategorys.length === 0) 
      return arrayObjets
      let newArrayFilter= arrayObjets.filter(evento =>arrayCategorys.includes(evento.category))
      return newArrayFilter
  }

//!Funcion para filtro por Busqueda
  function searchCards(value, arrayObjets) {
    if (value =='') return arrayObjets
    return arrayObjets.filter(evento => evento.name.toLowerCase().includes(value.toLowerCase().trim())     
   )}


//! Funcion para filtros cruzados
 function filterAll (array){
    let cardsChecked= newSelectionArrays(inputChecked,array)
    let checkFinalSelect= searchCards(inputText,cardsChecked)
    console.log(checkFinalSelect)
    renderCard(checkFinalSelect,cardContainer)
}


