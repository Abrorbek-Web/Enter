import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Select as AntdSelect,
  Modal as AntdModal,
} from "antd";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import avatar from "../Assets/bg-img.png";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

// Helper function to format dates
const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${year}.${month}.${day}, ${hours}:${minutes} ${ampm}`;
};

const columns = [
  { field: "id", headerName: "ID", width: 60 },
  { field: "document_number", headerName: "Document Number", width: 300 },
  {
    field: "start_time",
    headerName: "Start Time",
    width: 160,
    renderCell: (params: any) => formatDate(params.value),
  },
  {
    field: "end_time",
    headerName: "End Time",
    width: 160,
    renderCell: (params: any) => formatDate(params.value),
  },
  {
    field: "created",
    headerName: "Created Date",
    width: 160,
    renderCell: (params: any) => formatDate(params.value),
  },
  {
    field: "difference_time",
    headerName: "Difference Time",
    width: 140,
  },
  { field: "comment", headerName: "Comment", width: 140 },
  { field: "status", headerName: "Status", width: 130 },
];

type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  position?: string;
  status: string;
};

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserType | null>(null);
  const [status, setStatus] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  useEffect(() => {
    setLoading(false); // Simulate data loading, replace with actual data fetching
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      (
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* User Info */}
          <div className="min-w-[340px] p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
              <img
                src={avatar}
                alt="Avatar"
                className="w-[120px] h-[120px] rounded-full border border-blue-500"
              />
              <p className="text-lg font-bold mt-4">FirstName LastName</p>
              <p className="text-sm text-gray-600">Position</p>
              <p className="text-sm text-gray-600">Tashkent, Uzbekistan</p>

              <div className="flex flex-col gap-4 mt-4">
                <AntdSelect
                  value={status}
                  onChange={handleStatusChange}
                  className="w-full"
                >
                  <AntdSelect.Option value="new">New</AntdSelect.Option>
                  <AntdSelect.Option value="active">Active</AntdSelect.Option>
                  <AntdSelect.Option value="disable">Disable</AntdSelect.Option>
                </AntdSelect>

                <Button
                  type="default"
                  onClick={() => setOpenModal(true)}
                  className="bg-white border-gray-300 hover:bg-gray-100"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="w-full p-6 bg-white rounded-lg shadow-lg">
            <div className="space-y-4">
              <div className="border-b py-2">
                <p className="font-bold">Full Name</p>
                <p className="text-gray-600">FirstName LastName</p>
              </div>
              <div className="border-b py-2">
                <p className="font-bold">Email</p>
                <p className="text-gray-600">Email</p>
              </div>
              <div className="border-b py-2">
                <p className="font-bold">Phone</p>
                <p className="text-gray-600">Phone</p>
              </div>
              <div className="border-b py-2">
                <p className="font-bold">Position</p>
                <p className="text-gray-600">Position</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Works */}
        <Users id={id!} />

        {/* Password Modal */}
        <AntdModal
          title="Update Password"
          visible={openModal}
          onCancel={() => setOpenModal(false)}
          footer={null}
        >
          <Form>
            <Form.Item label="New Password" required>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={isShowingPassword ? "text" : "password"}
                placeholder="Enter new password"
                iconRender={(visible) =>
                  visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                }
              />
            </Form.Item>
            <div className="text-center">
              <Button type="primary" htmlType="submit" disabled={!password}>
                Save
              </Button>
            </div>
          </Form>
        </AntdModal>
      </div>
      )
    </div>
  );
};

const Users: React.FC<{ id: string }> = ({ id }) => {
  const [rows, setRows] = useState<any[]>([]);

  return (
    <div className="mt-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Replace with your data grid component */}
        <div>Works table goes here</div>
      </div>
    </div>
  );
};

export { UserDetails };
