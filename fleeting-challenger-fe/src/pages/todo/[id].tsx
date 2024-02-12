import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/service/auth";
import { useRouter } from "next/router";
import { Input } from "@/components/input/Input";
import { Select } from "@/components/select/Select";
import { Button } from "@/components/button/Button";
import { Textarea } from "@/components/textarea/Textarea";
import { useAuth } from "@/contexts/AuthContext";

type Response = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: string;
};

type TodoFormData = {
  title: string;
  description: string;
  status: string;
};

const EditTodo = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<Response | null>(null);
  const { register, handleSubmit, setValue } = useForm<TodoFormData>();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await api.get(`/todo/${id}`);
        setTodo(response.data);
        setValue("title", response.data.title);
        setValue("description", response.data.description);
        setValue("status", response.data.status);
      } catch (error) {
        console.error("Erro ao buscar o todo:", error);
      }
    };

    if (id) {
      fetchTodo();
    }
  }, [id, setValue]);

  const onSubmit = async (data: TodoFormData) => {
    try {
      console.log(data);
      const response = await api.patch(`/todo/${id}`, data);
      router.push("./list-todo");
    } catch (error) {
      console.error("Erro ao atualizar o todo:", error);
    }
  };

  if (!todo) {
    return <div>Carregando...</div>;
  }

  const navigateToTodoList = () => {
    router.push("./list-todo");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Editar To-do
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("title")}
            name="title"
            type="text"
            label="Titulo"
          />
          <Textarea
            {...register("description")}
            name="description"
            label="Descrição"
          />
          <Select
            {...register("status")}
            name="status"
            label="Status"
            status={[
              { value: "to-do", text: "Todo" },
              { value: "doing", text: "Doing" },
              { value: "done", text: "Done" },
            ]}
          />
          <div className="flex justify-between mb-4">
            <Button type="submit">Atualizar</Button>
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => navigateToTodoList()}
            >
              Voltar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
