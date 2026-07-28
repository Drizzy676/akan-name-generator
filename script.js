//AKAN NAMES//
const maleNames = [
    "Kwasi",    // Sunday
    "Kwadwo",   // Monday
    "Kwabena",  // Tuesday
    "Kwaku",    // Wednesday
    "Yaw",      // Thursday
    "Kofi",     // Friday
    "Kwame"     // Saturday
];

const femaleNames = [
    "Akosua",   // Sunday
    "Adwoa",    // Monday
    "Abenaa",   // Tuesday
    "Akua",     // Wednesday
    "Yaa",      // Thursday
    "Afua",     // Friday
    "Ama"       // Saturday
];

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

//DOM ELEMENTS//

const form = document.getElementById("akanForm");
const result = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");
const sound = document.getElementById("celebrationSound");
const loader = document.getElementById("loader");

//GENERATE AKAN NAME//

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const birthdate = document.getElementById("birthdate").value;
    const gender = document.getElementById("gender").value;

    // Validation

    if (birthdate === "") {
        result.classList.remove("show");
        result.style.color = "red";
        result.innerHTML = "Please select your birth date.";
        return;
    }

    if (gender === "") {
        result.classList.remove("show");
        result.style.color = "red";
        result.innerHTML = "Please select your gender.";
        return;
    }

    // Calculate weekday

    const date = new Date(birthdate);
    const dayNumber = date.getDay();

    let akanName;

    if (gender === "male") {
        akanName = maleNames[dayNumber];
    } else {
        akanName = femaleNames[dayNumber];
    }

    // Format date nicely

    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // Display result

// Hide old result
result.classList.remove("show");
result.innerHTML = "";

// Show loader
loader.classList.remove("hidden");

// Wait 2 seconds
setTimeout(() => {

    loader.classList.add("hidden");

    result.innerHTML = `
        <h3>Congratulations!</h3>

        <p>You were born on
        <strong>${days[dayNumber]}</strong>.</p>

        <p>
        Birth Date:
        <strong>${formattedDate}</strong>
        </p>

        <p>Your Akan Name is</p>

        <h2>${akanName}</h2>
    `;

    result.classList.add("show");

    // Play sound
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }

    // Confetti
    if (typeof confetti === "function") {

        const end = Date.now() + 3000;

        (function frame() {

            confetti({
                particleCount: 4,
                angle: 60,
                spread: 70,
                origin: { x: 0 }
            });

            confetti({
                particleCount: 4,
                angle: 120,
                spread: 70,
                origin: { x: 1 }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }

        })();

    }

}, 2000)});

resetBtn.addEventListener("click", function () {

    form.reset();

    result.innerHTML = "";

    result.classList.remove("show");

    loader.classList.add("hidden");

});