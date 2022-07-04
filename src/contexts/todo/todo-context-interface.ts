import { TodoFeedback } from "./todo-feedback";
import { Todo } from "./todo.interface";

export interface TodoContextType {
    todo: Todo | null;
    setTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
    criarTodo: () => void;
    atualizarTodo: () =>void;
    feedBack: TodoFeedback | null;
    obterTodos: () => void;
    todos: Todo[] | null;
    todosIsLoading: boolean | null;
}