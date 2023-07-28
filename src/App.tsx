import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { storeDataByUrl, getData } from "./api/api.ts";
import Table from "./components/Table.tsx";
import { Employee } from "./types";

function App() {
  const [data, setData] = useState<Employee[]>([]);
  const [filters, setFilters] = useState({
    nama: "",
    jabatan: "",
    jenis_kelamin: "",
    alamat: "",
  });

  useEffect(() => {
    getData(filters).then((res) => {
      setData(res);
    });
  }, [filters]);

  const handleEdit = (id: number) => {
    console.log(id);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  return (
    <div>
      <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
