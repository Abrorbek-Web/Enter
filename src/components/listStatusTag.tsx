import type { FC, ReactElement } from "react";

import {
  CheckCircleOutlined,
  ExpandOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

type QuoteStatus = "active" | "draft" | "sent";
const variant: Record<QuoteStatus, { color: string; icon: ReactElement }> = {
  draft: {
    color: "blue",
    icon: <ExpandOutlined />,
  },
  sent: {
    color: "cyan",
    icon: <SendOutlined />,
  },
  active: {
    color: "green",
    icon: <CheckCircleOutlined />,
  },
};

type Props = {
  status: QuoteStatus;
};

export const QuoteStatusTag: FC<Props> = ({ status }) => {
  return (
    <Tag
      style={{
        textTransform: "capitalize",
      }}
      color={variant[status].color}
      icon={variant[status].icon}
    >
      {status.toLowerCase()}
    </Tag>
  );
};
