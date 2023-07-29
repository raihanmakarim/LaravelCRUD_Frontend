import axios from "axios";
import process from "process";
import { Employee, FormData } from "../types";
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const storeDataByUrl = async (url: string) => {
  try {
    const response = await API.post(`store/url`, { url });
    return response.data;
  } catch (error) {
    throw new Error("Failed to store data");
  }
};

export const createEmployee = async (data: FormData) => {
  try {
    const response = await API.post<Employee>("/employees/create", data);
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

export const updateEmployee = async (id: number, data: FormData) => {
  try {
    const response = await API.post<Employee>(`/employees/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    const response = await API.delete(`/employees/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

export const getData = async (filters: {
  id?: number;
  nama?: string;
  jabatan?: string;
  jenis_kelamin?: string;
  alamat?: string;
}) => {
  try {
    const response = await API.get<Employee[]>("employees", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

export const getAlamat = async () => {
  try {
    const response = await API.get(`alamat`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

export const getJabatan = async () => {
  try {
    const response = await API.get(`jabatan`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
