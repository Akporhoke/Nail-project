const servicesElement=document.getElementById("services")
const phoneNumberElement=document.getElementById("phoneNumber")
const phoneNumberElement2=document.getElementById("phoneNumber2")
const nameElement=document.getElementById("name")
const emailElement=document.getElementById("email")
const dateElement=document.getElementById("date")
const noteElement=document.getElementById("notes")


const submitButtonElement = document.getElementById("submit-btn")

const submitForm = event => {
    event.preventDefault()
    const serviceContentElement = servicesElement.value
    const phoneElement = phoneNumberElement.value
    const phoneElement2 = phoneNumberElement2.value
    const FullName=nameElement.value
    const Email=emailElement.value
    const date=dateElement.value
    const note=noteElement.value
    const phoneArr=[phoneElement.length]
    const phoneArr2=[phoneElement2.length]
    
    
    if(phoneArr<11 || phoneArr>12){
            return alert('Check phone number')
    }
    else if(phoneArr2<11 || phoneArr2>12){
            return alert('Check phone number')
    }
    
    else if (phoneArr2==="") {
            
    }
    else {}
    

    if ( serviceContentElement==="-Select a Service-"|| phoneElement===""  || phoneElement2===""|| FullName==="" || Email==="" || date==="" ) {
            alert("-ENSURE ALL DETAILS OF YOUR APPOINTMENT ARE CORRECTLY FILLED OUT-")   
    }
    
    else{
        alert("YOU'LL BE CONTACTED IN 24HRS TO DISCUSS THE DETAILS OF YOUR APPOINTMENT")
    }
    
    

};

submitButtonElement.addEventListener("click", submitForm);
