
// //signup 

// const formTitle = document.getElementById("formTitle");
// const authForm = document.getElementById("authForm");
// const toggleText = document.getElementById("toggleText");
// const toggleForm = document.getElementById("toggleForm");

// async function saveUserData(user) {
//     try {
//         const response = await fetch('http://localhost:3000/users', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(user)
//         });
//         if (response.ok) {
//             window.location.href = 'login.html';


//         } else {
//             alert("Failed to register user.");
//         }
//     } catch (error) {
//         console.error("Error saving user data:", error);
//     }
// }
// //login
// async function loginUser(email, password) {
//     try {
//         const response = await fetch('http://localhost:3000/users');
//         const users = await response.json();
//         const user = users.find(user => user.email === email && user.password === password);
//         console.log(user.email);
//         console.log(user.password);
        
//         if (user) {
//             alert("Login successful!");
//             window.location.href = 'index.html';
//         } else {
//             alert("Invalid email or password.");
//         }
//     } catch (error) {
//         console.error("Error logging in:", error);
//     }
// }

// authForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
    
//     if (formTitle.textContent === "Create an Account") {
//         const email = document.getElementById("email").value;
//         if (username && email && password) {
//             await saveUserData({ username, email, password });
//         } else {
//             alert("Please fill in all fields.");
//         }
//     } else {
//         await loginUser(username, password);
//     }
// });

// toggleForm.addEventListener("click", (e) => {
//     e.preventDefault();
//     if (formTitle.textContent === "Welcome Back!") {
//         formTitle.textContent = "Create an Account";
//         authForm.innerHTML = `
//             <input type="text" id="username" placeholder="Username" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//             <input type="email" id="email" placeholder="Email" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//             <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//             <button type="submit" class="w-full bg-blue-500 py-2 rounded-lg">Sign Up</button>
//         `;
       
//         toggleText.innerHTML = 'Already have an account? <a href="../Public/login.html" class="text-green-400" id="toggleForm">Login</a>';
//     // } else {
//     //     formTitle.textContent = "Welcome Back!";
//     //     authForm.innerHTML = `
//     //         <input type="text" id="email" placeholder="Username or Email" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//     //         <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//     //         <button type="submit" class="w-full bg-green-500 py-2 rounded-lg">Login</button>
//     //     `;
//     //     toggleText.innerHTML = 'Don\'t have an account? <a href="#" class="text-green-400" id="toggleForm">Sign Up</a>';
//     }
    
// });




// part-2







// const formTitle = document.getElementById("formTitle");
// const authForm = document.getElementById("authForm");
// const toggleText = document.getElementById("toggleText");
// const toggleForm = document.getElementById("toggleForm");

// // Function to save user data
// async function saveUserData(user) {
//     try {
//         const response = await fetch('http://localhost:3000/users', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(user)
//         });

//         if (response.ok) {
//             alert("Registration successful! Please login.");
//             toggleToLogin(); // Switch to login form after successful registration
//         } else {
//             alert("Failed to register user.");
//         }
//     } catch (error) {
//         console.error("Error saving user data:", error);
//     }
// }

// // Function to log in user
// async function loginUser(identifier, password) {
//     try {
//         const response = await fetch('http://localhost:3000/users', { // Use a dedicated login endpoint
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ identifier, password })
//         });

//         if (response.ok) {
//             const data = await response.json();
//             localStorage.setItem("user", JSON.stringify(data)); // Save user data (token/session info)
//             alert("Login successful!");
//             window.location.href = 'index.html';
//         } else {
//             alert("Invalid email/username or password.");
//         }
//     } catch (error) {
//         console.error("Error logging in:", error);
//     }
// }

// // Handle form submission
// authForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const identifier = document.getElementById("identifier").value.trim();
//     const password = document.getElementById("password").value.trim();

