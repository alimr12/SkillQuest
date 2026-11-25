
/* SkillQuest - JavaScript Learning Project */

/* Week 1 - Variables, Arrays, Objects and Operators */

let questions = [
    {
        id: 1,
        category: "Variables",
        question: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "print", "define"],
        answer: "let"
    },
    {
        id: 2,
        category: "Data Types",
        question: "Which data type represents true or false?",
        options: ["String", "Number", "Boolean", "Array"],
        answer: "Boolean"
    },
    {
        id: 3,
        category: "Arrays",
        question: "Which method adds an item at the end?",
        options: ["pop()", "push()", "shift()", "slice()"],
        answer: "push()"
    },
    {
        id: 4,
        category: "Functions",
        question: "Which keyword returns a value?",
        options: ["break", "return", "continue", "if"],
        answer: "return"
    },
    {
        id: 5,
        category: "Conditions",
        question: "Which statement checks a condition?",
        options: ["if", "for", "while", "function"],
        answer: "if"
    },
    {
        id: 6,
        category: "Strings",
        question: "Which property gives the length of a string?",
        options: ["size", "count", "length", "index"],
        answer: "length"
    },
    {
        id: 7,
        category: "Objects",
        question: "How do you access an object property named age?",
        options: ["user-age", "user.age", "user:age", "user->age"],
        answer: "user.age"
    },
    {
        id: 8,
        category: "Loops",
        question: "Which loop runs while a condition is true?",
        options: ["if", "switch", "while", "return"],
        answer: "while"
    },
    {
        id: 9,
        category: "DOM",
        question: "Which method selects an element by its ID?",
        options: ["getElementById()", "getClass()", "getArray()", "selectId()"],
        answer: "getElementById()"
    },
    {
        id: 10,
        category: "Storage",
        question: "Which method saves data in localStorage?",
        options: ["getItem()", "removeItem()", "setItem()", "clearItem()"],
        answer: "setItem()"
    },
    {
        id: 11,
        category: "JavaScript",
        question: "Which operator checks value and data type?",
        options: ["==", "=", "===", "!="],
        answer: "==="
    },
    {
        id: 12,
        category: "DOM",
        question: "Which event happens when a button is clicked?",
        options: ["change", "click", "submit", "load"],
        answer: "click"
    },
    {
        id: 13,
        category: "Promises",
        question: "Which method handles a rejected Promise?",
        options: ["then()", "catch()", "map()", "filter()"],
        answer: "catch()"
    },
    {
        id: 14,
        category: "Async",
        question: "Which keyword is used with async functions?",
        options: ["await", "wait", "pause", "stop"],
        answer: "await"
    },
    {
        id: 15,
        category: "Timers",
        question: "Which function repeats code after an interval?",
        options: ["setTimeout()", "setInterval()", "clearTimeout()", "prompt()"],
        answer: "setInterval()"
    }
];

let currentQuestion = 0;
let score = 0;
let timer = 30;
let timerInterval;
let quizQuestions = [];
let selectedCategory = "All";
let currentUser = null;

/* Load Saved Questions */

let savedQuestions = JSON.parse(localStorage.getItem("questions"));

if (savedQuestions) {
    questions = savedQuestions;
}

/* Week 2 - Functions and Array Methods */

// Arrow Function
const saveQuestions = () => {
    localStorage.setItem("questions", JSON.stringify(questions));
};

// Get Question Categories
function getCategories() {
    let categories = [];

    questions.forEach(function(item) {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }
    });

    return categories;
}

// Search Questions Using String Methods
function searchQuestions(searchText) {
    searchText = searchText.trim().toLowerCase();

    return questions.filter(function(item) {
        return item.question.toLowerCase().includes(searchText) ||
               item.category.toLowerCase().includes(searchText);
    });
}

// Sort Questions
function sortQuestions() {
    return questions.slice().sort(function(a, b) {
        return a.category.localeCompare(b.category);
    });
}

// Question Statistics Using Reduce
function getQuestionCount() {
    return questions.reduce(function(total, item) {
        return total + 1;
    }, 0);
}

/* Week 3 - Signup and Login */

// Signup Event
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("signupName").value.trim();
    let email = document.getElementById("signupEmail").value.trim().toLowerCase();
    let password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.find(function(user) {
        return user.email === email;
    });

    if (name.length < 3) {
        alert("Name must contain at least 3 characters");
    } else if (password.length < 4) {
        alert("Password must contain at least 4 characters");
    } else if (userExists) {
        alert("Email already registered!");
    } else {
        let newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            bestScore: 0,
            quizCount: 0,
            history: []
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully!");

        document.getElementById("signupForm").reset();
    }
});

