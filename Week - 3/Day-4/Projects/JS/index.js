
document.addEventListener("DOMContentLoaded", function () {
    //delete data
    window.deleteData = function (id) {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                console.log(`Deleted record with ID: ${id}`);
                // location.reload();
            })
            .catch(error => console.error('Error deleting data:', error));
    };


    // Function to populate edit form
    window.editUser = function (userId) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                document.getElementById("editUserId").value = user.id;
                document.getElementById("editName").value = user.name;
                document.getElementById("editEmail").value = user.email;
                document.getElementById("editPassword").value = user.password;
                document.getElementById("editAddress").value = user.address.city;
                document.getElementById("editPincode").value = user.pincode;
                document.getElementById("editStreet").value = user.street;
                document.getElementById("editPhone").value = user.phone;
                document.getElementById("editWebsite").value = user.company.website;
                document.getElementById("editCompany").value = user.company.name;
            })
            .catch(error => console.error("Error fetching user:", error));
    };



    document.getElementById("editUserForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const userId = document.getElementById("editUserId").value;

        if (!userId) {
            console.error("Error: User ID is missing.");
            alert("Error: Cannot update. User ID is missing.");
            return;
        }

        const updatedUser = {
            id: userId,
            name: document.getElementById("editName").value,
            email: document.getElementById("editEmail").value,
            password: document.getElementById("editPassword").value,
            address: { city: document.getElementById("editAddress").value },
            pincode: document.getElementById("editPincode").value,
            street: document.getElementById("editStreet").value,
            phone: document.getElementById("editPhone").value,
            company: {
                website: document.getElementById("editWebsite").value,
                name: document.getElementById("editCompany").value
            }
        };

        // Send PUT request to update user data
        fetch(`http://localhost:3000/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("User updated:", data);
                alert("User updated successfully!");
                closeEditModal();
                fetchUsers();
            })
            .catch(error => console.error("Error updating user:", error));
    });
    const tableBody = document.querySelector('#user-table tbody');
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
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
                    <a href="#editUsersModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit"><button id="edit_btn" onclick="editUser(${user.id})">&#xE254;</button></i></a>
                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" ><i class="material-icons" data-toggle="tooltip" title="Delete"><button id="dlt_btn" onclick="deleteData(${user.id})">&#xE872;</button></i></a>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })


    document.getElementById('employeeForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous error messages
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        document.getElementById('addressError').textContent = '';
        document.getElementById('pinError').textContent = '';
        document.getElementById('streetError').textContent = '';
        document.getElementById('phoneError').textContent = '';
        document.getElementById('websiteError').textContent = '';
        document.getElementById('companyError').textContent = '';

        // Get input values and trim whitespace
        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value.trim();
        var address = document.getElementById('address').value.trim();
        var pincode = document.getElementById('pincode').value.trim();
        var street = document.getElementById('street').value.trim();
        var phone = document.getElementById('phone').value.trim();
        var website = document.getElementById('website').value.trim();
        var company = document.getElementById('company').value.trim();


        //validation

        var isValid = true;

        // Validate Name: required
        var NameRegex = /^[A-Za-z\s]{3,30}$/;
        if (name === '') {
            document.getElementById('nameError').innerHTML = 'Name is required ?';
            isValid = false;
        }
        else if (!NameRegex.test(name)) {
            document.getElementById('nameError').innerHTML = 'Enter a valid Name';
            isValid = false;
        }

        // Validate Email: required and proper format
        var EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            document.getElementById('emailError').textContent = 'Email is required ?';
            isValid = false;
        } else if (!EmailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Enter a valid email address.';
            isValid = false;
        }
        // Validate Password: required
        var PasswordRegex = /(?=.*[A-Z])(?=.*[!@#\$%])/;
        if (password === '') {
            document.getElementById('passwordError').innerHTML = 'Password is Required ?';
            isValid = false;
        }
        else if (!PasswordRegex.test(password)) {
            document.getElementById('passwordError').innerHTML = 'Enter a valid Password';
            isValid = false;
        }
        // Validate Address: required
        var AddressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
        if (address === '') {
            document.getElementById('addressError').textContent = 'Address is required ?';
            isValid = false;
        }
        else if (!AddressRegex.test(address)) {
            document.getElementById('passwordError').innerHTML = 'Enter a valid Address';
            isValid = false;
        }
        //Pin validation
        var PinRegex = /^ [1-9][0-9]{5}$/;
        if (pincode == '') {
            document.getElementById('pinError').innerHTML = "Pincode is required ?"
            isValid = false;
        }
        else if (!PinRegex.test(pincode)) {
            document.getElementById('pinError').innerHTML = "Enter a valid Pincode !!"
            isValid = false;
        }
        //Street validation
        var StreetRegex = /^[#.0-9a-zA-Z\s,-]+$/;
        if (street === '') {
            document.getElementById('streetError').innerHTML = "Street Address is Required ?";
            isValid = false;
        }
        else if (!StreetRegex.test(street)) {
            document.getElementById('streetError').innerHTML = "Enter a valid Street Address";
            isValid = false;    
        }
        // Validate Phone: required and should be 10 digits (modify regex as needed)
        var phoneRegex = /^[6-9]\d{9}$/;
        if (phone === '') {
            document.getElementById('phoneError').innerHTML = 'Phone number is required.';
            isValid = false;
        } else if (!phoneRegex.test(phone) || phone.length !== 10) {
            document.getElementById('phoneError').innerHTML = 'Enter a valid 10-digit indian phone number.';
            isValid = false;
        }
        // Validate Website: required and a simple URL check (you can enhance this as needed)
        var websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        if (website === '') {
            document.getElementById('websiteError').innerHTML = 'Website is required.';
            isValid = false;
        } else if (!websiteRegex.test(website)) {
            document.getElementById('websiteError').innerHTML = 'Enter a valid website URL.';
            isValid = false;
        }

        // Validate Company: required
        if (company === '') {
            document.getElementById('companyError').innerHTML = 'Company is required.';
            isValid = false;
        }
        if (isValid) {
            console.log('Form is valid. You can now submit the data.');

        }
    });
    /////////////////////////
    //save data
    const form = document.getElementById("employeeForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form values  
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const address = document.getElementById("address").value.trim();
            const pincode = document.getElementById('pincode').value.trim();
            const street = document.getElementById('street').value.trim();
            const phone = document.getElementById("phone").value.trim();
            const website = document.getElementById("website").value.trim();
            const company = document.getElementById("company").value.trim();

            // Validate input fields (Basic)
            if (!name || !email || !password || !address || !pincode || !street || !phone || !website || !company) {
                alert("All fields are required!");
                return;
            }

            // Create user object
            const newUser = {
                id: String(Date.now()),
                name,
                email,
                password,
                address: { city: address },
                pincode,
                street,
                phone,
                company: { website, name: company }
            };

            // Send POST request to JSON Server
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("User added:", data);
                    alert("User added successfully!");

                    // Reset form fields after successful submission
                    form.reset();
                })
                .catch(error => console.error("Error adding user:", error));
        });
    } else {
        console.error("Form with ID 'employeeForm' not found in the document.");
    }
})


//Typescript

// document.addEventListener("DOMContentLoaded", function () {
//     // Define User Interface
//     interface Address {
//         city: string;
//     }

//     interface Company {
//         website: string;
//         name: string;
//     }

//     interface User {
//         id: string;
//         name: string;
//         email: string;
//         password: string;
//         address: Address;
//         pincode: string;
//         street: string;
//         phone: string;
//         company: Company;
//     }

//     // Delete User Data
//     (window as any).deleteData = function (id: string): void {
//         fetch(`http://localhost:3000/users/${id}`, {
//             method: 'DELETE'
//         })
//             .then(() => {
//                 console.log(`Deleted record with ID: ${id}`);
//             })
//             .catch(error => console.error('Error deleting data:', error));
//     };

//     // Function to Populate Edit Form
//     (window as any).editUser = function (userId: string): void {
//         fetch(`http://localhost:3000/users/${userId}`)
//             .then(response => response.json())
//             .then((user: User) => {
//                 (document.getElementById("editUserId") as HTMLInputElement).value = user.id;
//                 (document.getElementById("editName") as HTMLInputElement).value = user.name;
//                 (document.getElementById("editEmail") as HTMLInputElement).value = user.email;
//                 (document.getElementById("editPassword") as HTMLInputElement).value = user.password;
//                 (document.getElementById("editAddress") as HTMLInputElement).value = user.address.city;
//                 (document.getElementById("editPincode") as HTMLInputElement).value = user.pincode;
//                 (document.getElementById("editStreet") as HTMLInputElement).value = user.street;
//                 (document.getElementById("editPhone") as HTMLInputElement).value = user.phone;
//                 (document.getElementById("editWebsite") as HTMLInputElement).value = user.company.website;
//                 (document.getElementById("editCompany") as HTMLInputElement).value = user.company.name;
//             })
//             .catch(error => console.error("Error fetching user:", error));
//     };

//     const editUserForm = document.getElementById("editUserForm");
//     if (editUserForm) {
//         editUserForm.addEventListener("submit", function (e: Event) {
//             e.preventDefault();

//             const userId = (document.getElementById("editUserId") as HTMLInputElement).value;
//             if (!userId) {
//                 alert("Error: Cannot update. User ID is missing.");
//                 return;
//             }

//             const updatedUser: User = {
//                 id: userId,
//                 name: (document.getElementById("editName") as HTMLInputElement).value,
//                 email: (document.getElementById("editEmail") as HTMLInputElement).value,
//                 password: (document.getElementById("editPassword") as HTMLInputElement).value,
//                 address: { city: (document.getElementById("editAddress") as HTMLInputElement).value },
//                 pincode: (document.getElementById("editPincode") as HTMLInputElement).value,
//                 street: (document.getElementById("editStreet") as HTMLInputElement).value,
//                 phone: (document.getElementById("editPhone") as HTMLInputElement).value,
//                 company: {
//                     website: (document.getElementById("editWebsite") as HTMLInputElement).value,
//                     name: (document.getElementById("editCompany") as HTMLInputElement).value
//                 }
//             };

//             fetch(`http://localhost:3000/users/${userId}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(updatedUser)
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     alert("User updated successfully!");
//                 })
//                 .catch(error => console.error("Error updating user:", error));
//         });
//     }

//     const tableBody = document.querySelector('#user-table tbody');
//     if (tableBody) {
//         fetch('http://localhost:3000/users')
//             .then(response => response.json())
//             .then((data: User[]) => {
//                 data.forEach(user => {
//                     const row = document.createElement('tr');
//                     row.innerHTML = `
//                         <td>${user.id}</td>
//                         <td>${user.name}</td>
//                         <td>${user.email}</td>
//                         <td>${user.password}</td>
//                         <td>${user.address.city}</td>
//                         <td>${user.pincode}</td>
//                         <td>${user.street}</td>
//                         <td>${user.phone}</td>
//                         <td><a href="${user.company.website}" target="_blank">${user.company.website}</a></td>
//                         <td>${user.company.name}</td>
//                         <td>
//                         <button id="edit_btn" onclick="editUser('${user.id}')">Edit</button>
//                         <button id="dlt_btn" onclick="deleteData('${user.id}')">Delete</button>
//                         </td>
//                     `;
//                     tableBody.appendChild(row);
//                 });
//             })
//             .catch(error => console.error("Error fetching users:", error));
//     }

//     const form = document.getElementById("employeeForm");
//     if (form) {
//         form.addEventListener("submit", function (e: Event) {
//             e.preventDefault();

//             const newUser: User = {
//                 id: String(Date.now()),
//                 name: (document.getElementById("name") as HTMLInputElement).value.trim(),
//                 email: (document.getElementById("email") as HTMLInputElement).value.trim(),
//                 password: (document.getElementById("password") as HTMLInputElement).value.trim(),
//                 address: { city: (document.getElementById("address") as HTMLInputElement).value.trim() },
//                 pincode: (document.getElementById("pincode") as HTMLInputElement).value.trim(),
//                 street: (document.getElementById("street") as HTMLInputElement).value.trim(),
//                 phone: (document.getElementById("phone") as HTMLInputElement).value.trim(),
//                 company: {
//                     website: (document.getElementById("website") as HTMLInputElement).value.trim(),
//                     name: (document.getElementById("company") as HTMLInputElement).value.trim()
//                 }
//             };

//             fetch("http://localhost:3000/users", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(newUser)
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     alert("User added successfully!");
//                     form.reset();
//                 })
//                 .catch(error => console.error("Error adding user:", error));
//         });
//     }
// });

//signup--






// window.onload()
// function load() {
//     // display loading image here...
//     document.getElementById('loadingImg').visible = true;
//     // request your data...
//     var req = new XMLHttpRequest();
//     req.open("POST", url, true);

//     req.onreadystatechange = function () {
//         if (req.readyState == 4 && req.status == 200) {
//             // content is loaded...hide the gif and display the content...
//             if (req.responseText) {
//                 document.getElementById('content').innerHTML = req.responseText;
//                 document.getElementById('loadingImg').visible = false;
//             }
//         }
//     };
//     request.send(vars);

