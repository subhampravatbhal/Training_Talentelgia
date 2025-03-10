var form = document.getElementById("employeeForm");
if (form) {
    form.addEventListener("submit", function (e) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        e.preventDefault();
        // Get form values
        var Name = (_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.value.trim();
        var Email = (_b = document.getElementById("Name_2")) === null || _b === void 0 ? void 0 : _b.value.trim();
        var Password = (_c = document.getElementById("Emp_mail")) === null || _c === void 0 ? void 0 : _c.value.trim();
        var Address = (_d = document.getElementById("Emp_pass")) === null || _d === void 0 ? void 0 : _d.value.trim();
        var Pincode = (_e = document.getElementById("Emp_conf_pass")) === null || _e === void 0 ? void 0 : _e.value.trim();
        var Street = (_f = document.getElementById("street")) === null || _f === void 0 ? void 0 : _f.value.trim();
        var Phone = (_g = document.getElementById("phone")) === null || _g === void 0 ? void 0 : _g.value.trim();
        var Website = (_h = document.getElementById("website")) === null || _h === void 0 ? void 0 : _h.value.trim();
        var Company = (_j = document.getElementById("company")) === null || _j === void 0 ? void 0 : _j.value.trim();
        var Role = (_k = document.getElementById("role")) === null || _k === void 0 ? void 0 : _k.value.trim();
        // Validate input fields (Basic)
        if (!Name || !Email || !Password || !Address || !Pincode || !Street || !Phone || !Website || !Company || !Role) {
            alert("All fields are required!");
            return;
        }
        // Create user object
        var newUser = {
            id: String(Date.now()),
            Name: Name,
            Email: Email,
            Password: Password,
            Address: Address,
            Pincode: Pincode,
            Street: Street,
            Phone: Phone,
            Website: Website,
            Company: Company,
            Role: Role,
        };
        // Send POST request to JSON Server
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log("User added:", data);
            alert("User added successfully!");
            window.location.href = "../Public/login.html";
            // Reset form fields after successful submission
            form.reset();
        })
            .catch(function (error) { return console.error("Error adding user:", error); });
    });
}
