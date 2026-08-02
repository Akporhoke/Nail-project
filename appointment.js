// ======= DOM REFERENCES =======
const servicesContainer = document.getElementById("services-container")
const addServiceBtn = document.getElementById("add-service-btn")
const phoneNumberElement = document.getElementById("phoneNumber")
const phoneNumberElement2 = document.getElementById("phoneNumber2")
const nameElement = document.getElementById("name")
const emailElement = document.getElementById("email")
const dateElement = document.getElementById("date")
const timeElement = document.getElementById("time")
const noteElement = document.getElementById("notes")
const policyCheckbox = document.getElementById("policyCheckbox")
const submitButtonElement = document.getElementById("submit-btn")

const policyBtn = document.getElementById('policy-clicker');
const policyAlert = document.getElementById('pop-up');
const closeBtn = document.getElementById('close-btn');
const body = document.body;

let scrollPosition = 0;
let serviceCount = 1;

// ======= SERVICE OPTIONS MAPPING =======
const serviceOptions = {
    "Manicure": ["No polish", "Regular polish", "Gel polish"],
    "Pedicure": ["No polish", "Regular polish", "Gel polish"],
    "Nail Extensions": ["Acrylic extensions", "Gel extensions"],
    "Press-on Nails": [],
    "Custom Nail Art": []
};

function createServiceDropdown(serviceNum, selectedValue = "") {
    const select = document.createElement("select");
    select.className = "service-select";
    select.name = "service";
    
    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-Select Service-";
    select.appendChild(defaultOption);
    
    // Add service options
    Object.keys(serviceOptions).forEach(service => {
        const option = document.createElement("option");
        option.value = service;
        option.textContent = service;
        if (selectedValue === service) option.selected = true;
        select.appendChild(option);
    });
    
    return select;
}

function createSubOptionButtons(service, selectedValue = "") {
    const options = serviceOptions[service] || [];
    
    if (options.length === 0) {
        return null; // No sub-options for this service
    }
    
    const container = document.createElement("div");
    container.className = "suboption-container";
    
    const label = document.createElement("label");
    label.className = "suboption-label";
    label.textContent = service === "Nail Extensions" ? "Extension Type:" : "Polish Type:";
    container.appendChild(label);
    
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "suboption-options";
    
    options.forEach(option => {
        const radioWrapper = document.createElement("div");
        radioWrapper.className = "suboption-wrapper";
        
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `suboption-${Date.now()}`;
        input.value = option;
        input.className = "suboption-radio";
        if (selectedValue === option) input.checked = true;
        
        const labelEl = document.createElement("label");
        labelEl.className = "suboption-label-text";
        labelEl.textContent = option;
        
        radioWrapper.appendChild(input);
        radioWrapper.appendChild(labelEl);
        optionsDiv.appendChild(radioWrapper);
    });
    
    container.appendChild(optionsDiv);
    return container;
}

function addServiceDropdown(selectedService = "", selectedOption = "") {
    serviceCount++;
    
    const serviceDiv = document.createElement("div");
    serviceDiv.className = "service-section";
    
    const label = document.createElement("label");
    label.textContent = `Service ${serviceCount}`;
    label.className = "service-num-label";
    
    const select = createServiceDropdown(serviceCount, selectedService);
    
    // Event listener to update sub-options when service changes
    select.addEventListener("change", (e) => {
        const existingSuboptions = serviceDiv.querySelector(".suboption-container");
        if (existingSuboptions) existingSuboptions.remove();
        
        const newSuboptions = createSubOptionButtons(e.target.value);
        if (newSuboptions) {
            serviceDiv.insertBefore(newSuboptions, removeBtn);
        }
    });
    
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-service";
    removeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        serviceDiv.remove();
        serviceCount--;
    });
    
    serviceDiv.appendChild(label);
    serviceDiv.appendChild(select);
    
    // Add sub-options if service has them
    const subOptions = createSubOptionButtons(selectedService, selectedOption);
    if (subOptions) {
        serviceDiv.appendChild(subOptions);
    }
    
    serviceDiv.appendChild(removeBtn);
    servicesContainer.appendChild(serviceDiv);
}

// ======= LOAD SAVED SERVICES =======
const savedServices = localStorage.getItem("selectedServices");
if (savedServices) {
    try {
        const services = JSON.parse(savedServices);
        if (Array.isArray(services) && services.length > 0) {
            const isNewFormat = services[0] && typeof services[0] === 'object' && 'service' in services[0];
            
            if (isNewFormat) {
                const firstService = services[0];
                const firstSelect = servicesContainer.querySelector(".service-select");
                firstSelect.value = firstService.service;
                
                // Add first service's sub-options
                const firstSuboptions = createSubOptionButtons(firstService.service, firstService.option);
                if (firstSuboptions) {
                    servicesContainer.querySelector(".service-section").appendChild(firstSuboptions);
                }
                
                // Add remaining services
                for (let i = 1; i < services.length; i++) {
                    addServiceDropdown(services[i].service, services[i].option);
                }
            }
        }
    } catch (e) {
        console.log("Could not load saved services");
    }
}

