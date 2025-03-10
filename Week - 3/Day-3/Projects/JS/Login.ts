const API_URL: string = "http://localhost:3000/users";

document.getElementById("loginForm")?.addEventListener("submit", loginUser);

interface User {
    email: string;
    password: string;
    role: string;
}

function loginUser(event: Event): void {
    event.preventDefault();

    const email: string = (document.getElementById("loginEmail") as HTMLInputElement).value.trim();
    const password: string = (document.getElementById("loginPassword") as HTMLInputElement).value;
    const message: HTMLElement | null = document.getElementById("message");

    console.log("Entered Email:", email);
    console.log("Entered Password:", password);

    fetch(API_URL)
        .then(res => res.json())
        .then((users: User[]) => {
            console.log("Fetched Users:", users);

            const user: User | undefined = users.find(user => user.email === email);
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
                window.location.href = `customer.html?email=${encodeURIComponent(email)}`;
            } else if (user.role === "Admin" || user.role === "Super Admin") {
                window.location.href = `index.html?email=${encodeURIComponent(email)}`;
            }
        })
        .catch(error => {
            console.error("Error logging in:", error);
            if (message) {
                message.style.color = "red";
                message.innerHTML = "Login failed!";
            }
        });
}
