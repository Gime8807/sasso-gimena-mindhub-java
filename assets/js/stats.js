let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function tableStats(){
  try{
    let response = await fetch(urlApi)
    let dataDos = await response.json()

    const newDate = Date.parse(dataDos.currentDate);
    console.log(newDate)

    let dateCardUncoming= dataDos.events.filter(evento=>Date.parse(evento.date)>newDate); 
    let dateCardPast = dataDos.events.filter(evento=>Date.parse(evento.date)<newDate);

    const containerTableOne = document.getElementById('table1')
    const containerTableTwo = document.getElementById('table2')
    const containerTableThree = document.getElementById('table3')

    showTableOne(dataDos.events,containerTableOne)
    showTableTwo(dateCardUncoming,containerTableTwo)
    showTableThree(dateCardPast,containerTableThree)
    
}catch(error){
    console.log('Estoy en el catch:' + error.message)
} 
}
tableStats()


//!Evento de Mayor Capacidad

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
     containerTr.innerHTML = ` <td>${highestAssistance.name}: ${highestAssistance.assistance/highestAssistance.capacity*100}%</td>
                               <td>${lowestAssistance.name}: ${lowestAssistance.assistance/lowestAssistance.capacity*100}%</td>
                               <td>${mayorCapacity.name}: ${mayorCapacity.capacity}</td>`
     container.appendChild(containerTr)
}



function showTableTwo (array,container){

    let allCategorys = [...new Set(array.map(evento=> evento.category))]
    console.log(allCategorys)
   
    for (category of allCategorys){
        

        let eventPorCategory =array.filter(evento=> evento.category == category)
         //console.log(eventPorCategory)
   
       let attendanceEvents=eventPorCategory.reduce((total,element)=>element.assistance!=undefined? total+=element.assistance/element.capacity:total+=element.estimate/element.capacity,0)
    
         let attendanceCategory = (attendanceEvents*100/eventPorCategory.length).toFixed(2)   
            //console.log(attendanceCategory)

       let revenueEvents=eventPorCategory.reduce((total,element)=>element.assistance!=undefined? total+=element.assistance*element.price:total+=element.estimate*element.price,0)

       //console.log(revenueEvents)
       
       let all = {name:category, attendance:attendanceCategory, revenue: revenueEvents } 

       let containerTr = document.createElement('tr')
       containerTr.innerHTML = ` <td>${all.name}</td>
                                 <td>$${all.revenue}</td>
                                 <td>${all.attendance}%</td>`
       container.appendChild(containerTr)
       
    }   
}

function showTableThree (array,container){

    let allCategorys = [...new Set(data.events.map(evento=> evento.category))]
    console.log(allCategorys)
   
    for (category of allCategorys){
       
        let eventPorCategory =array.filter(evento=> evento.category == category)
         //console.log(eventPorCategory)
   
       let attendanceEvents=eventPorCategory.reduce((total,element)=>element.assistance!=undefined? total+=element.assistance/element.capacity:total+=element.estimate/element.capacity,0)
    
         let attendanceCategory = (attendanceEvents*100/eventPorCategory.length).toFixed(2)   
            //console.log(attendanceCategory)

       let revenueEvents=eventPorCategory.reduce((total,element)=>element.assistance!=undefined? total+=element.assistance*element.price:total+=element.estimate*element.price,0)

       //console.log(revenueEvents)
       
       let all = { name:category, attendance:attendanceCategory, revenue: revenueEvents} 
       
       let containerTr = document.createElement('tr')
       containerTr.innerHTML = ` <td>${all.name}</td>
                                 <td>$${all.revenue}</td>
                                 <td>${all.attendance}%</td>`
       container.appendChild(containerTr)
       
    }   
}