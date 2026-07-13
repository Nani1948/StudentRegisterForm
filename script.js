//HTML Elements
const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const nameInput = document.getElementById("name");
const studentIdInput = document.getElementById("studentId");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");
const submitButton = document.getElementById("submitButton");
const tableContainer = document.getElementById("tableContainer");


//Load student from local storage
let students = JSON.parse(localStorage.getItem("students")) || [];


//Editing
let editIndex = -1;
//Display records when page loads

displayStudents();

//Form submit
studentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const contact = contactInput.value.trim();
    const email = emailInput.value.trim();
    const studentId = studentIdInput.value.trim();

// Empty validation
if (!name || !studentId || !email || !contact) {
    alert("Please fill all fields.");
    return;
}
//Student ID 
const idPattern = /^[0-9]+$/;

if (!idPattern.test(studentId)) {
    alert("Student ID should contain only numbers.");
    return;
}
// Name validation
const namePattern = /^[A-Za-z ]+$/;

if (!namePattern.test(name)) {
    alert("Student name should contain only letters.");
    return;
}


    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Enter a valid email.");
        return;
    }

    // Contact validation
    const contactPattern = /^[0-9]{10,}$/;

    if (!contactPattern.test(contact)) {
        alert("Contact number should contain at least 10 digits.");
        return;
    }
    //student Object
    const student = {
        name,
        studentId,
        email,
        contact
    };
     //add or update 
    if (editIndex === -1) {
        // Add new student
        students.push(student);
    } else {
        // Update existing student
        students[editIndex] = student;
        editIndex = -1;
        submitButton.textContent = "Register Student";
    }

    saveStudents();
    displayStudents();
    studentForm.reset();
});

// Display Students
function displayStudents() {

    studentList.innerHTML = "";

    students.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        studentList.appendChild(row);

    });
    toggleScrollbar();
}
// Delete Student
function deleteStudent(index) {

    const confirmDelete = confirm("Are you sure you want to delete this student?");

    if (confirmDelete) {

        students.splice(index, 1);

        saveStudents();

        displayStudents();

        studentForm.reset();

        editIndex = -1;

        submitButton.textContent = "Register Student";
    }
    // Edit Student
    function editStudent(index) {

        const student = students[index];

        nameInput.value = student.name;
        studentIdInput.value = student.studentId;
        emailInput.value = student.email;
        contactInput.value = student.contact;

        editIndex = index;

        submitButton.textContent = "Update Student";
    }
    // Save to Local Storage
    function saveStudents() {

        localStorage.setItem("students", JSON.stringify(students));

    }
    

//  Vertical Scrollbar
function toggleScrollbar() {

    if (students.length > 5) {
        tableContainer.style.overflowY = "scroll";
    } else {
        tableContainer.style.overflowY = "hidden";
    }

}
}