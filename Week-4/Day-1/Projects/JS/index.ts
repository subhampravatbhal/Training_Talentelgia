document.addEventListener("DOMContentLoaded", function () {
    // Delete data function
    (window as any).deleteData = function (id: number): void {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                console.log(`Deleted record with ID: ${id}`);
            })
            .catch(error => console.error('Error deleting data:', error));
    };

    // Function to populate edit form
    (window as any).editUser = function (userId: number): void {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                (document.getElementById("editUserId") as HTMLInputElement).value = user.id;
                (document.getElementById("editName") as HTMLInputElement).value = user.name;
                (document.getElementById("editEmail") as HTMLInputElement).value = user.email;
                (document.getElementById("editPassword") as HTMLInputElement).value = user.password;
                (document.getElementById("editAddress") as HTMLInputElement).value = user.address.city;
                (document.getElementById("editPincode") as HTMLInputElement).value = user.pincode;
                (document.getElementById("editStreet") as HTMLInputElement).value = user.street;
                (document.getElementById("editPhone") as HTMLInputElement).value = user.phone;
                (document.getElementById("editWebsite") as HTMLInputElement).value = user.company.website;
                (document.getElementById("editCompany") as HTMLInputElement).value = user.company.name;
            })
            .catch(error => console.error("Error fetching user:", error));
    };

    const editUserForm = document.getElementById("editUserForm") as HTMLFormElement | null;
    if (editUserForm) {
        editUserForm.addEventListener("submit", function (e: Event) {
            e.preventDefault();

            const userId = (document.getElementById("editUserId") as HTMLInputElement).value;
            if (!userId) {
                alert("Error: Cannot update. User ID is missing.");
                return;
            }

            const updatedUser = {
                id: userId,
                name: (document.getElementById("editName") as HTMLInputElement).value,
                email: (document.getElementById("editEmail") as HTMLInputElement).value,
                password: (document.getElementById("editPassword") as HTMLInputElement).value,
                address: { city: (document.getElementById("editAddress") as HTMLInputElement).value },
                pincode: (document.getElementById("editPincode") as HTMLInputElement).value,
                street: (document.getElementById("editStreet") as HTMLInputElement).value,
                phone: (document.getElementById("editPhone") as HTMLInputElement).value,
                company: {
                    website: (document.getElementById("editWebsite") as HTMLInputElement).value,
                    name: (document.getElementById("editCompany") as HTMLInputElement).value
                }
            };

            fetch(`http://localhost:3000/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser)
            })
                .then(response => response.json())
                .then(data => {
                    alert("User updated successfully!");
                    location.reload();
                })
                .catch(error => console.error("Error updating user:", error));
        });
    }

    const tableBody = document.querySelector('#user-table tbody') as HTMLTableSectionElement | null;
    if (tableBody) {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => {
                data.forEach((user: any) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        <td>${user.address.city}</td>
                        <td>${user.pincode}</td>
                        <td>${user.street}</td>
                        <td>${user.phone}</td>
                        <td><a href="${user.company.website}" target="_blank">${user.company.website}</a></td>
                        <td>${user.company.name}</td>
                        <td>
                            <button onclick="editUser(${user.id})">Edit</button>
                            <button onclick="deleteData(${user.id})">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    }
});
