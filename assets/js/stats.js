let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function tableStats(){
  try{
    let response = await fetch(urlApi)
    let dataDos = await response.json()

    const newDate = Date.parse(dataDos.currentDate);
  

    let dateCardUncoming= dataDos.events.filter(evento=>Date.parse(evento.date)>newDate); 
    let dateCardPast = dataDos.events.filter(evento=>Date.parse(evento.date)<newDate);

    const containerTableOne = document.getElementById('table1')
    const containerTableTwo = document.getElementById('table2')
    const containerTableThree = document.getElementById('table3')

    showTableOne(dataDos.events,containerTableOne)
    showTables(dateCardUncoming,containerTableTwo)
    showTables(dateCardPast,containerTableThree)
    
}catch(error){
    console.log('Estoy en el catch:' + error.message)
} 
}
tableStats()


//!Primer Table

function showTableOne(array, container){
    let mayorCapacity = array.reduce((eventoA, eventoB)=> {if(eventoA.capacity<eventoB.capacity)return eventoB 
        return eventoA})
    let highestAssistance = array.filter(event=>event.assistance).reduce((eventoA , eventoB) =>{
        if((eventoA.assistance/eventoA.capacity)>(eventoB.assistance/eventoB.capacity)) return eventoA
        return eventoB
     })  
    
     let lowestAssistance = array.filter(event=>event.assistance).reduce((eventoA , eventoB) =>{
        if((eventoA.assistance/eventoA.capacity)<(eventoB.assistance/eventoB.capacity)) return eventoA
        return eventoB
     })

     let containerTr = document.createElement('tr')
     containerTr.innerHTML = ` <td><b>${highestAssistance.name}:</b> ${highestAssistance.assistance/highestAssistance.capacity*100}%</td>
                               <td><b>${lowestAssistance.name}:</b> ${lowestAssistance.assistance/lowestAssistance.capacity*100}%</td>
                               <td><b>${mayorCapacity.name}:</b> ${mayorCapacity.capacity}</td>`
     container.appendChild(containerTr)
}



function showTables (array,container){

    let allCategorys = [...new Set(array.map(evento=> evento.category))]
    console.log(allCategorys)
   
    for (category of allCategorys){
        
        let eventPorCategory =array.filter(evento=> evento.category == category)
        let attendanceEvents=eventPorCategory.reduce((total,element)=>element.assistance!=undefined? total+=element.assistance/element.capacity:total+=element.estimate/element.capacity,0)
        let attendanceCategory = (attendanceEvents*100/eventPorCategory.length).toFixed(2)   
        let revenueEvents=eventPorCategory.reduce((total,element)=>element.assistance!=undefined? total+=element.assistance*element.price:total+=element.estimate*element.price,0)
        let all = {name:category, attendance:attendanceCategory, revenue: revenueEvents } 
        let containerTr = document.createElement('tr')
            containerTr.innerHTML = ` <td><b>${all.name}</b></td>
                                 <td>$${all.revenue}</td>
                                 <td>${all.attendance}%</td>`
        container.appendChild(containerTr)   
    }   
}

