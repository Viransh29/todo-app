document.addEventListener('DOMContentLoaded', () => {
    const todoInput  = document.getElementById("todo-input")
    const addTaskBtn  = document.getElementById("addtask-btn")
    const todoList  = document.getElementById("todo-list")

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => renderTask(task))

    addTaskBtn.addEventListener('click', () => {
        const taskText =  todoInput.value.trim()
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
    }
        tasks.push(newTask)
        saveTask();
        renderTask(newTask);
        todoInput.value = "" //clear task
        console.log(tasks);
    
})

    function renderTask(task) {
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id)
        if(task.completed) li.classList.add('completed')
            
        li.className = "flex items-center gap-6"
        
        li.innerHTML = `
        <div class="bg-gray-700 border-2 p-3 rounded-md flex-1 cursor-pointer ${task.completed ? 'line-through opacity-50' : ''}">
        ${task.text}
        </div>

        <button class="bg-red-600 hover:bg-red-700 px-4 py-1 h-8 rounded-md">
        Delete
        </button>
        `;

        const taskDiv = li.querySelector('div')

        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON') return
            task.completed = !task.completed
            taskDiv.classList.toggle('line-through')   
            saveTask()
        })

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation() //prevent toggle from firing
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTask()
        })
        todoList.appendChild(li)
}

    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks))
}   
})