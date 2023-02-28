console.log(data);
let cards_index= document.getElementById('cardsEvents');
console.log(cards_index)

let fragment= document.createDocumentFragment()

for (let elements of data.events){
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
cards_index.appendChild(fragment)