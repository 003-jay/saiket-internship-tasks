# To-Do List App

A simple, elegant web-based to-do list application for managing your daily tasks.

## 🔗 [View Live Demo](https://003-jay.github.io/saiket-internship-tasks/Task5/index.html)

## Features

- **Add Tasks**: Quickly add new tasks with the input field
- **Complete Tasks**: Mark tasks as completed by checking them off
- **Delete Tasks**: Remove tasks from your list
- **Filter Tasks**: View all tasks, only active tasks, or only completed tasks
- **Clear Completed**: Remove all completed tasks at once
- **Task Counter**: Keep track of how many tasks remain
- **Local Storage**: Your tasks are automatically saved and persisted in your browser
- **Keyboard Support**: Press Enter to add a task quickly
- **Responsive Design**: Works on desktop and mobile devices

## File Structure

```
Task5/
├── index.html       # Main HTML structure
├── script.js        # JavaScript functionality and logic
├── style.css        # Styling and animations
└── README.md        # This file
```

## Getting Started

1. Open `index.html` in your web browser
2. Type a task in the input field
3. Click "Add Task" or press Enter to add the task
4. Use the filter buttons to view different task statuses
5. Check off tasks to mark them as completed
6. Click "Clear Completed" to remove finished tasks

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with gradients, animations, and responsive design
- **JavaScript (ES6)**: Object-oriented programming with the TodoApp class

## How It Works

The app uses a `TodoApp` class to manage all functionality:

- **Local Storage**: Tasks are saved in your browser's local storage, so they persist between sessions
- **Dynamic Rendering**: The list updates automatically when tasks are added, completed, or deleted
- **Filter System**: Filter buttons dynamically show/hide tasks based on their status

## Browser Support

Works on all modern browsers that support:
- ES6 JavaScript
- Local Storage API
- CSS Grid and Flexbox

## License

Feel free to use and modify this project as needed.
