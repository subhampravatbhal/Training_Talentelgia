var _a;
var API_URL = "http://localhost:3000/users";
(_a = document.getElementById("loginForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", loginUser);
function loginUser(event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value;
    var message = document.getElementById("message");
    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    fetch(API_URL)
        .then(function (res) { return res.json(); })
        .then(function (users) {
        console.log("Fetched Users:", users);
        var user = users.find(function (user) { return user.email === email; });
        console.log("Matching User:", user);
        if (!user) {
            if (message) {
                message.style.color = "red";
                message.innerHTML = "User not found!";
            }
            return;
        }
        if (user.password !== password) {
            if (message) {
                message.style.color = "red";
                message.innerHTML = "Incorrect password!";
            }
            return;
        }
        if (message) {
            message.style.color = "green";
            message.innerHTML = "Login successful!";
        }
        alert("Login Successful!");
        if (user.role === "Customer") {
            window.location.href = "customer.html?email=".concat(encodeURIComponent(email));
        }
        else if (user.role === "Admin" || user.role === "Super Admin") {
            window.location.href = "index.html?email=".concat(encodeURIComponent(email));
        }
    })
        .catch(function (error) {
        console.error("Error logging in:", error);
        if (message) {
            message.style.color = "red";
            message.innerHTML = "Login failed!";
        }
    });
}