// Login Event
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim().toLowerCase();
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(function(item) {
        return item.email === email && item.password === password;
    });

    if (user) {
        currentUser = user;

        localStorage.setItem("currentUser", JSON.stringify(user));

        showDashboard();

        document.getElementById("loginForm").reset();
    } else {
        alert("Invalid email or password!");
    }
});

/* Display Dashboard */

function showDashboard() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "block";
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("resultSection").style.display = "none";

    document.getElementById("welcomeText").innerHTML =
        "Welcome, " + currentUser.name;

    document.getElementById("bestScore").innerHTML =
        currentUser.bestScore;

    document.getElementById("quizCount").innerHTML =
        currentUser.quizCount;

    showExtraButtons();
}

// Add Extra Buttons Dynamically
function showExtraButtons() {
    let dashboard = document.querySelector(".dashboard");

    if (!document.getElementById("addQuestionBtn")) {
        let addButton = document.createElement("button");

        addButton.id = "addQuestionBtn";
        addButton.textContent = "Add Question";

        dashboard.insertAdjacentElement("afterend", addButton);

        addButton.addEventListener("click", addQuestion);
    }

    if (!document.getElementById("searchQuestionBtn")) {
        let searchButton = document.createElement("button");

        searchButton.id = "searchQuestionBtn";
        searchButton.textContent = "Search Questions";

        dashboard.insertAdjacentElement("afterend", searchButton);

        searchButton.addEventListener("click", searchQuestionPrompt);
    }

    if (!document.getElementById("deleteQuestionBtn")) {
        let deleteButton = document.createElement("button");

        deleteButton.id = "deleteQuestionBtn";
        deleteButton.textContent = "Delete Question";

        dashboard.insertAdjacentElement("afterend", deleteButton);

        deleteButton.addEventListener("click", deleteQuestion);
    }

    if (!document.getElementById("historyBtn")) {
        let historyButton = document.createElement("button");

        historyButton.id = "historyBtn";
        historyButton.textContent = "Quiz History";

        dashboard.insertAdjacentElement("afterend", historyButton);

        historyButton.addEventListener("click", showHistory);
    }
}

/* Week 4 - Question Management */

// Add Questions Using prompt() and Number()
function addQuestion() {
    let questionText = prompt("Enter your question:");

    if (questionText === null || questionText.trim() === "") {
        alert("Question cannot be empty");
        return;
    }

    let category = prompt("Enter question category:");

    if (category === null || category.trim() === "") {
        alert("Category cannot be empty");
        return;
    }

    let option1 = prompt("Enter first option:");
    let option2 = prompt("Enter second option:");
    let option3 = prompt("Enter third option:");
    let option4 = prompt("Enter fourth option:");

    if ([option1, option2, option3, option4].some(function(option) {
        return option === null || option.trim() === "";
    })) {
        alert("All options are required");
        return;
    }

    let answerNumber = Number(prompt("Enter correct option number (1-4):"));

    if (answerNumber < 1 || answerNumber > 4 ||
        !Number.isInteger(answerNumber)) {
        alert("Please enter a number between 1 and 4");
        return;
    }

    let options = [option1, option2, option3, option4];

    let newQuestion = {
        id: Date.now(),
        category: category.trim(),
        question: questionText.trim(),
        options: options,
        answer: options[answerNumber - 1]
    };

    questions.push(newQuestion);

    saveQuestions();

    alert("Question added successfully!");
}

// Search Question
function searchQuestionPrompt() {
    let searchText = prompt("Enter a question or category to search:");

    if (searchText === null || searchText.trim() === "") {
        return;
    }

    let results = searchQuestions(searchText);

    if (results.length === 0) {
        alert("No questions found");
    } else {
        let resultText = "";

        results.forEach(function(item) {
            resultText += item.id + ". " + item.question + "\n";
        });

        alert(resultText);
    }
}

// Delete Question Using splice()
function deleteQuestion() {
    let questionId = Number(prompt("Enter question ID to delete:"));

    let index = questions.findIndex(function(item) {
        return item.id === questionId;
    });

    if (index === -1) {
        alert("Question not found");
    } else {
        questions.splice(index, 1);

        saveQuestions();

        alert("Question deleted successfully!");
    }
}

