import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { Table, Space, Spin, Button, Modal, message } from "antd";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import ArticleService from "../services/articles";
import { Report } from "../services/articles";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const ListPage: FC<PropsWithChildren> = ({ children }) => {
  const [detail, setDetail] = useState<Report | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await ArticleService.getReportDetail(Number(id));
        setDetail(response);
      } catch (error) {
        console.error("Failed to fetch report detail:", error);
      }
    };
    getData();
  }, [id]);

  if (!detail) {
    return (
      <Spin
        spinning={true}
        className="w-full h-screen flex justify-center items-center"
      />
    );
  }
  console.log(detail);

  const dataSource = [
    {
      key: detail.id,
      reportNumber: 1, // Assuming report number is static or generated
      created: dayjs(detail.created).format("DD.MM.YYYY"),
      responsible: detail.responsible,
      status: detail.status,
    },
  ];

  // const handleDelete = (recordId: number) => {
  //   confirm({
  //     title: "Are you sure you want to delete this item?",
  //     icon: <ExclamationCircleOutlined />,
  //     onOk: async () => {
  //       try {
  //         // Assuming you have a delete service function
  //         await ArticleService.deleteReport(recordId);
  //         message.success("Record deleted successfully");
  //         navigate("/"); // Navigate to a different page or refresh the list
  //       } catch (error) {
  //         message.error("Failed to delete the record");
  //       }
  //     },
  //   });
  // };

  return (
    <div className="page-container">
      <h3>{detail._type}</h3>
      <Table dataSource={dataSource} rowKey="key" style={{ padding: "0.5rem" }}>
        <Table.Column
          title="Report №"
          dataIndex="reportNumber"
          key="reportNumber"
          render={(text) => <div style={{ padding: "1rem" }}>{text}</div>}
        />
        <Table.Column
          title="Created"
          dataIndex="created"
          key="created"
          render={(text) => <div style={{ padding: "1rem" }}>{text}</div>}
        />
        <Table.Column
          title="Responsible"
          dataIndex="responsible"
          key="responsible"
          render={(text) => <div style={{ padding: "1rem" }}>{text}</div>}
        />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => (
            <div style={{ padding: "1rem" }}>
              <span
                className={`tag ${
                  status === "approved"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {status}
              </span>
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
                icon={<FaEye />}
                // onClick={() => navigate(`/show/${record.key}`)}
              />
              <Button
                type="link"
                icon={<FaEdit />}
                // onClick={() => navigate(`/edit/${record.key}`)}
                className=""
              />
              <Button
                type="link"
                icon={<FaTrash />}
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
