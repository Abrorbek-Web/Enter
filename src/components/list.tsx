import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { Table, Space, Button, Modal, message } from "antd";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import ArticleService from "../services/articles";
import { Report } from "../services/articles";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { GrStatusGood } from "react-icons/gr";
import { VscCommentDraft } from "react-icons/vsc";
import { PiTelegramLogoLight } from "react-icons/pi";
import { EmptyPage } from "./";

const { confirm } = Modal;

export const ListPage: FC<PropsWithChildren> = ({ children }) => {
  const [detail, setDetail] = useState<Report | null>(null);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await ArticleService.getReport(Number(id));
        setDetail(response);
      } catch (error) {
        console.error("Failed to fetch report detail:", error);
      }
    };
    getData();
  }, [id]);

  const dataSource = detail
    ? [
        {
          key: detail.id,
          reportNumber: 1, // Assuming report number is static or generated
          created: dayjs(detail.created).format("DD.MM.YYYY"),
          responsible: detail.responsible,
          status: detail.status,
        },
      ]
    : [];

  const getStatusColor = () => {
    switch (detail?.status) {
      case "active":
        return "bg-green-300 text-green-500";
      case "draft":
        return "bg-blue-300 text-blue-500";
      case "sent":
        return "bg-blue-300 text-blue-600";
      default:
        break;
    }
  };

  const getStatusIcon = () => {
    switch (detail?.status) {
      case "active":
        return <GrStatusGood className="text-green-500" />;
      case "draft":
        return <VscCommentDraft className="text-blue-500" />;
      case "sent":
        return <PiTelegramLogoLight className="text-blue-600" />;
      default:
        break;
    }
  };

  const getTypeHeader = () => {
    switch (detail?._type) {
      case "engineering":
        return "Engineering Progress Report & 6-Month Look-Ahead Forecast";
      case "procurement":
        return "Procurement Progress Report & Schedule";
      case "bulk":
        return "Bulk Material Procurement Progress Report & Look-Ahead Forecast";
      case "construction":
        return "Construction Progress Report & 6-Month Look-Ahead Forecast";
      case "subcontracts":
        return "Subcontracts Status Report";
      case "manpower":
        return " Manpower Status Report & 12-Month Look-Ahead Forecast";
      case "machinery":
        return "Machinery Status Report & 12-Month Look-Ahead Forecast";
      case "budget":
        return "Cost & Cash Outflow Forecast";
      default:
        break;
    }
  };

  return (
    <div className="page-container">
      <h1 className="text-[#040406] text-[1.7rem]">{getTypeHeader()}</h1>
      <Table
        dataSource={dataSource}
        rowKey="key"
        style={{ padding: "1rem" }}
        locale={{
          emptyText: <EmptyPage />,
        }}
      >
        <Table.Column
          title="Report №"
          dataIndex="reportNumber"
          key="reportNumber"
          render={(text) => <div>{text}</div>}
        />
        <Table.Column
          title="Created"
          dataIndex="created"
          key="created"
          render={(text) => <div>{text}</div>}
        />
        <Table.Column
          title="Responsible"
          dataIndex="responsible"
          key="responsible"
          render={(text) => <div>{text}</div>}
        />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => (
            <div className="flex items-center">
              <div
                className={`tag flex ${getStatusColor()} px-[1.2rem] py-1 rounded-md items-center`}
              >
                <div>{getStatusIcon()}</div>
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
