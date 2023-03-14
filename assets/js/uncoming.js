
//console.log(data);

//*Captura de contenedor de las cards

let cards_uncoming= document.getElementById('cardsUncoming');
//console.log(cards_uncoming)


let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function newDataUncoming(){
    try{
        let response = await fetch(urlApi)
        let dataDos = await response.json()
            console.log(dataDos.events)

         const newDate = Date.parse(dataDos.currentDate);
             console.log(newDate)
        const uncomingDate = Date.parse(dataDos.events[0].date);
            console.log(uncomingDate)

        let fechasCard= dataDos.events.filter(evento=>Date.parse(evento.date)>newDate);
             
            console.log(fechasCard)
        
        renderCardUncoming(fechasCard,cards_uncoming)
        checkbox(dataDos.events)

        //!Checks
        const allCheckbox = document.querySelectorAll ('input[type=checkbox]');
        allCheckbox.forEach(checkbox=>{checkbox.addEventListener('change', ()=>{
        inputChecked = Array.from(allCheckbox).filter(checkbox => checkbox.checked).map(input => input.value)
        console.log(inputChecked)
        filterAll (dataDos.events);  
        })})

        //!Search
        const inputSearch = document.getElementById ('search-uncoming')
        inputSearch.addEventListener('keyup', (e)=>{
            inputText = inputSearch.value
            console.log(inputText)
        filterAll(dataDos.events)
        })
        

    }catch(error){
        console.log('Estoy en el catch:' + error.message)
    } 
  }
  newDataUncoming()  

//!Cards renderizadas - carga de manera dinamica las cards desde el archivo data.js

function renderCardUncoming (array, container){
    container.innerHTML=''
    let fragment= document.createDocumentFragment();
        
        for (let elements of array){

            if (array.length == 0){
                let alert = document.createElement('div')
                console.log(alert)
                alert.innerHTML = `<h3>No hay resultados para esta busqueda, intentalo nuevamente.</h3>`
                container.appendChild(alert)
            }else{
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
        }    
    }
    container.appendChild(fragment)
}


//* Captura de contenedor de checkbox

const navCheckbox = document.getElementById ('checkbox-uncoming');

//! funcion de filtros por Categorias

let inputChecked =[]
let inputText= ''

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


function newSelectionArrays(arrayCategorys, arrayObjets){
    if (arrayCategorys.length === 0) 
      return arrayObjets
   let newArrayFilter= arrayObjets.filter(evento =>arrayCategorys.includes(evento.category))
   return newArrayFilter
  }

  function searchCards(value, arrayObjets) {
    if (value =='') return arrayObjets
    return arrayObjets.filter(evento => evento.name.toLowerCase().includes(value.toLowerCase().trim())     
   )}



 function filterAll (array){
    let cardsChecked= newSelectionArrays(inputChecked,array)
    let checkFinalSelect= searchCards(inputText,cardsChecked)
    console.log(checkFinalSelect)
    renderCardUncoming(checkFinalSelect,cards_uncoming)
}





