import axios from "axios";
import process from "process";
import { Employee } from "../types";
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
