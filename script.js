// ==========================================
// 1. DOM SELECTORS
// ==========================================

// Containers
const signUpCard = document.getElementById("signup-card");
const successCard = document.getElementById("success-card");

// Form
const form = signUpCard.querySelector("#newsletter-form");

// Error-msg
const errorMsg = form.querySelector("#error-msg");

// input-email
const email = form.querySelector("#email")

// subscribe submit button
const submitBtn = form.querySelector("#submit-btn");

// submitted-email
const submittedEmailSpan = document.getElementById("submitted-email");

// dismiss-btn
const dismissBtn = successCard.querySelector("#dismiss-btn");

// ==========================================
// 2. FORM SUBMISSION EVENT
// ==========================================

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents the default browser reload

    const emailValue = email.value.trim()
    console.log(`Form submitted. Email value: ${emailValue}`);

    if (!email.validity.valid) {
        errorMsg.style.display = "block";
        errorMsg.classList.add("signup-form__error--novalid")
        email.classList.add("signup-form__input--error");
        email.setAttribute("aria-invalid", "true");

    } else {
        errorMsg.style.display = "none";
        errorMsg.classList.remove("signup-form__error--novalid");
        email.classList.remove("signup-form__input--error");
        email.removeAttribute("aria-invalid")

        submittedEmailSpan.textContent = emailValue;
        signUpCard.classList.add("hidden");
        successCard.classList.remove("hidden");


        signUpCard.setAttribute("aria-hidden", "true")
        successCard.setAttribute("aria-hidden", "false")
    }
})

// ==========================================
// 3. DISMISS CARD EVENT
// ==========================================

dismissBtn.addEventListener("click", () => {

    signUpCard.classList.remove("hidden");
    successCard.classList.add("hidden");

    signUpCard.setAttribute("aria-hidden", "false")
    successCard.setAttribute("aria-hidden", "true")

    form.reset();

})