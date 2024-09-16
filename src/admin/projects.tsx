import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { Table, Space, Button, Modal, message } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ArticleService, { Project } from "../services/articles";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { GrStatusGood } from "react-icons/gr";
import { VscCommentDraft } from "react-icons/vsc";
import { PiTelegramLogoLight } from "react-icons/pi";
import { EmptyPage } from "../components";

const { confirm } = Modal;

export const Projects: FC<PropsWithChildren> = ({ children }) => {
  const [detail, setDetail] = useState<Project[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await ArticleService.getProject();
        setDetail(response);
      } catch (error) {
        console.error("Failed to fetch project detail:", error);
      }
    };
    getData();
  }, []);

  const dataSource = detail
    ? detail.map((project) => ({
        key: project.id,
        reportNumber: project.id,
        created: dayjs(project.created).format("DD.MM.YYYY"),
        status: project.status,
        short_name: project.short_name,
        public_name: project.public_name,
        director: project.director,
      }))
    : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-300 text-green-500";
      case "draft":
        return "bg-blue-300 text-blue-500";
      case "sent":
        return "bg-blue-300 text-blue-600";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <GrStatusGood className="text-green-500" />;
      case "draft":
        return <VscCommentDraft className="text-blue-500" />;
      case "sent":
        return <PiTelegramLogoLight className="text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <h1 className="mb-4 text-[2rem]">Projects</h1>
      <Table
        dataSource={dataSource}
        rowKey={(record) => record.key}
        style={{ padding: "1rem" }}
        locale={{
          emptyText: <EmptyPage />,
        }}
      >
        <Table.Column
          title="Project Name"
          dataIndex="short_name"
          key="short_name"
          render={(text) => <div>{text}</div>}
        />
        {/* <Table.Column
          title="PublicName"
          dataIndex="public_name"
          key="public_name"
          render={(text) => <div>{text}</div>}
        /> */}
        <Table.Column
          title="Director"
          dataIndex="director"
          key="director"
          render={(text) => <div>{text}</div>}
        />

        <Table.Column
          title="Created"
          dataIndex="created"
          key="created"
          render={(text) => <div>{text}</div>}
        />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => (
            <div className="flex items-center">
              <div
                className={`tag flex ${getStatusColor(
                  status
                )} px-[1.2rem] py-1 rounded-md items-center`}
              >
                <div>{getStatusIcon(status)}</div>
                <div className="ml-1">{status}</div>
              </div>
            </div>
          )}
        />
        <Table.Column
          title="Actions"
          key="actions"
          render={(_, record) => (
            <Space style={{ padding: "0.5rem" }}>
              <Button
                type="link"
                icon={
                  <FaEye
                    color="#555"
                    className="text-[1rem] outline outline-offset-[0.5rem] outline-1 outline-slate-300"
                  />
                }
                onClick={() => navigate(`/detail/1`)}
              />
              <Button
                type="link"
                icon={
                  <FaEdit
                    color="#555"
                    className="text-[1rem] outline outline-offset-[0.5rem] outline-1 outline-slate-300"
                  />
                }
                // onClick={() => navigate(`/edit/${record.key}`)}
              />
              <Button
                type="link"
                icon={
                  <FaTrash className="text-[1rem] outline outline-offset-[0.5rem] outline-1 outline-red-300" />
                }
                // onClick={() => handleDelete(record.key)}
                danger
              />
            </Space>
          )}
        />
      </Table>
      {children}
    </div>
  );
};
