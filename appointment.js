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
    "Manicure": {
        suboptions: [
            {
                label: "Polish Type",
                options: ["No polish", "Regular polish", "Gel polish"]
            },
            {
                label: "Design",
                options: ["Solid color only", "Yes, I have a design in mind"]
            }
        ]
    },
    "Pedicure": {
        suboptions: [
            {
                label: "Polish Type",
                options: ["No polish", "Regular polish", "Gel polish"]
            }
        ]
    },
    "Nail Extensions": {
        suboptions: [
            {
                label: "Extension Type",
                options: ["Acrylic extensions", "Gel extensions"]
            },
            {
                label: "Length",
                options: ["Short", "Medium", "Long", "Extra-long"]
            },
            {
                label: "Design",
                options: ["Solid color only", "Yes, I have a design in mind"]
            }
        ]
    },
    "Press-on Nails": {
        suboptions: []
    },
    "Custom Nail Art": {
        suboptions: []
    }
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

function createSubOptionButtons(service, selectedValues = {}) {
    const serviceConfig = serviceOptions[service];
    const suboptions = serviceConfig?.suboptions || [];
    
    if (suboptions.length === 0) {
        return null;
    }
    
    const container = document.createElement("div");
    container.className = "suboption-container";
    
    suboptions.forEach(suboptionGroup => {
        const groupLabel = document.createElement("label");
        groupLabel.className = "suboption-label";
        groupLabel.textContent = suboptionGroup.label;
        container.appendChild(groupLabel);
        
        const optionsDiv = document.createElement("div");
        optionsDiv.className = "suboption-options";
        
        suboptionGroup.options.forEach(option => {
            const radioWrapper = document.createElement("div");
            radioWrapper.className = "suboption-wrapper";
            
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `suboption-${Date.now()}-${suboptionGroup.label}`;
            input.value = option;
            input.className = "suboption-radio";
            
            if (selectedValues[suboptionGroup.label] === option) {
                input.checked = true;
            }
            
            const labelEl = document.createElement("label");
            labelEl.className = "suboption-label-text";
            labelEl.textContent = option;
            
            radioWrapper.appendChild(input);
            radioWrapper.appendChild(labelEl);
            optionsDiv.appendChild(radioWrapper);
        });
        
        container.appendChild(optionsDiv);
    });
    
    return container;
}

