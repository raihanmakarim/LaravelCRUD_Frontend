export interface Employee {
  id: number;
  nama: string;
  jabatan: string;
  jenis_kelamin: string;
  alamat: string;
}

export interface TableProps {
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

export interface FormData {
  nama: string;
  jabatan: string;
  jenis_kelamin: string;
  alamat: string;
}