//     if (formTitle.textContent === "Create an Account") {
//         const email = document.getElementById("email").value.trim();
//         if (identifier && email && password) {
//             await saveUserData({ username: identifier, email, password });
//         } else {
//             alert("Please fill in all fields.");
//         }
//     } else {
//         await loginUser(identifier, password);
//     }
// });

// // Switch to Sign Up form
// function toggleToSignUp() {
//     formTitle.textContent = "Create an Account";
//     authForm.innerHTML = `
//         <input type="text" id="identifier" placeholder="Username" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//         <input type="email" id="email" placeholder="Email" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//         <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//         <button type="submit" class="w-full bg-blue-500 py-2 rounded-lg">Sign Up</button>
//     `;
//     toggleText.innerHTML = 'Already have an account? <a href="#" class="text-green-400" id="toggleForm">Login</a>';
//     attachToggleListener();
// }

// // Switch to Login form
// function toggleToLogin() {
//     formTitle.textContent = "Welcome Back!";
//     authForm.innerHTML = `
//         <input type="text" id="identifier" placeholder="Username or Email" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//         <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//         <button type="submit" class="w-full bg-green-500 py-2 rounded-lg">Login</button>
//     `;
//     toggleText.innerHTML = 'Don\'t have an account? <a href="#" class="text-green-400" id="toggleForm">Sign Up</a>';
//     attachToggleListener();
// }

// // Attach event listener to toggle between forms
// function attachToggleListener() {
//     document.getElementById("toggleForm").addEventListener("click", (e) => {
//         e.preventDefault();
//         if (formTitle.textContent === "Welcome Back!") {
//             toggleToSignUp();
//         } else {
//             toggleToLogin();
//         }
//     });
// }

// // Initialize event listener
// attachToggleListener();




// part-3







// const formTitle = document.getElementById("formTitle");
// const authForm = document.getElementById("authForm");
// const toggleText = document.getElementById("toggleText");

// // Regular expressions for validation
// const usernameRegex = /^(?=.{3,16}$)[a-zA-Z0-9_!@#$%^&*]+$/; // 3-16 chars, letters, numbers, underscores // Letters, numbers, underscores, 3-16 chars
// const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,4}$/; // Standard email format
// const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 chars, 1 uppercase, 1 number

// // Function to validate input fields
// function validateField(inputId, regex, errorId, errorMessage) {
//     const input = document.getElementById(inputId);
//     const errorSpan = document.getElementById(errorId);
//     const validateInput = () => {
//         if (regex.test(input.value.trim())) {
//             errorSpan.textContent = ""; // Clear error if valid
//         } else {
//             errorSpan.textContent = errorMessage; // Show error if invalid
//         }
//     };

//     validateInput(); // Initial validation on load
//     input.addEventListener("input", () => {
//         if (regex.test(input.value.trim())) {
//             errorSpan.textContent = ""; // Clear error if valid
//         } else {
//             errorSpan.textContent = errorMessage; // Show error if invalid
//         }
//     });
// }

// // Function to validate user input before submission
// function validateForm(username, email, password) {
//     let isValid = true;

//     if (!usernameRegex.test(username)) {
//         showError("usernameError", "Username must be 3-16 characters (letters, numbers, underscores).");
//         isValid = false;
//     }
//     if (!emailRegex.test(email)) {
//         showError("emailError", "Enter a valid email address.");
//         isValid = false;
//     }
//     if (!passwordRegex.test(password)) {
//         showError("passwordError", "Password must be at least 8 chars, include 1 uppercase & 1 number & 1 special character.");
//         isValid = false;
//     }

//     return isValid;
// }

// // Function to show error message
// function showError(id, message) {
//     document.getElementById(id).textContent = message;
// }

// // Function to clear error message
// function clearError(id) {
//     document.getElementById(id).textContent = "";
// }

// // Function to save user data
// async function saveUserData(user) {
//     try {
//         const response = await fetch('http://localhost:3000/users', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(user)
//         });

