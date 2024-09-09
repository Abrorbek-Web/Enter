import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Progress",
    // children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Key Dates",
    // children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Resources",
    // children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "Critical Path/Longest Path Items",
    // children: "Content of Tab Pane 3",
  },
  {
    key: "5",
    label: "Next Week's Top 5 Key Deliverables / Achievements",
    // children: "Content of Tab Pane 3",
  },
  {
    key: "6",
    label: "Top 5 Challenges and Concerns",
    // children: "Content of Tab Pane 3",
  },
  // {
  //   key: "7",
  //   label: "Tab 3",
  //   // children: "Content of Tab Pane 3",
  // },
  // {
  //   key: "3",
  //   label: "Tab 3",
  //   // children: "Content of Tab Pane 3",
  // },
];

const Tab: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);

export { Tab };
// const tabs = [
//   "Progress",
//   "Key Dates",
//   "Resources",
//   "Critical Path/Longest Path Items",
//   "Next Week's Top 5 Key Deliverables / Achievements",
//   "Top 5 Challenges and Concerns",
// ];
