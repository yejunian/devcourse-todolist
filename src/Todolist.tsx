import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import Clock from './Clock';
import Todo from './Todo';
import TodoModal from './TodoModal';
import './Todolist.css';

function Todolist() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chosenTodo, setChosenTodo] = useState<Todo | null>(null);

  const [todos, setTodos] = useState<Todo[]>([
    new Todo('일찍 일어나기'),
    new Todo('밥 먹기'),
    new Todo('공부하기'),
  ]);

  const title = 'TODO';

  const invertDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? new Todo(todo.title, !todo.done, todo) : todo
      )
    );
  };

  const handleNewSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const titleElem = event.currentTarget.elements.namedItem('new-todo');
    if (!(titleElem instanceof HTMLInputElement)) {
      return;
    }

    const title = titleElem.value.trim();
    if (!title) {
      return;
    }

    setTodos([...todos, new Todo(title, false)]);

    titleElem.value = '';
  };

  const openModal = (todo: Todo) => {
    setChosenTodo(todo);
    setModalOpen(true);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="todolist">
      <h1>{title}</h1>

      <form onSubmit={handleNewSubmit}>
        <Form.Control type="text" name="new-todo" placeholder="새로 할 일" />
        <Button type="submit" variant="primary">
          추가
        </Button>
      </form>

      <ul className="todo-item-container">
        {todos.map((todo) => (
          <li
            key={`${todo.id}`}
            className={todo.done ? 'todo-item done' : 'todo-item'}
          >
            <Form.Check
              checked={todo.done}
              onChange={() => invertDone(todo.id)}
            />
            <div className="todo-item-title" onClick={() => openModal(todo)}>
              {todo.title}
            </div>
            <Button
              type="button"
              variant="outline-danger"
              size="sm"
              onClick={() => removeTodo(todo.id)}
            >
              ×
            </Button>
          </li>
        ))}
      </ul>

      <Clock />

      <TodoModal
        show={modalOpen}
        todo={chosenTodo || Todo.empty}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default Todolist;