//         if (response.ok) {
//             toggleToLogin(); // Switch to login form after successful registration
//         } else {
//             showError("generalError", "Failed to register user.");
//         }
//     } catch (error) {
//         console.error("Error saving user data:", error);
//     }
// }

// // Function to log in user
// async function loginUser(identifier, password) {
//     try {
//         const response = await fetch('http://localhost:3000/users', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ identifier, password })
//         });

//         if (response.ok) {
//             const data = await response.json();
//             localStorage.setItem("user", JSON.stringify(data));
//             window.location.href = 'index.html';
//         } else {
//             showError("generalError", "Invalid username/email or password.");
//         }
//     } catch (error) {
//         console.error("Error logging in:", error);
//     }
// }

// // Handle form submission
// authForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const identifier = document.getElementById("identifier").value.trim();
//     const password = document.getElementById("password").value.trim();

//     if (formTitle.textContent === "Create an Account") {
//         const email = document.getElementById("email").value.trim();

//         if (!validateForm(identifier, email, password)) {
//             return; // Stop submission if validation fails
//         }

//         await saveUserData({ username: identifier, email, password });
//     } else {
//         await loginUser(identifier, password);
//     }
// });

// // Switch to Sign Up form
// function toggleToSignUp() {
//     formTitle.textContent = "Create an Account";
//     authForm.innerHTML = `
//         <input type="text" id="identifier" placeholder="Username" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//         <span id="usernameError" class="text-red-500 text-sm"></span>

//         <input type="email" id="email" placeholder="Email" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//         <span id="emailError" class="text-red-500 text-sm"></span>

//         <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//         <span id="passwordError" class="text-red-500 text-sm"></span>

//         <button type="submit" class="w-full bg-blue-500 py-2 rounded-lg">Sign Up</button>
//         <span id="generalError" class="text-red-500 text-sm block text-center mt-2"></span>
//     `;
//     toggleText.innerHTML = 'Already have an account? <a href="#" class="text-green-400" id="toggleForm">Login</a>';
//     attachToggleListener();

//     // Add real-time validation
//     validateField("identifier", usernameRegex, "usernameError", "Username must be 3-16 characters (letters, numbers, underscores).");
//     validateField("email", emailRegex, "emailError", "Enter a valid email address.");
//     validateField("password", passwordRegex, "passwordError", "Password must be at least 8 chars, include 1 uppercase & 1 number & 1 special character.");
// }

// // Switch to Login form
// function toggleToLogin() {
//     formTitle.textContent = "Welcome Back!";
//     authForm.innerHTML = `
//         <input type="text" id="identifier" placeholder="Username or Email" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//         <span id="usernameError" class="text-red-500 text-sm"></span>

//         <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//         <span id="passwordError" class="text-red-500 text-sm"></span>

//         <button type="submit" class="w-full bg-green-500 py-2 rounded-lg">Login</button>
//         <span id="generalError" class="text-red-500 text-sm block text-center mt-2"></span>
//     `;
//     toggleText.innerHTML = 'Don\'t have an account? <a href="#" class="text-green-400" id="toggleForm">Sign Up</a>';
//     attachToggleListener();
// }

// // Attach event listener to toggle between forms
// function attachToggleListener() {
//     document.getElementById("toggleForm").addEventListener("click", (e) => {
//         e.preventDefault();
//         if (formTitle.textContent === "Welcome Back!") {
//             toggleToSignUp();
//         } else {
//             toggleToLogin();
//         }
//     });
// }

// // Initialize event listener
// attachToggleListener();



// part-4





const formTitle = document.getElementById("formTitle");
const authForm = document.getElementById("authForm");
const toggleText = document.getElementById("toggleText");
const toggleForm = document.getElementById("toggleForm");

// Regular expressions for validation
const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{3,15}$/; // At least 1 uppercase, 1 lowercase, 1 special char
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,15}$/; // 6 chars, 1 uppercase, 1 number, 1 special char

