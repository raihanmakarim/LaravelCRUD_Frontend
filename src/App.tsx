import { useEffect, useState, useMemo } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  storeDataByUrl,
  getData,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAlamat,
  getJabatan,
} from "./api/api.ts";
import Table from "./components/Table.tsx";
import Modal from "./components/Modal.tsx";
import Form from "./components/Form.tsx";
import { FormData, Employee } from "./types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState<Employee[]>([]);
  const [uniqueJabatan, setUniqueJabatan] = useState<string[]>([]);
  const [uniqueAlamat, setUniqueAlamat] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    nama: "",
    jabatan: "",
    jenis_kelamin: "",
    alamat: "",
  });
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    jabatan: "",
    jenis_kelamin: "",
    alamat: "",
  });

  const getTableData = () => {
    getData(filters).then((res) => {
      setData(res);
    });
  };

  const getUniqueJabatan = () => {
    getJabatan().then((res) => {
      setUniqueJabatan(res);
    });
  };

  const getUniqueAlamat = () => {
    getAlamat().then((res) => {
      setUniqueAlamat(res);
    });
  };

  useEffect(() => {
    getTableData();
    getUniqueJabatan();
    getUniqueAlamat();
  }, [filters]);

  const clearForm = () => {
    setFormData({
      nama: "",
      jabatan: "",
      jenis_kelamin: "",
      alamat: "",
    });
    setEditId(0);
    setUrl("");
  };

  const clearFilters = () => {
    setFilters({ nama: "", jabatan: "", jenis_kelamin: "", alamat: "" });
  };

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
    clearForm();
  };

  const handleEdit = (id: number) => {
    const employeeToEdit = data.find((employee) => employee.id === id);

    if (employeeToEdit) {
      setEditId(employeeToEdit.id);
      setFormData({
        nama: employeeToEdit.nama,
        jabatan: employeeToEdit.jabatan,
        jenis_kelamin: employeeToEdit.jenis_kelamin,
        alamat: employeeToEdit.alamat,
      });
    }

    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this employee?"
      );
      if (!confirmDelete) return;

      await deleteEmployee(id);
      toast.success("Employee deleted successfully");
      getTableData();
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error deleting employee");
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (editId === 0) {
        await createEmployee(formData);
      } else {
        await updateEmployee(editId, formData);
      }

      setIsLoading(false);
      toast.success("Employee data submitted successfully");
      getTableData();
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
      toast.error("Error submitting form");
    }
  };

  const handleSubmitURL = async () => {
    try {
      setIsLoading(true);
      await storeDataByUrl(url);
      setIsLoading(false);
      toast.success("Employee data stored successfully from URL");
      getTableData();
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

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
          className="border   bg-white border-gray-300 rounded-md py-1  px-2 w-1/3"
          value={filters.alamat}
          onChange={(e) => setFilters({ ...filters, alamat: e.target.value })}
        >
          <option value="">All Alamat</option>
          {uniqueAlamat?.map((alamat) => (
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
          {uniqueJabatan?.map((jabatan) => (
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
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => clearFilters()}
        >
          Clear
        </button>

        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => handleCloseModal()}
        >
          Tambah
        </button>
      </div>

      <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Form
          title={editId === 0 ? "Add Employee" : "Edit Employee"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={isLoading}
        />
        {editId === 0 && (
          <div className=" py-1 px-5 md:px-10">
            <div className="flex justify-center  ext-gray-800 font-bold tracking-normal leading-tight  relative">
              <div className="bg-white  w-8 h-8">or</div>
              <span className="line" />
            </div>

            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Url
            </label>
            <input
              id="url"
              name="url"
              className="mb-5 bg-white text-black mt-2  focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="https://"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-blue-700 rounded text-white px-8 py-2 text-sm"
              onClick={() => handleSubmitURL()}
            >
              {isLoading ? <div className="loader" /> : "Submit By URL"}
            </button>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default App;
