

let logo = document.querySelector('.logo');
let header = document.querySelector('.logoSpace');
let icon = document.querySelector('.book-icon');
const overlay = document.getElementById("overlay");

window.addEventListener('scroll', () => {
  if (window.scrollY > 1000) { // threshold
    logo.classList.add('sticky');
    header.classList.add('sticky-header');
    icon.classList.add('book-icon-sticky')
  } else {
    logo.classList.remove('sticky');
    header.classList.remove('sticky-header');
        icon.classList.remove('book-icon-sticky');
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


    const closeMenu=() => {
    // Always ensure the menu closes, not toggles
    menu.classList.remove("menuOn");
    overlay.classList.remove("active");
  }
  overlay.addEventListener("click", closeMenu);
  main.addEventListener("click", closeMenu);
  
