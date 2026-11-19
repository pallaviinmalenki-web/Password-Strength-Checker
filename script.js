
function checkPassword() {

    const password = document.getElementById("password").value;

    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    let score = 0;
    let suggestions = [];

    for (let key in checks) {

        const element = document.getElementById(key);

        if (checks[key]) {
            element.classList.add("valid");
            element.innerHTML = "✓ " +
                element.innerHTML.substring(2);
            score++;
        } else {
            element.classList.remove("valid");

            let names = {
                length: "At least 8 characters",
                uppercase: "One uppercase letter",
                lowercase: "One lowercase letter",
                number: "One number",
                special: "One special character"
            };

            element.innerHTML = "✗ " + names[key];

            suggestions.push("Add " + names[key]);
        }
    }

    const bar = document.getElementById("strengthBar");
    const text = document.getElementById("strengthText");

    if (password.length === 0) {
        text.innerHTML = "Not Checked";
        bar.style.width = "0%";
        document.getElementById("suggestions").innerHTML = "";
        return;
    }

    let strength = "";
    let color = "";
    
    if (password.length < 8 || score <= 2) {
        strength = "Weak";
        color = "#e53935";
    } else if (score <= 4) {
        strength = "Medium";
        color = "#f5a623";
    } else {
        strength = "Strong";
        color = "#16a05d";
    }

    text.innerHTML = strength;
    text.style.color = color;
    bar.style.width = (score / 5 * 100) + "%";
    bar.style.background = color;

    document.getElementById("suggestions").innerHTML =
        suggestions.length
        ? "Suggestions:<br>" + suggestions.join("<br>")
        : "Excellent! All basic requirements are satisfied.";
}

function togglePassword() {

    const password = document.getElementById("password");
    const button = document.getElementById("toggleBtn");

    if (password.type === "password") {
        password.type = "text";
        button.innerHTML = "Hide";
    } else {
        password.type = "password";
        button.innerHTML = "Show";
    }
}
