const exploreElements=document.getElementById('explorer')

const exploreDisplaybtn=document.getElementById('explore-btn')

console.log(exploreElements)

const displayMenu = event => {
    event.preventDefault()
exploreElements.classList.toggle('explorer-on');
    
}

exploreDisplaybtn.addEventListener('click',displayMenu)

