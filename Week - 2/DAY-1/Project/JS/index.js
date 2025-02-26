// const data_container = document.getElementById("data-container")
// const task_input = document.getElementById('taskInput')
// const task_submit = document.getElementById('taskSubmit')

// let toupdate = false
// let updatingId = null

// const handleSubmit = (event) => {
//     event.preventDefault()
//     const inputData = event.target[0].value
//     if (toupdate) {
//         updateTask(updatingId, inputData)
//     }
//     else {
//         createData(inputData)
//     }
//     renderData()
// }
// window.onload = () => {
//     renderData()
//     task_input.focus()
// }
// const resetInputField = () => {
//     task_input.value = ""
//     task_submit.value = "CLICK TO ADD"
// }

// const createData = (inputData) => {
//     const tasks = getLocalData()
//     let sampleObj = {
//         id: Math.floor(Math.random()*30),
//         task: inputData
//     }
//     tasks.push(sampleObj)
//     setLocalData(tasks)
// }
// const renderData = () => {//render data
//     data_container.innerHTML = ""
//     const tasks = getLocalData()
//     tasks.forEach((element) => {
//         const newElement = document.createElement('p')
//         newElement.innerText = element.task
//         const dltBtn = createNewElement('button', 'delete-btn', "DELETE", () => deleteTask(element.id))
//         const editBtn = createNewElement('button', 'edit-btn', "EDIT", () => editTask(element.id))
//         newElement.appendChild(editBtn)
//         newElement.appendChild(dltBtn)
//         data_container.appendChild(newElement)
//         resetInputField()
//     })
// }
// const createNewElement = (elementName, elementId, elementText, elementFunc) => {//create element
//     const newElement = document.createElement(elementName)
//     newElement.id = elementId
//     newElement.onclick = elementFunc
//     newElement.innerText = elementText
//     return newElement
// }
// const deleteTask = (deletingId) => {//delete task
//     if (confirm("DO You Want To Delete : ")) {
//         const tasks = getLocalData()
//         const updatedTasks = tasks.filter((element) => {
//             return element.id !== deletingId
//         })
//         setLocalData(updatedTasks)
//     }
// }
// const editTask = (editingId) => {//edit task
//     const tasks = getLocalData()
//     tasks.forEach((element) => {
//         if (element.id === editingId) {
//             task_input.value = element.task
//             task_submit.value = "UPDATE"
//             updatingId = editingId
//             toupdate = true
//         }
//     })
// }
// const updateTask = (editingId, updatedTask) => {//update
//     const tasks = getLocalData()
//     const taskIndex = tasks.findIndex((task) => task.id === editingId);
//     if (taskIndex !== -1 && updatedTask.trim() !== "") {
//         tasks[taskIndex].task = updatedTask;
//         setLocalData(tasks)
//         task_submit.value = "ADD"
//         updatingId = null
//         toupdate = false
//     }

// }
// const getLocalData = () => {
//     return JSON.parse(localStorage.getItem("tasks") || '[]')
// }
// const setLocalData = (newData) => {
//     localStorage.setItem("tasks", JSON.stringify(newData))
//     renderData()
// }





