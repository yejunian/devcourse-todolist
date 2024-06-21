class Todo {
  private static _nextId: number = 0;
  private static _empty: Todo = new Todo('');
  private _id: number;
  private _title: string;
  private _done: boolean;

  constructor(title: string, done: boolean = false, from?: Todo) {
    if (from) {
      this._id = from.id;
    } else {
      this._id = Todo.nextId;
    }
    this._title = title;
    this._done = done;
  }

  static get empty() {
    return Todo._empty;
  }

  private static get nextId(): number {
    return this._nextId++;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get done(): boolean {
    return this._done;
  }
}

export default Todo;
