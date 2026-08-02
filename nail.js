

let logo = document.querySelector('.logo');
let header = document.querySelector('.logoSpace');
let icon = document.querySelector('.book-icon');
const overlay = document.getElementById("overlay");

const nextPage = document.getElementById('book-pedicure-btn')
const manicurePage =document.getElementById('book-manicure-btn')

const heroNav = document.getElementById ('hero-nav-wrapper')
console.log(heroNav)

console.log('book-pedicure-btn')

const saveAndGo = () => {
  localStorage.setItem('selectedItem', "product-2");
  window.location.href = "nail-appointment.html";
}
const saveAndGo1 = () => {
  localStorage.setItem('selectedItem', "product-1");
  window.location.href = "nail-appointment.html";
}




nextPage.addEventListener('click', saveAndGo);
manicurePage.addEventListener('click', saveAndGo1);


let isSticky = false;
const STICKY_DOWN = 1100;   // trigger sticky when scrolling down
const STICKY_UP = 1000;      // release sticky when scrolling up

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  
  if (scrolled > STICKY_DOWN && !isSticky) {
    logo.classList.add('sticky');
    header.classList.add('sticky-header');
    icon.classList.add('book-icon-sticky');
    heroNav.style.display = 'none';
    isSticky = true;
  } else if (scrolled < STICKY_UP && isSticky) {
    logo.classList.remove('sticky');
    header.classList.remove('sticky-header');
    icon.classList.remove('book-icon-sticky');
    heroNav.style.display = 'flex';
    isSticky = false;
  }
});
const menuDisplayBtnElement = document.getElementById("book-icon-btn")
const menuDisplayElement = document.getElementById("menu")




const displayMenu = event => {
    event.preventDefault()
        menuDisplayElement.classList.toggle("menuOn");
     overlay.classList.toggle("active");
     
     

}
 menuDisplayBtnElement.addEventListener("click", displayMenu);


 const submitButtonElement = document.getElementById("submit-btn")
const main = document.querySelector('main');

    const closeMenu=() => {
    // Always ensure the menu closes, not toggles
    menu.classList.remove("menuOn");
    overlay.classList.remove("active");
  }
  overlay.addEventListener("click", closeMenu);
  
  



