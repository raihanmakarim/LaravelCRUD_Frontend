import React from "react";

interface TableProps {
  data: Array<{
    id: number;
    nama: string;
    jabatan: string;
    jenis_kelamin: string;
    alamat: string;
  }>;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data, onEdit, onDelete }) => {
  console.log("data table", data);
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Nama</th>
          <th className="border border-gray-300 px-4 py-2">Jabatan</th>
          <th className="border border-gray-300 px-4 py-2">Jenis Kelamin</th>
          <th className="border border-gray-300 px-4 py-2">Alamat</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="border border-gray-300 px-4 py-2">{item.id}</td>
            <td className="border border-gray-300 px-4 py-2">{item.nama}</td>
            <td className="border border-gray-300 px-4 py-2">{item.jabatan}</td>
            <td className="border border-gray-300 px-4 py-2">
              {item.jenis_kelamin}
            </td>
            <td className="border border-gray-300 px-4 py-2">{item.alamat}</td>
            <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => onEdit(item.id)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
