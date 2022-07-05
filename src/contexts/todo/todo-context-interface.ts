import { AtualizarTodoDTO } from "./commands/atualizar-todo-dto";
import { CriarTodoDTO } from "./commands/criar-todo-dto";
import { Todo } from "./todo.interface";

export interface TodoContextType {
  criarTodo: (todo: CriarTodoDTO) => Promise<Todo | void>;
  atualizarTodo: (todo: AtualizarTodoDTO, id: number) => Promise<Todo | void>;
  obterTodos: () => void;
  todos: Todo[] | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>;
  todosIsLoading: boolean | null;
  todoParaAtualizar: Todo | null;
  setTodoParaAtualizar: React.Dispatch<React.SetStateAction<Todo | null>>;
}
