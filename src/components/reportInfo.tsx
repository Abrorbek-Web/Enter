import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spin, Button, Modal } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import { Table } from "antd";

const fileTypes = ["XLSX"];

interface Document {
  name: string;
  status: string;
  code: string;
}

interface RootState {
  auth: {
    accessToken: string;
    refreshToken: string;
  };
}

const ReportInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [document, setDocument] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const fetchDocument = async () => {
  //     try {
  //       const response = await axios.get<Document>(`/api/project/${id}`);
  //       setDocument(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchDocument();
  // }, [id]);

  const handleChange = (file: File) => {
    setFile(file);
  };
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  // const handleSubmit = async () => {
  //   if (!file) {
  //     toast.error("Please select a file.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("project_id", id!);

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_KEY}/import/documents/`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log("File uploaded successfully:", response.data);
  //     toast.success("File uploaded successfully!");
  //   } catch (error: any) {
  //     if (error.response?.status === 400) {
  //       toast.error(error.response.data.detail);
  //     } else {
  //       toast.error("Error uploading file.");
  //     }
  //     console.error(error);
  //   }
  // };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button
        type="primary"
        className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600"
        onClick={openModal}
      >
        Information
      </Button>

      <Modal
        title={
          <h3 className="text-xl font-semibold text-gray-900">
            Report Info Name
            {/* <span className="text-base mx-1">(Excel file)</span> */}
          </h3>
        }
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={1000}
      >
        <Table dataSource={dataSource} columns={columns} />;
      </Modal>
    </>
  );
};

export { ReportInfo };