function addServiceDropdown(selectedService = "", selectedDetails = {}) {
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
    const subOptions = createSubOptionButtons(selectedService, selectedDetails);
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
            const firstService = services[0];
            const firstSelect = servicesContainer.querySelector(".service-select");
            firstSelect.value = firstService.service;
            
            // Add first service's sub-options
            const firstSuboptions = createSubOptionButtons(firstService.service, firstService.details || {});
            if (firstSuboptions) {
                servicesContainer.querySelector(".service-section").appendChild(firstSuboptions);
            }
            
            // Add remaining services
            for (let i = 1; i < services.length; i++) {
                addServiceDropdown(services[i].service, services[i].details || {});
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
    
    // Get selected services with all sub-options
    const serviceSections = servicesContainer.querySelectorAll(".service-section");
    const selectedServices = [];
    
    serviceSections.forEach(section => {
        const serviceSelect = section.querySelector(".service-select").value;
        const selectedDetails = {};
        
        // Get all selected radio buttons in this service section
        const radios = section.querySelectorAll("input[type='radio']:checked");
        radios.forEach(radio => {
            // Extract the label name from the radio button name
            const nameParts = radio.name.split('-');
            const labelName = nameParts.slice(2).join('-');
            selectedDetails[labelName] = radio.value;
        });
        
        if (serviceSelect) {
            selectedServices.push({
                service: serviceSelect,
                details: selectedDetails
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
        const serviceConfig = serviceOptions[s.service];
        const suboptions = serviceConfig?.suboptions || [];
        return suboptions.length > 0 && Object.keys(s.details).length === 0;
    });

    if (hasEmptySuboptions) {
        return alert("Please complete all service details (polish type, length, design, etc.)")
    }
    
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

    // ======= SAVE APPOINTMENT RECORD TO HISTORY =======
    const appointmentRecord = {
        id: Date.now(),
        fullName: FullName,
        email: Email,
        phone1: phoneElement,
        phone2: phoneElement2,
        services: selectedServices,
        date: date,
        time: time,
        notes: note,
        bookedAt: new Date().toLocaleString(),
        status: "Pending"
    };

    // Get existing history or create new array
    let appointmentHistory = JSON.parse(localStorage.getItem("appointmentHistory")) || [];

    // Add new appointment
    appointmentHistory.push(appointmentRecord);

    // Save back to localStorage (limit to last 50 bookings to avoid bloat)
    if (appointmentHistory.length > 50) {
        appointmentHistory = appointmentHistory.slice(-50);
    }
    localStorage.setItem("appointmentHistory", JSON.stringify(appointmentHistory));

    // Reload to show new appointment
    setTimeout(() => {
        location.reload();
    }, 1500);

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
        policyAgreed,
        appointmentRecord
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

// ======= APPOINTMENT HISTORY =======
function displayLatestAppointment() {
    const appointmentHistory = JSON.parse(localStorage.getItem("appointmentHistory")) || [];
    
    if (appointmentHistory.length === 0) {
        return; // No appointments to display
    }
    
    const latest = appointmentHistory[appointmentHistory.length - 1];
    
    // Check if appointment date has passed - auto-delete silently
    const appointmentDate = new Date(latest.date);
    appointmentDate.setHours(23, 59, 59, 999); // End of that day
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    if (appointmentDate < today) {
        // Date has passed - auto-delete without asking
        appointmentHistory.pop();
        localStorage.setItem("appointmentHistory", JSON.stringify(appointmentHistory));
        
        // Recursively check if there are older appointments to display
        if (appointmentHistory.length > 0) {
            displayLatestAppointment();
        }
        return;
    }
    
    const appointmentSection = document.getElementById("latest-appointment-section");
    const header = document.getElementById("latest-appointment-header");
    const expandedContent = document.getElementById("latest-appointment-expanded");
    
    // Format date for display
    const dateString = appointmentDate.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
    
    // Update preview
    document.getElementById("latest-appointment-preview-text").textContent = 
        `${dateString} • ${latest.time}`;
    
    // Update full details
    document.getElementById("detail-name").textContent = latest.fullName;
    document.getElementById("detail-email").textContent = latest.email;
    document.getElementById("detail-phone").textContent = latest.phone1 + 
        (latest.phone2 ? ` / ${latest.phone2}` : "");
    document.getElementById("detail-date").textContent = dateString;
    document.getElementById("detail-time").textContent = latest.time;
    document.getElementById("detail-notes").textContent = latest.notes || "None";
    document.getElementById("detail-booked-at").textContent = latest.bookedAt;
    
    // Format services display
    const servicesHtml = latest.services.map(s => {
        let details = `<div class="service-item">• ${s.service}`;
        if (Object.keys(s.details).length > 0) {
            const detailsList = Object.entries(s.details)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ");
            details += ` (${detailsList})`;
        }
        details += "</div>";
        return details;
    }).join("");
    
    document.getElementById("detail-services").innerHTML = servicesHtml;
    
    // Update status badge
    const statusBadge = document.getElementById("detail-status");
    statusBadge.textContent = latest.status;
    statusBadge.className = `status-badge ${latest.status.toLowerCase()}`;
    
    // Show section and add click handler
    appointmentSection.style.display = "block";
    header.addEventListener("click", toggleAppointmentExpand);
}

function toggleAppointmentExpand() {
    const section = document.getElementById("latest-appointment-section");
    const expandedContent = document.getElementById("latest-appointment-expanded");
    
    section.classList.toggle("expanded");
    
    if (expandedContent.style.display === "none") {
        expandedContent.style.display = "flex";
    } else {
        expandedContent.style.display = "none";
    }
}

function deleteLatestAppointment() {
    if (confirm("Are you sure you want to delete this appointment?")) {
        let appointmentHistory = JSON.parse(localStorage.getItem("appointmentHistory")) || [];
        
        if (appointmentHistory.length > 0) {
            appointmentHistory.pop(); // Remove the last appointment
            localStorage.setItem("appointmentHistory", JSON.stringify(appointmentHistory));
            
            // Hide the section
            const appointmentSection = document.getElementById("latest-appointment-section");
            appointmentSection.style.display = "none";
        }
    }
}

// Attach delete button event listener
const deleteBtn = document.getElementById("delete-appointment-btn");
if (deleteBtn) {
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering expand when clicking delete
        deleteLatestAppointment();
    });
}

// Load and display latest appointment on page load
displayLatestAppointment();
