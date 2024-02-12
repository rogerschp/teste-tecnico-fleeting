import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/service/auth";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type FormValues = Yup.InferType<typeof schema>;

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      await schema.validate(data, { abortEarly: false });
      const response = await api.post("auth/login", data);
      if (response.status === 200) {
        login(response.data);
        router.push("../todo/list-todo");
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

  const navigateToUserCreate = () => {
    router.push("./create-user");
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
          <div className="flex justify-between mb-4">
            <Button type="submit">Sign In</Button>
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded-md mb-"
              onClick={() => navigateToUserCreate()}
            >
              {" "}
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
