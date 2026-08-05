// ======= APPOINTMENT REMINDER TOAST ON HOME PAGE =======
function checkAndNotifyAppointmentDay() {
    const appointmentHistory = JSON.parse(localStorage.getItem("appointmentHistory")) || [];
    
    if (appointmentHistory.length === 0) return;
    
    const latest = appointmentHistory[appointmentHistory.length - 1];
    const appointmentDate = new Date(latest.date);
    appointmentDate.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if today is the appointment day
    if (appointmentDate.getTime() === today.getTime()) {
        showAppointmentToast(latest);
    }
}

function showAppointmentToast(appointment) {
    const toast = document.getElementById("appointment-toast");
    const toastTitle = document.getElementById("toast-title");
    const toastMessage = document.getElementById("toast-message");
    const toastClose = document.getElementById("toast-close");
    
    toastTitle.textContent = `Appointment Today at ${appointment.time}!`;
    toastMessage.textContent = `${appointment.services[0].service} • ${appointment.fullName}`;
    
    // Show toast
    toast.style.display = "block";
    toast.classList.remove("hide");
    
    // Close button handler
    toastClose.addEventListener("click", () => {
        toast.classList.add("hide");
        setTimeout(() => {
            toast.style.display = "none";
        }, 300);
    });
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
        if (toast.style.display === "block") {
            toast.classList.add("hide");
            setTimeout(() => {
                toast.style.display = "none";
            }, 300);
        }
    }, 8000);
}

// Check for appointment notifications when page loads
checkAndNotifyAppointmentDay();

// ======= EXISTING HOME PAGE FUNCTIONALITY =======
let logo = document.querySelector('.logo');
let header = document.querySelector('.logoSpace');
let icon = document.querySelector('.book-icon');
const overlay = document.getElementById("overlay");

const nextPage = document.getElementById('book-pedicure-btn')
const manicurePage = document.getElementById('book-manicure-btn')

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

const closeMenu = () => {
    // Always ensure the menu closes, not toggles
    menu.classList.remove("menuOn");
    overlay.classList.remove("active");
}

overlay.addEventListener("click", closeMenu);
