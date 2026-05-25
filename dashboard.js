async function loadEmployees(){

    const response = await fetch("http://localhost:8087/employee/all");

    const employees = await response.json();

    let tableData = "";

    employees.forEach(employee => {

        tableData += `

        <tr>

            <td>${employee.id}</td>

            <td>${employee.name}</td>

            <td>${employee.email}</td>

            <td>${employee.department}</td>
            <td>

<button onclick="editEmployee(${employee.id}, '${employee.name}', '${employee.email}', '${employee.department}')">

Edit

</button>

<button onclick="deleteEmployee(${employee.id})">

Delete

</button>

</td>

        </tr>

        `;

    });

    document.getElementById("employeeTable").innerHTML = tableData;

}

loadEmployees();

function logout(){

    window.location.href = "auth.html";

}

function showDashboard(){

    document.getElementById("dashboardSection").style.display = "block";

    document.getElementById("employeeSection").style.display = "none";

    document.getElementById("addEmployeeSection").style.display = "none";

    document.getElementById("settingsSection").style.display = "none";

}

function showEmployees(){

    document.getElementById("dashboardSection").style.display = "none";

    document.getElementById("employeeSection").style.display = "block";

    document.getElementById("addEmployeeSection").style.display = "none";

    document.getElementById("settingsSection").style.display = "none";

}

function showAddEmployee(){

    document.getElementById("dashboardSection").style.display = "none";

    document.getElementById("employeeSection").style.display = "none";

    document.getElementById("addEmployeeSection").style.display = "block";

    document.getElementById("settingsSection").style.display = "none";

}

function showSettings(){

    document.getElementById("dashboardSection").style.display = "none";

    document.getElementById("employeeSection").style.display = "none";

    document.getElementById("addEmployeeSection").style.display = "none";

    document.getElementById("settingsSection").style.display = "block";

    document.getElementById("trashSection").style.display = "none";

}
function showTrash(){

    document.getElementById("dashboardSection").style.display = "none";

    document.getElementById("employeeSection").style.display = "none";

    document.getElementById("addEmployeeSection").style.display = "none";

    document.getElementById("settingsSection").style.display = "none";

    document.getElementById("trashSection").style.display = "block";

    loadTrashEmployees();

}
function editEmployee(id, name, email, department){

    document.getElementById("employeeSection").style.display = "none";

    document.getElementById("updateEmployeeSection").style.display = "block";

    document.getElementById("updateId").value = id;

    document.getElementById("updateName").value = name;

    document.getElementById("updateEmail").value = email;

    document.getElementById("updateDepartment").value = department;

}


async function addEmployee(){

    try{

        const employeeData = {

            name: document.getElementById("name").value,

            email: document.getElementById("email").value,

            department: document.getElementById("department").value

        };

        const response = await fetch("http://localhost:8087/employee/add", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employeeData)

        });

        console.log(response);

        if(response.ok){

            alert("Employee Added Successfully 😄");

            loadEmployees();

            showEmployees();

        }
        else{

            alert("Failed to Add Employee");

        }

    }
    catch(error){

        console.log(error);

        alert("Error Occurred");

    }

}
async function deleteEmployee(id){

    const response = await fetch(

        `http://localhost:8087/employee/delete/${id}`,

        {

            method: "DELETE"

        }

    );

    alert("Employee Deleted Successfully 😄");

    loadEmployees();
    

}
async function loadTrashEmployees(){

    const response = await fetch("http://localhost:8087/employee/trash");

    const employees = await response.json();

    let trashData = "";

    employees.forEach(employee => {

        trashData += `

        <tr>

            <td>${employee.id}</td>

            <td>${employee.name}</td>

            <td>${employee.email}</td>

            <td>${employee.department}</td>

            <td>

                <button onclick="restoreEmployee(${employee.id})">

                    Restore

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("trashTable").innerHTML = trashData;

}
async function updateEmployee(){

    const employeeData = {

        id: document.getElementById("updateId").value,

        name: document.getElementById("updateName").value,

        email: document.getElementById("updateEmail").value,

        department: document.getElementById("updateDepartment").value,

        status: "active"

    };

    const response = await fetch(

        "http://localhost:8087/employee/update",

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(employeeData)

        }

    );

    alert("Employee Updated Successfully 😄");

    document.getElementById("updateEmployeeSection").style.display = "none";

    loadEmployees();

    showEmployees();

}
async function restoreEmployee(id){

    const response = await fetch(

        `http://localhost:8087/employee/restore/${id}`,

        {

            method: "PUT"

        }

    );

    alert("Employee Restored Successfully 😄");

    loadTrashEmployees();

    loadEmployees();

}