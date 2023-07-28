import { useEffect, useState, useMemo } from "react";
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

  const uniqueJabatan = useMemo(() => {
    return [...new Set(data.map((item) => item.jabatan))];
  }, [data]);
  const uniqueAlamat = useMemo(() => {
    return [...new Set(data.map((item) => item.alamat))];
  }, [data]);

  return (
    <div>
      <div className="flex justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by Name "
          className="border bg-white border-gray-300 rounded-md py-1 px-2 w-1/3"
          value={filters.nama}
          onChange={(e) => setFilters({ ...filters, nama: e.target.value })}
        />

        <select
          className="border  bg-white border-gray-300 rounded-md py-1  px-2 w-1/3"
          value={filters.alamat}
          onChange={(e) => setFilters({ ...filters, alamat: e.target.value })}
        >
          <option value="">All Alamat</option>
          {uniqueAlamat.map((alamat) => (
            <option key={alamat} value={alamat}>
              {alamat}
            </option>
          ))}
        </select>

        <select
          className="border  bg-white border-gray-300 rounded-md py-1 px-2 w-1/3"
          value={filters.jabatan}
          onChange={(e) => setFilters({ ...filters, jabatan: e.target.value })}
        >
          <option value="">All Jabatan</option>
          {uniqueJabatan.map((jabatan) => (
            <option key={jabatan} value={jabatan}>
              {jabatan}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 bg-white rounded-md py-1 px-2 w-1/3"
          value={filters.jenis_kelamin}
          onChange={(e) =>
            setFilters({ ...filters, jenis_kelamin: e.target.value })
          }
        >
          <option value="">All Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

      <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
