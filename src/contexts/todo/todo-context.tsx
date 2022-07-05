import axios from "axios";
import React from "react";
import useAuth from "../../common/hooks/auth/useAuth";
import useStorage from "../../common/hooks/storage/useStorage";
import { AtualizarTodoDTO } from "./commands/atualizar-todo-dto";
import { CriarTodoDTO } from "./commands/criar-todo-dto";
import { TodoContextType } from "./todo-context-interface";
import { Todo } from "./todo.interface";

export const TodoContext = React.createContext<TodoContextType | null>(null);

TodoContext.displayName = "Todo";

const TodoProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [todos, setTodos] = React.useState<Todo[] | null>(null);
  const [todosIsLoading, setTodosIsLoading] = React.useState<boolean | null>(
    null
  );

  const [todoParaAtualizar, setTodoParaAtualizar] = React.useState<Todo | null>(null);

  const criarTodo = async (todo: CriarTodoDTO): Promise<Todo | void> => {
    const token = await useStorage("token");
    let configs = {};

    if (token) {
      configs = useAuth(token);
    }

    return axios
      .post("http://192.168.1.5:3000/todo", todo, configs)
      .then((data) => {
        const todoCriado: Todo = data.data;

        return todoCriado;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const atualizarTodo = async (
    todo: AtualizarTodoDTO,
    id: number
  ): Promise<Todo | void> => {
    const token = await useStorage("token");
    let configs = {};

    if (token) {
      configs = useAuth(token);
    }

    return axios
      .put(`http://192.168.1.5:3000/todo/${id}`, todo, configs)
      .then((data) => {
        const todoAtualizado: Todo = data.data;

        return todoAtualizado;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const obterTodos = async (): Promise<void> => {
    setTodosIsLoading(true);

    const token = await useStorage("token");
    let configs = {};

    if (token) {
      configs = useAuth(token);
    }

    axios
      .get<Todo[]>("http://192.168.1.5:3000/todo", configs)
      .then((data) => {
        const todos: Todo[] = data.data;

        setTodos(todos);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTodosIsLoading(false);
      });
  };

  return (
    <TodoContext.Provider
      value={{
        criarTodo,
        atualizarTodo,
        obterTodos,
        todos,
        setTodos,
        todosIsLoading,
        todoParaAtualizar,
        setTodoParaAtualizar
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