// Display Quiz History
function showHistory() {
    if (!currentUser.history || currentUser.history.length === 0) {
        alert("No quiz history available");
        return;
    }

    let historyText = "";

    currentUser.history.forEach(function(item) {
        historyText += "Score: " + item.score +
            " | Date: " + item.date + "\n";
    });

    alert(historyText);
}

/* Week 4 - Quiz Engine */

// Shuffle Array Using Fisher-Yates Loop
function shuffleArray(array) {
    let shuffled = array.slice();

    for (let i = shuffled.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));

        let temp = shuffled[i];

        shuffled[i] = shuffled[randomIndex];
        shuffled[randomIndex] = temp;
    }

    return shuffled;
}

// Callback Example
function loadQuestions(callback) {
    setTimeout(function() {
        callback(questions);
    }, 500);
}

// Start Quiz
document.getElementById("startQuizBtn").addEventListener("click", async function() {
    try {
        document.getElementById("startQuizBtn").disabled = true;

        await loadQuizData();

        let categoryList = getCategories();

        let categoryChoice = prompt(
            "Choose a category:\nType All or a category name:\n" +
            categoryList.join(", ")
        );

        if (categoryChoice === null) {
            document.getElementById("startQuizBtn").disabled = false;
            return;
        }

        selectedCategory = categoryChoice.trim();

        if (selectedCategory.toLowerCase() === "all") {
            quizQuestions = questions.slice();
        } else {
            quizQuestions = questions.filter(function(item) {
                return item.category.toLowerCase() === selectedCategory.toLowerCase();
            });
        }

        if (quizQuestions.length === 0) {
            alert("No questions found in this category");
            document.getElementById("startQuizBtn").disabled = false;
            return;
        }

        quizQuestions = shuffleArray(quizQuestions);

        currentQuestion = 0;
        score = 0;

        document.getElementById("dashboardSection").style.display = "none";
        document.getElementById("quizSection").style.display = "block";
        document.getElementById("resultSection").style.display = "none";

        document.getElementById("startQuizBtn").disabled = false;

        showQuestion();
        startTimer();

    } catch (error) {
        console.log("Quiz Error:", error);
        alert("Something went wrong while loading the quiz");
        document.getElementById("startQuizBtn").disabled = false;
    }
});

// Display Questions
function showQuestion() {
    let item = quizQuestions[currentQuestion];

    document.getElementById("questionNumber").innerHTML =
        "Question " + (currentQuestion + 1) + " of " + quizQuestions.length;

    document.getElementById("questionText").innerHTML = item.question;

    document.getElementById("quizScore").innerHTML = "Score: " + score;

    let answerOptions = document.getElementById("answerOptions");

    answerOptions.innerHTML = "";

    let shuffledOptions = shuffleArray(item.options);

    shuffledOptions.forEach(function(option) {
        let button = document.createElement("button");

        button.textContent = option;

        button.setAttribute("data-answer", option);

        answerOptions.insertAdjacentElement("beforeend", button);

        button.addEventListener("click", function() {
            checkAnswer(button.getAttribute("data-answer"));
        });
    });

    // Example of insertAdjacentHTML()
    document.getElementById("questionText").insertAdjacentHTML(
        "afterend",
        ""
    );
}

// Check Answers
function checkAnswer(selectedAnswer) {
    let item = quizQuestions[currentQuestion];

    let buttons = document.querySelectorAll("#answerOptions button");

    buttons.forEach(function(button) {
        button.disabled = true;

        if (button.getAttribute("data-answer") === item.answer) {
            button.style.backgroundColor = "#16a34a";
            button.style.color = "white";
        } else if (button.getAttribute("data-answer") === selectedAnswer) {
            button.style.backgroundColor = "#dc2626";
            button.style.color = "white";
        }
    });

    if (selectedAnswer === item.answer) {
        score++;
    }

    document.getElementById("quizScore").innerHTML = "Score: " + score;
}

// Next Question
document.getElementById("nextQuestionBtn").addEventListener("click", function() {
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
});

/* Week 5 - Timer Functions */

function startTimer() {
    clearInterval(timerInterval);

    timer = 30;

    document.getElementById("timer").innerHTML =
        "Time: " + timer + " seconds";

    timerInterval = setInterval(function() {
        timer--;

        document.getElementById("timer").innerHTML =
            "Time: " + timer + " seconds";

        if (timer <= 0) {
            clearInterval(timerInterval);

            currentQuestion++;

            if (currentQuestion < quizQuestions.length) {
                showQuestion();
                startTimer();
            } else {
                finishQuiz();
            }
        }
    }, 1000);
}

/* Finish Quiz and Save Results */

