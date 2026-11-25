
/* User Signup */
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("signupName").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.find(function(user) {
        return user.email === email;
    });

    if (name.length < 3) {
        alert("Name must contain at least 3 characters");
    } else if (userExists) {
        alert("Email already registered!");
    } else {
        let newUser = {
            name: name,
            email: email,
            password: password,
            bestScore: 0,
            quizCount: 0
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully!");
        document.getElementById("signupForm").reset();
    }
});

/* User Login */
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let currentUser = users.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        showDashboard(currentUser);
        document.getElementById("loginForm").reset();
    } else {
        alert("Invalid email or password!");
    }
});

/* Dashboard */
function showDashboard(user) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "block";
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("resultSection").style.display = "none";

    document.getElementById("welcomeText").innerHTML = "Welcome, " + user.name;
    document.getElementById("bestScore").innerHTML = user.bestScore;
    document.getElementById("quizCount").innerHTML = user.quizCount;
}

/* Automatic Login */
window.addEventListener("DOMContentLoaded", function() {
    let savedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (savedUser) {
        showDashboard(savedUser);
    }
});

/* Logout */
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("currentUser");

    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
});

/* Dark Mode */
document.getElementById("darkModeBtn").addEventListener("click", function() {
    document.body.classList.toggle("dark");
});
