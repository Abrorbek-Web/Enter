import { useEffect, useState } from "react";
import { Button, Form, Input, Table } from "antd";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import avatar from "../Assets/avatar.png";
import { Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import ArticleService, { User } from "../services/articles";
import { useParams } from "react-router-dom";

interface UserWork {
  id: number;
  document_number: string;
  start_time: string;
  end_time: string;
  created: string;
  difference_time: string;
  comment: string;
  status: string;
}

export function UserProfile() {
  const [status, setStatus] = useState<string>("active");
  const [user, setUser] = useState<User>();
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  console.log(typeof id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ArticleService.getUserDetailById(Number(id));
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch admin details:", error);
      }
    };

    fetchData();
  }, []);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleChange = (value: string) => {
    setStatus(value);
  };

  const handleOnSubmit = () => {
    console.log(password);
    onCloseModal();
    setPassword("");
  };

  return (
    <div className=" min-h-screen">
      {user && (
        <div className="w-full mx-auto mt-3 px-2">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="min-w-[440px] p-6 bg-gray-100 border border-gray-200 rounded-lg shadow ">
              <div className="text-center flex flex-col items-center justify-center">
                <img
                  src={avatar}
                  className="w-[120px] h-[120px] rounded-full border border-blue-500"
                  alt="User Avatar"
                />
                <p className="text-lg font-bold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-600 my-1 text-sm">{user.position}</p>
                <p className="text-gray-600 text-sm">Tashkent Uzbekistan</p>
                <div className="flex justify-center items-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={onOpenModal}
                    className="text-gray-900 h-[2rem] text-xs mt-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-1 me-2 mb-2"
                  >
                    Update Password
                  </button>
                </div>
              </div>
              <div className="w-full p-2 bg-white border border-gray-200 rounded-lg shadow text-sm">
                <div className="relative border-b py-2">
                  <p className="font-bold">Full Name</p>
                  <p className="absolute top-[7px] left-52 text-gray-600">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
                <div className="relative border-b py-2">
                  <p className="font-bold">Email</p>
                  <p className="absolute top-[7px] left-52 text-gray-600">
                    {user.email}
                  </p>
                </div>
                <div className="relative border-b py-2">
                  <p className="font-bold">Phone</p>
                  <p className="absolute top-[7px] left-52 text-gray-600">
                    {user.phone_number}
                  </p>
                </div>
                <div className="relative border-b py-2">
                  <p className="font-bold">Position</p>
                  <p className="absolute top-[7px] left-52 text-gray-600">
                    {user.position || "-"}
                  </p>
                </div>
              </div>
            </div>
            <Users />
          </div>
        </div>
      )}

      <Modal
        title="Password Update"
        open={open}
        onCancel={onCloseModal}
        footer={null}
      >
        <Form onFinish={handleOnSubmit}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password..."
              iconRender={(visible) =>
                visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
              }
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" disabled={!password}>
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

// Jadval uchun kolonkalarning interfeysi
const columns: ColumnsType<UserWork> = [
  { title: "ID", dataIndex: "id", key: "id", width: 60 },
  {
    title: "Document Number",
    dataIndex: "document_number",
    key: "document_number",
    width: 300,
  },
  {
    title: "Start Time",
    dataIndex: "start_time",
    key: "start_time",
    width: 160,
  },
  { title: "End Time", dataIndex: "end_time", key: "end_time", width: 160 },
  { title: "Created Date", dataIndex: "created", key: "created", width: 160 },
  { title: "Status", dataIndex: "status", key: "status", width: 130 },
];

const userWorks: UserWork[] = [
  {
    id: 1,
    document_number: "DOC123",
    start_time: "2023-09-14",
    end_time: "2023-09-14",
    created: "2023-09-14",
    difference_time: "2 hours",
    comment: "Completed task",
    status: "Active",
  },
];

// Foydalanuvchilar ro'yxati komponenti
const Users: React.FC = () => {
  return (
    <div className="mt-4 pb-8">
      <Table
        dataSource={userWorks}
        columns={columns}
        pagination={{
          defaultPageSize: 5,
          pageSizeOptions: [5, 10],
        }}
        scroll={{ y: 200 }}
        rowKey="id" // `key` sifatida `id` ni ishlatish
      />
    </div>
  );
};

export default Users;

// Qo'shimcha funksiya va komponentlar
function Status({ status }: { status: string }) {
  return <span>{status}</span>;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function formatTimeFromSeconds(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}