// Validate fields
function validateField(input, regex, errorMsg) {
    let errorElement = document.getElementById(input.id + "Error");
    if (!errorElement) {
        errorElement = document.createElement("p");
        errorElement.id = input.id + "Error";
        errorElement.className = "text-red-500 text-sm mt-1";
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    if (!regex.test(input.value.trim())) {
        errorElement.textContent = errorMsg;
        return false;
    } else {
        errorElement.textContent = "";
        return true;
    }
}
// Real-time validation listeners
document.addEventListener("input", (e) => {
    if (e.target.id === "username") {
        validateField(e.target, usernameRegex, "Username must have 3-15 characters, 1 uppercase, 1 lowercase, 1 special character.");
    }
    if (e.target.id === "email") {
        validateField(e.target, emailRegex, "Enter a valid email address.");
    }
    if (e.target.id === "password") {
        validateField(e.target, passwordRegex, "Password must be at least 6 chars, 1 uppercase, 1 number, and 1 special char.");
    }
});

// Save user data to JSON server
async function saveUserData(user) {
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            alert("Account created successfully! Redirecting to login...");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 500);
        } else {
            alert("Error creating account.");
        }
    } catch (error) {
        console.error("Error saving user data:", error);
    }
}

// Login function (Fetch users from JSON)
async function loginUser(email, password) {
    try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();

        console.log("Users fetched:", users); // Debugging log

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login successful!");
            localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store logged-in user
            window.location.href = 'index.html';
        } else {
            alert("Invalid email or password.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

// Handle form submission
authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const isEmailValid = validateField(email, emailRegex, "Enter a valid email address.");
    const isPasswordValid = validateField(password, passwordRegex, "Password must be at least 8 chars, 1 uppercase, 1 number, and 1 special char.");

    if (formTitle.textContent === "Create an Account") {
        // Signup
        const username = document.getElementById("username");
        const isUsernameValid = validateField(username, usernameRegex, "Username must have 3 characters, 1 uppercase, 1 lowercase, 1 special character.");

        if (isUsernameValid && isEmailValid && isPasswordValid) {
            saveUserData({
                username: username.value.trim(),
                email: email.value.trim(),
                password: password.value.trim()
            });
        } else {
             alert("Please fill all the fields correctly.");
        }
    } else {
        // Login
        if (isEmailValid && isPasswordValid) {
            loginUser(email.value.trim(), password.value.trim());
        } else {
            alert("Please add email and password correctly.");
        }
    }
});

// Toggle Sign Up Form
toggleForm.addEventListener("click", (e) => {
    e.preventDefault();

    if (formTitle.textContent === "Welcome Back!") {
        // Switch to Signup Form
        formTitle.textContent = "Create an Account";
        authForm.innerHTML = `
            <input type="text" id="username" placeholder="Username" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
            <input type="email" id="email" placeholder="Email" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
            <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
            <button type="submit" class="w-full bg-blue-500 py-2 rounded-lg">Sign Up</button>
        `;
        toggleText.innerHTML = `Already have an account? <a href="login.html" class="text-green-400" id="toggleForm">Login</a>`;
    }
});




//login validation








// const formTitle = document.getElementById("formTitle");
// const authForm = document.getElementById("authForm");
// const toggleText = document.getElementById("toggleText");
// const toggleForm = document.getElementById("toggleForm");

// // Regular expressions for validation
// const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{3,15}$/; // 1 uppercase, 1 lowercase, 1 special char
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
// const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // 8 chars, 1 uppercase, 1 number, 1 special char

// // Function to validate fields and show errors in real-time
// function validateField(input, regex, errorMsg) {
//     let errorElement = document.getElementById(input.id + "Error");
//     if (!errorElement) {
//         errorElement = document.createElement("p");
//         errorElement.id = input.id + "Error";
//         errorElement.className = "text-red-500 text-sm mt-1";
//         input.parentNode.insertBefore(errorElement, input.nextSibling);
//     }
//     if (!regex.test(input.value.trim())) {
//         errorElement.textContent = errorMsg;
//         return false;
//     } else {
//         errorElement.textContent = "";
//         return true;
//     }
// }

