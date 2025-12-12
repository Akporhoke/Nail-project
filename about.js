const exploreElements=document.getElementById('explorer')

const exploreDisplaybtn=document.getElementById('explore-btn')

const doubleTap=document.getElementById('appointment-span')

console.log(doubleTap)

const appointmentLink=()=>{
    window.location.href ='nail-appointment.html'
}
doubleTap.addEventListener('dblclick',appointmentLink)
console.log(exploreElements)

const displayMenu = event => {
    event.preventDefault()
exploreElements.classList.toggle('explorer-on');
    
}

exploreDisplaybtn.addEventListener('click',displayMenu)

