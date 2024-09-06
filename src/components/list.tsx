import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { Table, Space, Spin } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import ArticleService from "../services/articles";
import { Report } from "../services/articles";
import { QuoteStatusTag } from "./listStatusTag";
import { DeleteButton, EditButton, List, ShowButton } from "@refinedev/antd";

export const ListPage: FC<PropsWithChildren> = ({ children }) => {
  const [detail, setDetail] = useState<Report | null>(null);
  const { id } = useParams();

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
    return <Spin spinning={true} />;
  }

  // Assuming `detail` is a single record, not an array of records.
  const dataSource = [
    {
      key: detail.id,
      reportNumber: 1, // Assuming report number is static or generated
      created: dayjs(detail.created).format("DD.MM.YYYY"),
      responsible: detail.responsible,
      status: detail.status,
    },
  ];
  console.log(detail);

  return (
    <div className="page-container">
      <h3>{detail._type}</h3>
      <List breadcrumb={false}>
        <Table
          dataSource={dataSource}
          rowKey="key"
          style={{ padding: "0.5rem" }}
        >
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
                <QuoteStatusTag status={status} />
              </div>
            )}
          />
          <Table.Column
            title="Actions"
            key="actions"
            render={(_, record) => (
              <Space style={{ padding: "0.5rem" }}>
                <ShowButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  style={{ backgroundColor: "transparent" }}
                />
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  style={{ backgroundColor: "transparent" }}
                />
                <DeleteButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  style={{ backgroundColor: "transparent" }}
                />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
