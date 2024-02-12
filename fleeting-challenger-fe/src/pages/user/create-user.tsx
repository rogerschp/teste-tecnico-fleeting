import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router"; // Importe useRouter corretamente
import { api } from "@/service/auth";
import { Input } from "@/components/input/Input";
import { Button } from "@/components/button/Button";

const schema = Yup.object().shape({
  name: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type form = Yup.InferType<typeof schema>;

const CreateUserPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<form>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: form) => {
    try {
      await schema.validate(data, { abortEarly: false });
      const response = await api.post("user/signup", data);
      if (response.status === 201) {
        router.push("/user/login");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error instanceof Yup.ValidationError) {
        const yupErrors: Record<string, string> = {};
        error.inner.forEach((e) => {
          if (e.path) {
            e.path = e.message;
          }
        });
        return yupErrors;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name")}
            id="name"
            type="text"
            name="name"
            required
            placeholder="Name"
            error=""
          ></Input>
          <Input
            {...register("email")}
            id="email-address"
            type="email"
            name="email"
            required
            placeholder="Email"
            autoComplete="email"
            error=""
          />
          <Input
            {...register("password")}
            id="password"
            type="password"
            name="password"
            required
            placeholder="Password"
            error=""
          />
          <div>
            <Button type="submit">Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
