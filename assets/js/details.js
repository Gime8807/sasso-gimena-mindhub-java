const queryString = location.search
console.log(queryString)
const params = new URLSearchParams (queryString)
const id = params.get('id')
console.log(params)

 const cardDetails = data.events.find (evento => evento._id == id)
 console.log(cardDetails)

 function MostrarCards (){
 const containerCardDetails = document.getElementById('cardDetails')
 let boxCard = document.createElement ('div');
     boxCard.className='card details border-3 border-dark rounded shadow p-3 mb-5 bg-body-tertiary rounded'
     boxCard.innerHTML=` <img src="${cardDetails.image}" class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">${cardDetails.name}</h5>
       <p class="card-text">${cardDetails.description}</p>
       <p class="d-flex text-center align-items-center">Price:${cardDetails.price}</p>
       <a href="./index.html" class="btn btn-warning">Volver</a>
     </div>`
     containerCardDetails.appendChild(boxCard)
}

MostrarCards ()