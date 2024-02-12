import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/service/auth";
import { useRouter } from "next/router";
import { Input } from "@/components/input/Input";
import { Select } from "@/components/select/Select";
import { Button } from "@/components/button/Button";
import { Table } from "@/components/table/Table";
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

type Props = {
  tableData: Response[];
  totalItems: number;
  pageSize: number;
  pageNumber: number;
  searchTerm: string;
  statusFilter: string;
  descriptionTerm: string;
};

const Todos = () => {
  const router = useRouter();
  const [tableData, setTableState] = useState<Props>({
    tableData: [],
    totalItems: 0,
    pageSize: 10,
    pageNumber: 1,
    searchTerm: "",
    statusFilter: "",
    descriptionTerm: "",
  });
  const { register } = useForm<TodoFormData>();
  const params = {
    skip: tableData.pageNumber,
    limit: tableData.pageSize,
    title: tableData.searchTerm,
    status: tableData.statusFilter,
    description: tableData.descriptionTerm,
  };
  const { user, logout } = useAuth();

  const fetchTableData = async () => {
    try {
      const response = await api.get(`todo/filter`, { params });
      setTableState((oldState) => ({
        ...oldState,
        tableData: response.data,
        totalItems: response.headers["x-total-count"],
      }));
    } catch (error) {
      console.error("Erro ao buscar dados da tabela:", error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [
    tableData.pageNumber,
    tableData.pageSize,
    tableData.searchTerm,
    tableData.statusFilter,
    tableData.descriptionTerm,
  ]);

  const handlePageChange = (newPage: number) => {
    setTableState((oldState) => ({
      ...oldState,
      pageNumber: newPage,
    }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setTableState((oldState) => ({
      ...oldState,
      pageSize: newPageSize,
    }));
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableState((oldState) => ({
      ...oldState,
      searchTerm: e.target.value,
    }));
  };
  const handleDescriptionTermChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTableState((oldState) => ({
      ...oldState,
      descriptionTerm: e.target.value,
    }));
  };

  const handleStatusFilterChange = (status: string) => {
    setTableState((oldState) => ({
      ...oldState,
      statusFilter: status,
    }));
  };

  const navigateToEditTodo = (id: string) => {
    router.push(`/todo/${id}`);
  };

  const navigateToCreateTodo = () => {
    router.push("./create-todo");
  };

  const navigateToLogin = () => {
    logout();
  };

  const tableComponent = tableData.tableData.map((item) => ({
    ...item,
    button: (
      <Button
        className="text-blue-500"
        onClick={() => navigateToEditTodo(item.id)}
      >
        Editar
      </Button>
    ),
  }));

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <div className="flex justify-between">
            <div className="px-2 py-4">
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded-md mb-"
                onClick={() => navigateToLogin()}
              >
                Logout
              </Button>
            </div>
            <form className="inline-flex items-center px-4 py-1 space-x-4">
              <Input
                {...register("title")}
                name="Pesquisar por Titulo"
                type="text"
                placeholder="Pesquisar por titulo"
                value={tableData.searchTerm}
                onChange={handleSearchTermChange}
                className="bg-light-50 border border-light-300 text-light-900 text-sm rounded-lg focus:ring-light-500 focus:border-light-500 block w-full p-2.5 light:bg-light-700 dark:border-light-600 light:placeholder-light-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />
              <Input
                {...register("description")}
                name="Pesquisar por descricao"
                type="text"
                placeholder="Pesquisar por descricao"
                value={tableData.descriptionTerm}
                onChange={handleDescriptionTermChange}
                className="bg-light-50 border border-light-300 text-light-900 text-sm rounded-lg focus:ring-light-500 focus:border-light-500 block w-full p-2.5 light:bg-light-700 dark:border-light-600 light:placeholder-light-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />
              <Select
                {...register("status")}
                name="status"
                value={tableData.statusFilter}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
                status={[
                  { value: "to-do", text: "Todo" },
                  { value: "doing", text: "Doing" },
                  { value: "done", text: "Done" },
                ]}
              />
            </form>
          </div>
          <Table tableData={tableComponent}></Table>
          <div className="flex justify-between items-center space-x-5 py-4 px-4 ">
            <div className="flex gap-5 items-center">
              <span className="ml-5 mb-8">
                Mostrando {tableData.tableData.length} resultados
              </span>
              <Select
                name="Paginacao"
                value={tableData.pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                status={[
                  { value: 10, text: "10 por página" },
                  { value: 25, text: "25 por página" },
                  { value: 50, text: "50 por página" },
                ]}
              ></Select>
            </div>
            <div className="flex justify-between items-center px-4 mb-6">
              <Button
                disabled={tableData.pageNumber === 1}
                onClick={() => handlePageChange(tableData.pageNumber - 1)}
              >
                Anterior
              </Button>
              <Button
                onClick={() => handlePageChange(tableData.pageNumber + 1)}
              >
                Proximo
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => navigateToCreateTodo()}
              >
                Criar To-Do
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
