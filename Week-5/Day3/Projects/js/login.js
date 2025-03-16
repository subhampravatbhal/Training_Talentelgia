
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
//     const username = document.getElementById("username").value.trim();
//     const password = document.getElementById("password").value.trim();
    
//     if (formTitle.textContent === "Create an Account") {
//         const email = document.getElementById("email").value.trim();
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
//         toggleText.innerHTML = 'Already have an account? <a href="#" class="text-green-400" id="toggleForm">Login</a>';
//     } else {
//         formTitle.textContent = "Welcome Back!";
//         authForm.innerHTML = `
//             <input type="text" id="username" placeholder="Username or Email" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//             <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
//             <button type="submit" class="w-full bg-green-500 py-2 rounded-lg">Login</button>
//         `;
//         toggleText.innerHTML = 'Don\'t have an account? <a href="#" class="text-green-400" id="toggleForm">Sign Up</a>';
//     }
// });

const formTitle = document.getElementById("formTitle");
const authForm = document.getElementById("authForm");
const toggleText = document.getElementById("toggleText");
const toggleForm = document.getElementById("toggleForm");

// Function to save user data
async function saveUserData(user) {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            alert("Registration successful! Please login.");
            toggleToLogin(); // Switch to login form after successful registration
        } else {
            alert("Failed to register user.");
        }
    } catch (error) {
        console.error("Error saving user data:", error);
    }
}

// Function to log in user
async function loginUser(identifier, password) {
    try {
        const response = await fetch('http://localhost:3000/users', { // Use a dedicated login endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data)); // Save user data (token/session info)
            alert("Login successful!");
            window.location.href = 'index.html';
        } else {
            alert("Invalid email/username or password.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

// Handle form submission
authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const identifier = document.getElementById("identifier").value.trim();
    const password = document.getElementById("password").value.trim();

    if (formTitle.textContent === "Create an Account") {
        const email = document.getElementById("email").value.trim();
        if (identifier && email && password) {
            await saveUserData({ username: identifier, email, password });
        } else {
            alert("Please fill in all fields.");
        }
    } else {
        await loginUser(identifier, password);
    }
});

// Switch to Sign Up form
function toggleToSignUp() {
    formTitle.textContent = "Create an Account";
    authForm.innerHTML = `
        <input type="text" id="identifier" placeholder="Username" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
        <input type="email" id="email" placeholder="Email" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
        <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
        <button type="submit" class="w-full bg-blue-500 py-2 rounded-lg">Sign Up</button>
    `;
    toggleText.innerHTML = 'Already have an account? <a href="#" class="text-green-400" id="toggleForm">Login</a>';
    attachToggleListener();
}

// Switch to Login form
function toggleToLogin() {
    formTitle.textContent = "Welcome Back!";
    authForm.innerHTML = `
        <input type="text" id="identifier" placeholder="Username or Email" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
        <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none">
        <button type="submit" class="w-full bg-green-500 py-2 rounded-lg">Login</button>
    `;
    toggleText.innerHTML = 'Don\'t have an account? <a href="#" class="text-green-400" id="toggleForm">Sign Up</a>';
    attachToggleListener();
}

// Attach event listener to toggle between forms
function attachToggleListener() {
    document.getElementById("toggleForm").addEventListener("click", (e) => {
        e.preventDefault();
        if (formTitle.textContent === "Welcome Back!") {
            toggleToSignUp();
        } else {
            toggleToLogin();
        }
    });
}

// Initialize event listener
attachToggleListener();