function finishQuiz() {
    clearInterval(timerInterval);

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userIndex = users.findIndex(function(user) {
        return user.email === currentUser.email;
    });

    if (userIndex !== -1) {
        users[userIndex].quizCount++;

        if (score > users[userIndex].bestScore) {
            users[userIndex].bestScore = score;
        }

        if (!users[userIndex].history) {
            users[userIndex].history = [];
        }

        let result = {
            score: score,
            total: quizQuestions.length,
            date: new Date().toLocaleString(),
            timestamp: Date.now()
        };

        users[userIndex].history.push(result);

        localStorage.setItem("users", JSON.stringify(users));

        currentUser = users[userIndex];

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    document.getElementById("quizSection").style.display = "none";
    document.getElementById("resultSection").style.display = "block";

    document.getElementById("finalScore").innerHTML =
        "Your score: " + score + " / " + quizQuestions.length;

    // Switch Statement
    let message;

    let percentage = (score / quizQuestions.length) * 100;

    switch (true) {
        case percentage >= 80:
            message = "Excellent work!";
            break;

        case percentage >= 50:
            message = "Good effort! Keep practising.";
            break;

        default:
            message = "Keep learning and try again!";
    }

    document.getElementById("resultMessage").innerHTML = message;

    // Delayed Result Message
    setTimeout(function() {
        document.getElementById("resultMessage").insertAdjacentText(
            "beforeend",
            " Your progress has been saved."
        );
    }, 1000);
}

/* Play Again */

document.getElementById("playAgainBtn").addEventListener("click", function() {
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "block";

    showDashboard();
});

/* Return to Dashboard */

document.getElementById("homeBtn").addEventListener("click", function() {
    showDashboard();
});

/* Logout */

document.getElementById("logoutBtn").addEventListener("click", function() {
    clearInterval(timerInterval);

    localStorage.removeItem("currentUser");

    currentUser = null;

    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
});

/* Dark Mode */

document.getElementById("darkModeBtn").addEventListener("click", function() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        this.textContent = "Light Mode";
    } else {
        this.textContent = "Dark Mode";
    }
});

/* Week 5 - Promises and Async/Await */

// Promise Example
function getQuizQuestions() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (questions.length > 0) {
                resolve(questions);
            } else {
                reject("No questions available");
            }
        }, 500);
    });
}

// Async/Await
async function loadQuizData() {
    let data = await getQuizQuestions();

    console.log("Questions Loaded:", data);

    return data;
}

// Promise then() and catch()
getQuizQuestions()
    .then(function(data) {
        console.log("Promise successful:", data.length);
    })
    .catch(function(error) {
        console.log("Promise error:", error);
    })
    .finally(function() {
        console.log("Question loading finished");
    });

/* Promise Methods Practice */

function promisePractice() {

    // Promise.resolve()
    let firstPromise = Promise.resolve("First task completed");

    // Promise.reject()
    let rejectedPromise = Promise.reject("Example error");

    rejectedPromise.catch(function(error) {
        console.log(error);
    });

    // Promise.all()
    Promise.all([
        Promise.resolve("Task 1"),
        Promise.resolve("Task 2")
    ]).then(function(results) {
        console.log("Promise All:", results);
    });

    // Promise.race()
    Promise.race([
        Promise.resolve("Fast task"),
        new Promise(function(resolve) {
            setTimeout(function() {
                resolve("Slow task");
            }, 1000);
        })
    ]).then(function(result) {
        console.log("Promise Race:", result);
    });

    // Promise.allSettled()
    Promise.allSettled([
        Promise.resolve("Success"),
        Promise.reject("Failed")
    ]).then(function(results) {
        console.log("Promise All Settled:", results);
    });

    // Promise.any()
    Promise.any([
        Promise.reject("First failed"),
        Promise.resolve("Second successful")
    ]).then(function(result) {
        console.log("Promise Any:", result);
    });

    return firstPromise;
}

/* Automatic Login After Refresh */

window.addEventListener("DOMContentLoaded", function() {
    try {
        let savedUser = JSON.parse(localStorage.getItem("currentUser"));

        if (savedUser) {
            let users = JSON.parse(localStorage.getItem("users")) || [];

            currentUser = users.find(function(user) {
                return user.email === savedUser.email;
            });

            if (currentUser) {
                showDashboard();
            }
        }

        console.log("Total Questions:", getQuestionCount());
        console.log("Categories:", getCategories());
        console.log("Sorted Questions:", sortQuestions());

        promisePractice();

    } catch (error) {
        console.log("Application Error:", error);
    }
});
