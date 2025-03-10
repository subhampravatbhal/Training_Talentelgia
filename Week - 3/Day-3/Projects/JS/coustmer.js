const API_URL = "http://localhost:3000/users";
 
//Extract email from the URL
function getUserEmailFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("email");
}
 
//Fetch user by email and populate update form
function fetchUserData() {
    const email = getUserEmailFromURL();
    if (!email) {
        alert("No user email found. Redirecting to login.");
        window.location.href = "login.html";
        return;
    }
 
    fetch(`${API_URL}?email=${email}`)
        .then(response => response.json())
        .then(users => {
            if (users.length === 0) {
                alert("User not found! Redirecting to login.");
                window.location.href = "login.html";
                return;
            }
 
            const user = users[0];
 
            // Populate the form fields
            document.getElementById("editUserId").value = user.id;
            document.getElementById("updateName").value = user.name;
            document.getElementById("updateEmail").value = user.email;
            document.getElementById("updateAddress").value = user.address;
            document.getElementById("updatePhone").value = user.phone;
            document.getElementById("updateWebsite").value = user.website;
            document.getElementById("updateCompany").value = user.company;
 
            // Create and insert the user row in the table
            const tableBody = document.querySelector('#user-table tbody');
            tableBody.innerHTML = "";
            const row = document.createElement("tr");
            row.id = `row-${user.id}`;
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address || "N/A"}</td>
                <td>${user.role || "N/A"}</td>
                <td>${user.phone}</td>
                <td><a href="${user.website}" target="_blank">${user.website}</a></td>
                <td>${user.company || "N/A"}</td>
            `;
            tableBody.appendChild(row);
 
            // Bind delete event
            document.getElementById("deleteBtn").addEventListener("click", function () {
                deleteUser(user.id);
            });
 
            // Show update modal when clicking update button
            document.getElementById("updateBtn").addEventListener("click", function () {
                $("#editUsersModal").modal("show");
            });
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
}
 
//Delete User from API & Table
function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                document.getElementById(`row-${id}`).remove();
                alert("User deleted successfully!");
                window.location.href = "login.html";
            } else {
                alert("Failed to delete user.");
            }
        })
        .catch(error => console.error("Error deleting user:", error));
    }
}
 
//Update user details in API
document.getElementById("updateForm").addEventListener("submit", function (event) {
    event.preventDefault();
 
    const userId = document.getElementById("editUserId").value;
    const updatedUser = {
        name: document.getElementById("updateName").value,
        email: document.getElementById("updateEmail").value,
        phone: document.getElementById("updatePhone").value,
        address: document.getElementById("updateAddress").value,
        website: document.getElementById("updateWebsite").value,
        company: document.getElementById("updateCompany").value,
       
    };
 
    fetch(`${API_URL}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(updatedUserData => {
        alert("User updated successfully!");
        $("#editUsersModal").modal("hide");
        updateTableRow(updatedUserData);
    })
    .catch(error => console.error("Error updating user:", error));
});
 
//Update the table row dynamically
function updateTableRow(updatedUser) {
    const row = document.getElementById(`row-${updatedUser.id}`);
    if (row) {
        row.cells[1].textContent = updatedUser.name;
        row.cells[2].textContent = updatedUser.email;
        row.cells[3].textContent = updatedUser.address;
        row.cells[5].textContent = updatedUser.phone;
        row.cells[6].innerHTML = `<a href="${updatedUser.website}" target="_blank">${updatedUser.company.website}</a>`;
        row.cells[7].textContent = updatedUser.company;
    }
}
 
//Auto-fetch user when the page loads
fetchUserData();