// // Real-time validation listeners
// document.addEventListener("input", (e) => {
//     if (e.target.id === "username") {
//         validateField(e.target, usernameRegex, "Username must have 3-15 characters, 1 uppercase, 1 lowercase, 1 special character.");
//     }
//     if (e.target.id === "email") {
//         validateField(e.target, emailRegex, "Enter a valid email address.");
//     }
//     if (e.target.id === "password") {
//         validateField(e.target, passwordRegex, "Password must be at least 8 chars, 1 uppercase, 1 number, and 1 special char.");
//     }
// });

// // Save user data to localStorage & JSON server
// async function saveUserData(user) {
//     let users = JSON.parse(localStorage.getItem("users")) || [];

//     // Check if email already exists
//     if (users.some((u) => u.email === user.email)) {
//         alert("Email already registered. Please use another email.");
//         return;
//     }

//     users.push(user);
//     localStorage.setItem("users", JSON.stringify(users)); // Store in localStorage

//     try {
//         const response = await fetch("http://localhost:3000/users", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(user),
//         });

//         if (response.ok) {
//             alert("Account created successfully! Redirecting to login...");
//             setTimeout(() => {
//                 window.location.href = "login.html";
//             }, 500);
//         } else {
//             alert("Error creating account.");
//         }
//     } catch (error) {
//         console.error("Error saving user data:", error);
//     }
// }

// // Login function (Check from localStorage)
// function loginUser(email, password) {
//     let users = JSON.parse(localStorage.getItem("users")) || [];

//     const user = users.find((u) => u.email === email && u.password === password);

//     if (user) {
//         alert("Login successful!");
//         localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store logged-in user
//         window.location.href = 'index.html';
//     } else {
//         alert("Invalid email or password.");
//     }
// }

// // Handle form submission
// authForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const username = document.getElementById("username");
//     const email = document.getElementById("email");
//     const password = document.getElementById("password");

//     const isUsernameValid = validateField(username, usernameRegex, "Username must have 3-15 characters, 1 uppercase, 1 lowercase, 1 special character.");
//     const isEmailValid = validateField(email, emailRegex, "Enter a valid email address.");
//     const isPasswordValid = validateField(password, passwordRegex, "Password must be at least 8 chars, 1 uppercase, 1 number, and 1 special char.");

//     if (formTitle.textContent === "Create an Account") {
//         // Signup
//         if (isUsernameValid && isEmailValid && isPasswordValid) {
//             saveUserData({
//                 username: username.value.trim(),
//                 email: email.value.trim(),
//                 password: password.value.trim(),
//             });
//         }
//     } else {
//         // Login
//         if (isEmailValid && isPasswordValid) {
//             loginUser(email.value.trim(), password.value.trim());
//         }
//     }
// });

// // Toggle Sign Up Form
// toggleForm.addEventListener("click", (e) => {
//     e.preventDefault();

//     if (formTitle.textContent === "Welcome Back!") {
//         // Switch to Signup Form
//         formTitle.textContent = "Create an Account";
//         authForm.innerHTML = `
//             <input type="text" id="username" placeholder="Username" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//             <p id="usernameError" class="text-red-500 text-sm mt-1"></p>
//             <input type="email" id="email" placeholder="Email" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//             <p id="emailError" class="text-red-500 text-sm mt-1"></p>
//             <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//             <p id="passwordError" class="text-red-500 text-sm mt-1"></p>
//             <button type="submit" class="w-full bg-blue-500 py-2 rounded-lg">Sign Up</button>
//         `;
//         toggleText.innerHTML = `Already have an account? <a href="login.html" class="text-green-400" id="toggleForm">Login</a>`;
//     }
// });

