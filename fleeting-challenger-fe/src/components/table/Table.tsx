import { ReactNode } from "react";

type Props = {
  label?: string;
  error?: string;
  tableData: {
    id: string;
    title: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    user: string;
    button: ReactNode;
  }[];
};

export const Table = ({ tableData }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Título
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Criado em
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Alterado em
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuário
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.created_at}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.updated_at}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.user}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.button}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
