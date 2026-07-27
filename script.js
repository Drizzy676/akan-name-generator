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

//GENERATE AKAN NAME//

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const birthdate = document.getElementById("birthdate").value;
    const gender = document.getElementById("gender").value;

    // Validation

    if (birthdate === "") {
        result.classList.remove("show");
        result.style.color = "red";
        result.innerHTML = "❌ Please select your birth date.";
        return;
    }

    if (gender === "") {
        result.classList.remove("show");
        result.style.color = "red";
        result.innerHTML = "❌ Please select your gender.";
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

    result.classList.remove("show");

    result.style.color = "#006B3F";

    result.innerHTML = `
        <h3>🎉 Congratulations!</h3>

        <p>
            You were born on
            <strong>${days[dayNumber]}</strong>.
        </p>

        <p>
            Birth Date:
            <strong>${formattedDate}</strong>
        </p>

        <p>Your Akan Name is</p>

        <h2>${akanName}</h2>
    `;

    // Fade In Animation

    setTimeout(() => {
        result.classList.add("show");
    }, 100);

    // Play Celebration Sound

    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {
            // Ignore autoplay restrictions
        });
    }

    // Confetti Animation

    if (typeof confetti === "function") {

        const duration = 3000;
        const end = Date.now() + duration;

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

});

//RESET BUTTON//

resetBtn.addEventListener("click", function () {

    form.reset();

    result.innerHTML = "";

    result.classList.remove("show");

});

//PRESS ENTER TO SUBMIT//

document.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        form.requestSubmit();
    }

});