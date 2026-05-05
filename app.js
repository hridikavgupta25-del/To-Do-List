"use strict";
class TodoApp {
    todos = [];
    listEl;
    formEl;
    inputEl;
    constructor() {
        this.listEl = document.getElementById("todo-list");
        this.formEl = document.getElementById("todo-form");
        this.inputEl = document.getElementById("todo-input");
        this.formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            this.addTodo(this.inputEl.value);
            this.inputEl.value = "";
        });
        this.render();
    }
    addTodo(text) {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
        };
        this.todos.push(newTodo);
        this.render();
    }
    toggleTodo(id) {
        this.todos = this.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        this.render();
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.render();
    }
    render() {
        this.listEl.innerHTML = "";
        this.todos.forEach(todo => {
            const li = document.createElement("li");
            const span = document.createElement("span");
            span.textContent = todo.text;
            span.className = todo.completed ? "completed" : "";
            span.onclick = () => this.toggleTodo(todo.id);
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.onclick = () => this.deleteTodo(todo.id);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            this.listEl.appendChild(li);
        });
    }
}
new TodoApp();
