import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { Textarea } from "@/components/textarea/Textarea";
import { api } from "@/service/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext"; // Importe o hook useAuth

type TodoFormData = {
  title: string;
  description: string;
};

const CreateTodoPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormData>();
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth(); // Use o hook useAuth para acessar o contexto de autenticação

  const onSubmit = async (data: TodoFormData) => {
    setSubmitting(true);
    try {
      const request = await api.post("todo", data);
      setSubmitting(false);
      router.push("./list-todo");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      setSubmitting(false);
    }
  };

  const navigateToTodoList = () => {
    router.push("./list-todo");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Criar Nova Tarefa
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Titulo"
              id="title"
              type="text"
              {...register("title", { required: "O título é obrigatório" })}
            ></Input>
          </div>
          <div>
            <Textarea
              label="Descrição"
              id="description"
              {...register("description")}
            ></Textarea>
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {submitting ? "Enviando..." : "Enviar"}
            </Button>

            <Button
              className="bg-red-500 text-white px-4 py-2 rounded-md mb-"
              onClick={navigateToTodoList}
            >
              Voltar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoPage;
