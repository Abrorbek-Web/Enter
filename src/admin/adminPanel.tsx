import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import ArticleService, { User } from "../services/articles";

const AdminPanel: React.FC = () => {
  const [details, setDetails] = useState<User[]>([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Details",
      key: "details",
      render: (_: any, record: User) => (
        <Button
          type="primary"
          onClick={() => navigate(`/admin/details/${record.id}`)}
        >
          Detail
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ArticleService.getAdminDetails();
        setDetails(data);
      } catch (error) {
        console.error("Failed to fetch admin details:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-[2rem]">Admin Panel</h1>
      <Table
        dataSource={details}
        columns={columns}
        pagination={{ pageSize: 50 }}
        rowKey="id"
        bordered
      />
    </div>
  );
};

export { AdminPanel };
