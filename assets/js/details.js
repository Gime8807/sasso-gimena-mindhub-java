const queryString = location.search
console.log(queryString)
const params = new URLSearchParams (queryString)
const id = params.get('id')
console.log(params)

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function details(){
  try{
    let response = await fetch(urlApi)
    let dataDos = await response.json()

    const cardDetails = dataDos.events.find (evento => evento._id == id)
    console.log(cardDetails)


    function ShowDetailsCards (){
      const containerCardDetails = document.getElementById('cardDetails')
      let boxCard = document.createElement ('div');
          boxCard.className='card details border-3 border-dark rounded shadow p-3 mb-5 bg-body-tertiary rounded'
          boxCard.innerHTML=` <img src="${cardDetails.image}" class="card-img-top" alt="...">
            <div class="d-flex flex-column justify-content-center card-body">
              <h5 class="card-title">${cardDetails.name}</h5>
              <p class="card-text"><b>Category: </b>${cardDetails.category}</p>
              <p class="card-text"><b>Date: </b> ${cardDetails.date}</p>
              <p class="card-text">${cardDetails.description}</p>
              <p class="card-text"><b>Place: </b>${cardDetails.place}</p>
              <p class="card-text"><b>${cardDetails.assistance?'Asistance':'Estimate'}: </b>${cardDetails.assistance?cardDetails.assistance:cardDetails.estimate}</p>
              <p class="card-text"><b>Capacity: </b>${cardDetails.capacity}</p>
              <p class="d-flex text-center align-items-center"><b>Price: </b>${cardDetails.price}$</p>
              <button onclick="history.back()" class="btn btn-warning">Return</button>
            </div>`
       containerCardDetails.appendChild(boxCard)
  }
  
  ShowDetailsCards ()
  
  }catch(error){
    console.log('Estoy en el catch:' + error.message)
} 
}
details()  

 

