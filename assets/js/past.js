console.log(data);
let cards_past= document.getElementById('cardsPast');
console.log(cards_past)

let fragment= document.createDocumentFragment();
let newDate = Date.parse(data.currentDate);

for (let elements of data.events){
    let pastDate = Date.parse(elements.date);
    if (pastDate<newDate){
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
cards_past.appendChild(fragment)