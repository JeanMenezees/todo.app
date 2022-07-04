import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import React from "react";
import { AtualizarTodoDTO } from "./commands/atualizar-todo-dto";
import { CriarTodoDTO } from "./commands/criar-todo-dto";
import { TodoContextType } from "./todo-context-interface";
import { TodoFeedback } from "./todo-feedback";
import { Todo } from "./todo.interface";

export const TodoContext = React.createContext<TodoContextType | null>(null);

TodoContext.displayName = "Todo";

const TodoProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [todo, setTodo] = React.useState<Todo | null>(null);
  const [feedBack, setFeedback] = React.useState<TodoFeedback | null>(null);

  const [todos, setTodos] = React.useState<Todo[] | null>(null);
  const [todosIsLoading, setTodosIsLoading] = React.useState<boolean | null>(
    null
  );

  const criarTodo = async () => {
    if (todo) {
      const criarTodoDTO: CriarTodoDTO = {
        titulo: todo?.titulo,
        descricao: todo?.descricao
      };

      const token = await AsyncStorage.getItem("token");

      const configs: AxiosRequestConfig<any> = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      axios
        .post("http://192.168.1.5:3000/todo", criarTodoDTO, configs)
        .then(async (data) => {
          const todoCriado: Todo = data.data;

          await limparDados();

          setTodos(todos ? [...todos, todoCriado] : [todoCriado]);
        })
        .catch((error) => {
          setFeedback({ mensagem: "Ocorreu um erro ao criar o Todo" });

          setTimeout(() => {
            setFeedback(null);
          }, 5000);
        })
        .finally(() => {
          setFeedback({ mensagem: "Todo criado com sucesso!" });

          setTimeout(() => {
            setFeedback(null);
          }, 5000);
        });
    }
  };

  const atualizarTodo = async () => {
    const token = await AsyncStorage.getItem("token");

    const configs: AxiosRequestConfig<any> = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    if (todo) {
      const atualizarTodoDTO: AtualizarTodoDTO = {
        titulo: todo?.titulo,
        descricao: todo?.descricao,
        completo: todo.completo ? todo.completo : false
      };

      axios
        .put(
          `http://192.168.1.5:3000/todo/id/${todo.id}`,
          atualizarTodoDTO,
          configs
        )
        .then(async (data) => {
          await limparDados();
          setFeedback({ mensagem: "Todo alterado com sucesso!" });

          setTimeout(() => {
            setFeedback(null);
          }, 5000);
        })
        .catch((error) => {
          setFeedback({ mensagem: "Ocorreu um erro ao alterar o Todo" });

          setTimeout(() => {
            setFeedback(null);
          }, 5000);
        });
    }
  };

  const obterTodos = async () => {
    const token = await AsyncStorage.getItem("token");

    const configs: AxiosRequestConfig<any> = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    setTodosIsLoading(true);

    axios
      .get("http://192.168.1.5:3000/todo", configs)
      .then((data) => {
        const todosResposta: Todo[] = data.data;

        setTodos(todosResposta);
      })
      .catch((error) => {
        setFeedback({ mensagem: "Ocorreu um erro ao carregar os Todos" });

        setTimeout(() => {
          setFeedback(null);
        }, 5000);
      })
      .finally(() => {
        setTodosIsLoading(false);
      });
  };

  const limparDados = async () => {
    setTodo((todoAntigo) => {
      if (todoAntigo) {
        return { ...todoAntigo, titulo: "", descricao: "" };
      } else return null;
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        criarTodo,
        atualizarTodo,
        feedBack,
        obterTodos,
        todos,
        todosIsLoading
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
