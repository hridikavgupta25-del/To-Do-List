    interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

class TodoApp {
  private todos: Todo[] = [];
  private listEl: HTMLUListElement;
  private formEl: HTMLFormElement;
  private inputEl: HTMLInputElement;

  constructor() {
    this.listEl = document.getElementById("todo-list") as HTMLUListElement;
    this.formEl = document.getElementById("todo-form") as HTMLFormElement;
    this.inputEl = document.getElementById("todo-input") as HTMLInputElement;

    this.formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addTodo(this.inputEl.value);
      this.inputEl.value = "";
    });

    this.render();
  }

  private addTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    this.todos.push(newTodo);
    this.render();
  }

  private toggleTodo(id: number) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.render();
  }

  private deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.render();
  }

  private render() {
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