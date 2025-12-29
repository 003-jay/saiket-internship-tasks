// To-Do List App JavaScript

class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.editingId = null;

        // DOM Elements
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.taskCount = document.getElementById('taskCount');
        this.clearBtn = document.getElementById('clearBtn');
        this.filterButtons = document.querySelectorAll('.filter-btn');

        // Event Listeners
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        this.clearBtn.addEventListener('click', () => this.clearCompleted());
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Load tasks from localStorage
        this.loadTasks();
        this.render();
    }

    // Add a new task
    addTask() {
        const taskText = this.taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toLocaleString()
        };

        this.tasks.push(task);
        this.taskInput.value = '';
        this.taskInput.focus();

        this.saveTasks();
        this.render();
    }

    // Delete a task
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
            this.render();
        }
    }

    // Toggle task completion
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    // Edit a task
    editTask(id) {
        this.editingId = id;
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.render();
            const editInput = document.getElementById(`edit-input-${id}`);
            if (editInput) {
                editInput.focus();
                editInput.select();
            }
        }
    }

    // Save edited task
    saveEdit(id) {
        const editInput = document.getElementById(`edit-input-${id}`);
        const newText = editInput.value.trim();

        if (newText === '') {
            alert('Task cannot be empty!');
            return;
        }

        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.text = newText;
            this.editingId = null;
            this.saveTasks();
            this.render();
        }
    }

    // Cancel editing
    cancelEdit() {
        this.editingId = null;
        this.render();
    }

    // Clear completed tasks
    clearCompleted() {
        if (confirm('Delete all completed tasks?')) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveTasks();
            this.render();
        }
    }

    // Set filter
    setFilter(filter) {
        this.currentFilter = filter;
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    // Get filtered tasks
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    // Update task count
    updateTaskCount() {
        const activeTasks = this.tasks.filter(task => !task.completed).length;
        this.taskCount.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} remaining`;
    }

    // Render the task list
    render() {
        const filteredTasks = this.getFilteredTasks();
        this.taskList.innerHTML = '';

        if (filteredTasks.length === 0) {
            this.taskList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <div class="empty-state-text">
                        ${this.currentFilter === 'completed' ? 'No completed tasks yet!' : 
                          this.currentFilter === 'active' ? 'No active tasks. Great job! 🎉' : 
                          'No tasks yet. Add one to get started!'}
                    </div>
                </div>
            `;
        } else {
            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;

                if (this.editingId === task.id) {
                    // Edit mode
                    li.innerHTML = `
                        <input 
                            type="text" 
                            id="edit-input-${task.id}" 
                            class="edit-input" 
                            value="${this.escapeHtml(task.text)}"
                        >
                        <div class="task-actions">
                            <button class="save-btn">Save</button>
                            <button class="cancel-btn">Cancel</button>
                        </div>
                    `;

                    const saveBtn = li.querySelector('.save-btn');
                    const cancelBtn = li.querySelector('.cancel-btn');
                    const editInput = li.querySelector('.edit-input');

                    saveBtn.addEventListener('click', () => this.saveEdit(task.id));
                    cancelBtn.addEventListener('click', () => this.cancelEdit());
                    editInput.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') this.saveEdit(task.id);
                        if (e.key === 'Escape') this.cancelEdit();
                    });
                } else {
                    // Display mode
                    li.innerHTML = `
                        <input 
                            type="checkbox" 
                            class="checkbox" 
                            ${task.completed ? 'checked' : ''}
                        >
                        <span class="task-text">${this.escapeHtml(task.text)}</span>
                        <div class="task-actions">
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </div>
                    `;

                    const checkbox = li.querySelector('.checkbox');
                    const editBtn = li.querySelector('.edit-btn');
                    const deleteBtn = li.querySelector('.delete-btn');

                    checkbox.addEventListener('change', () => this.toggleTask(task.id));
                    editBtn.addEventListener('click', () => this.editTask(task.id));
                    deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
                }

                this.taskList.appendChild(li);
            });
        }

        this.updateTaskCount();
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    // Load tasks from localStorage
    loadTasks() {
        const saved = localStorage.getItem('todoTasks');
        if (saved) {
            try {
                this.tasks = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading tasks:', e);
                this.tasks = [];
            }
        }
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
