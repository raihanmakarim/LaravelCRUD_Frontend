import React, { FC } from "react";
import { FormData } from "../types";
import Loader from "./Loader.tsx";
interface FormProps {
  loading: boolean;
  title: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: (data: FormData) => void;
}

const Form: FC<FormProps> = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  title,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="relative px-4 px-5 md:px-10">
      <h1 className="text-gray-800 text-xl my-3 font-bold tracking-normal leading-tight mb-4">
        {title}
      </h1>
      <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
        Nama
      </label>
      <input
        id="name"
        name="nama"
        className="mb-5 mt-2 bg-white text-black focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        placeholder="James"
        value={formData.nama}
        onChange={handleChange}
      />

      <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
        Jabatan
      </label>
      <input
        id="jabatan"
        name="jabatan"
        className="mb-5 mt-2 bg-white text-black focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        placeholder="Front End"
        value={formData.jabatan}
        onChange={handleChange}
      />

      <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
        Jenis Kelamin
      </label>
      <select
        id="jenis_kelamin"
        name="jenis_kelamin"
        className="mb-5 mt-2 bg-white text-black focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        value={formData.jenis_kelamin}
        onChange={handleChange}
      >
        <option value="">Select Jenis Kelamin</option>
        <option value="Laki-laki">Laki-laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>
      <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
        Alamat
      </label>
      <input
        id="alamat"
        name="alamat"
        className="mb-5 mt-2 bg-white text-black focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        placeholder="123 Main St"
        value={formData.alamat}
        onChange={handleChange}
      />

      <div className="flex items-center justify-center w-full">
        <button
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-blue-700 rounded text-white px-8 py-2 text-sm"
          onClick={() => handleSubmit(formData)}
          disabled={loading}
        >
          {loading ? <div className="loader" /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Form;
