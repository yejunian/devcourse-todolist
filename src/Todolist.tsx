import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import Clock from './Clock';
import './Todolist.css';

// TODO: 나는 왜 클래스로 빼고 싶지... id 자동 증가가 하고 싶다... immutable...
type Todo = {
  id: number;
  title: string;
  done: boolean;
};

function Todolist() {
  const [nextId, setNextId] = useState(4);
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: '일찍 일어나기',
      done: false,
    },
    {
      id: 2,
      title: '밥먹기',
      done: false,
    },
    {
      id: 3,
      title: '공부하기',
      done: false,
    },
  ]);

  const title = 'TODO';

  const invertDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleNewSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const titleElem = event.currentTarget.elements.namedItem('new-todo');
    if (!(titleElem instanceof HTMLInputElement)) {
      return;
    }

    const value = titleElem.value.trim();
    if (!value) {
      return;
    }

    setTodos([...todos, { id: nextId, title: value, done: false }]);
    setNextId(nextId + 1);

    titleElem.value = '';
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
            <div className="todo-item-title">{todo.title}</div>
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
    </div>
  );
}

export default Todolist;