// ======= INITIALIZE FIRST SERVICE DROPDOWN WITH CHANGE LISTENER =======
const firstServiceSelect = servicesContainer.querySelector(".service-select");
const firstServiceSection = servicesContainer.querySelector(".service-section");

if (firstServiceSelect) {
    firstServiceSelect.addEventListener("change", (e) => {
        // Remove existing sub-options
        const existingSuboptions = firstServiceSection.querySelector(".suboption-container");
        if (existingSuboptions) existingSuboptions.remove();
        
        // Add new sub-options if service has them
        const newSuboptions = createSubOptionButtons(e.target.value);
        if (newSuboptions) {
            firstServiceSection.appendChild(newSuboptions);
        }
    });
}

// ======= ADD SERVICE BUTTON =======
addServiceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addServiceDropdown();
});

// ======= DISABLE PAST DATES =======
const today = new Date();
today.setDate(today.getDate() + 2); // Add 1 day
const minDate = today.toISOString().split('T')[0];
dateElement.min = minDate;

// ======= RESTRICT TIME PICKER TO BUSINESS HOURS =======
timeElement.min = "08:00";
timeElement.max = "16:00";

// ======= VALIDATE TIME IS WITHIN BUSINESS HOURS =======
function isValidTime(time) {
    if (!time) return false;
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const minMinutes = 8 * 60;
    const maxMinutes = 16 * 60;
    return totalMinutes >= minMinutes && totalMinutes <= maxMinutes;
}

// ======= FORM SUBMISSION =======
const submitForm = event => {
    event.preventDefault()
    
    // Get selected services with sub-options
    const serviceSections = servicesContainer.querySelectorAll(".service-section");
    const selectedServices = [];
    
    serviceSections.forEach(section => {
        const serviceSelect = section.querySelector(".service-select").value;
        const suboptionRadio = section.querySelector("input[type='radio']:checked");
        const suboption = suboptionRadio ? suboptionRadio.value : "";
        
        if (serviceSelect) {
            selectedServices.push({
                service: serviceSelect,
                option: suboption || null
            });
        }
    });
    
    const phoneElement = phoneNumberElement.value.trim()
    const phoneElement2 = phoneNumberElement2.value.trim()
    const FullName = nameElement.value.trim()
    const Email = emailElement.value.trim()
    const date = dateElement.value
    const time = timeElement.value
    const note = noteElement.value.trim()
    const policyAgreed = policyCheckbox.checked

    if (selectedServices.length === 0 || phoneElement === "" || FullName === "" || Email === "" || date === "" || time === "") {
        return alert("-ENSURE ALL DETAILS OF YOUR APPOINTMENT ARE CORRECTLY FILLED OUT-")
    }

    // Check if required sub-options are selected
    const hasEmptySuboptions = selectedServices.some(s => {
        const hasSuboptions = serviceOptions[s.service].length > 0;
        return hasSuboptions && !s.option;
    });

    
    const phoneLength = phoneElement.length
    if (phoneLength < 11 || phoneLength > 12) {
        return alert('Check phone number')
    }

    if (phoneElement2 !== "") {
        const phoneLength2 = phoneElement2.length
        if (phoneLength2 < 11 || phoneLength2 > 12) {
            return alert('Check phone number 2')
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
        return alert("Please enter a valid email address (e.g., name@example.com).")
    }

    const selectedDate = new Date(date);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (selectedDate < todayDate) {
        return alert("Please select today or a future date for your appointment.")
    }

    if (!isValidTime(time)) {
        return alert("Please select a time between 8:00 AM and 6:00 PM.")
    }

    if (!policyAgreed) {
        return alert("Please agree to our booking policies before submitting.")
    }

    alert("YOU'LL BE CONTACTED IN 24HRS TO DISCUSS THE DETAILS OF YOUR APPOINTMENT")

    // Save services to localStorage
    localStorage.setItem("selectedServices", JSON.stringify(selectedServices));

    console.log({
        selectedServices,
        phoneElement,
        phoneElement2,
        FullName,
        Email,
        date,
        time,
        note,
        policyAgreed
    });
};

submitButtonElement.addEventListener("click", submitForm);

// ======= POLICY POPUP =======
const showPolicySummary = () => {
    scrollPosition = window.scrollY;
    body.style.top = `-${scrollPosition}px`;
    body.classList.add('no-scroll');
    policyAlert.style.display = 'block';
};

const closePolicySummary = () => {
    policyAlert.style.display = 'none';
    body.classList.remove('no-scroll');
    body.style.top = '';
    window.scrollTo(0, scrollPosition);
};

policyBtn.addEventListener('click', showPolicySummary);
closeBtn.addEventListener('click', closePolicySummary);
