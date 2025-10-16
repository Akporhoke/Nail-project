

let logo = document.querySelector('.logo');
let header = document.querySelector('.logoSpace');
let icon = document.querySelector('.book-icon');


window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { // threshold
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


}
 menuDisplayBtnElement.addEventListener("click", displayMenu);


 const submitButtonElement = document.getElementById("submit-btn")

