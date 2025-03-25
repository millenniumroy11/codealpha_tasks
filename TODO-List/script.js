let titleInput = document.getElementById("todo_title");
let descInput = document.getElementById("todo_desc");
let todoTable = document.querySelector("tbody"); 

function addTask() {
    let title = titleInput.value.trim();
    let desc = descInput.value.trim();

    if (title === "" || desc === "") {
        alert("Both Title and Description are required!");
        return;
    }

    let dateTime = new Date().toLocaleString();

    let newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td></td> <!-- Serial Number will be updated dynamically -->
        <td>${title}</td>
        <td>${desc}</td>
        <td>${dateTime}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteTask(this)">Delete</button></td>
    `;

    todoTable.appendChild(newRow);
    updateSerialNumbers(); 

    titleInput.value = "";
    descInput.value = "";
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
    updateSerialNumbers();
}

function updateSerialNumbers() {
    let rows = todoTable.querySelectorAll("tr");
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}
