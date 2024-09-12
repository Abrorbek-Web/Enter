import React, { useEffect, useState } from "react";
import { Tab, ReportTable, Modal, AddReport, ReportInfo } from "./";
import ArticleService, { Detail } from "../services/articles";
import { useParams } from "react-router-dom";
import { Empty } from "antd";
import dayjs from "dayjs";

const ReportPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHalfScreenOpen, setIsHalfScreenOpen] = useState(false);
  const [detail, setDetail] = useState<Detail | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getDetail = async () => {
      try {
        const data = await ArticleService.getReportDetail(Number(id));
        setDetail(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
  }, []);
  console.log(detail);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleHalfScreen = () => {
    setIsHalfScreenOpen((prev) => !prev);
  };

  return (
    <section className="flex h-screen flex-col justify-between relative">
      <div className="container mx-auto p-4 flex-grow">
        <nav className="text-sm text-gray-600 flex justify-between">
          <ul className="flex space-x-2">
            <li>Home</li>
            <li>/</li>
            <li>Engineering Report</li>
            <li>/</li>
            <li className="font-semibold">
              Report №1 {dayjs(detail?.created).format("DD.MM.YYYY")}
            </li>
          </ul>
          <div className="inline-block mr-10">
            <ReportInfo />
          </div>
        </nav>
        <div className="flex items-center justify-between mt-4 mb-2">
          <h1 className="text-2xl font-bold">
            Report №1 {dayjs(detail?.created).format("DD.MM.YYYY")}
          </h1>
        </div>
        <AddReport />
        <div className="flex mt-2 justify-between items-center">
          <Tab />
        </div>
        {detail ? <ReportTable detail={detail} /> : <Empty />}
      </div>

      <button
        className="inline-block absolute right-2 top-3 text-white bg-blue-500 p-2 rounded-lg ml-2"
        onClick={toggleHalfScreen}
      >
        Click
      </button>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />

      {/* Bottom Half-Screen Overlay */}
      {isHalfScreenOpen && (
        <div className="fixed bottom-0 right-6 w-[80%] h-1/2 bg-gray-700 bg-opacity-75 z-50 border-[1px]">
          <div className="relative h-full">
            <button
              className="absolute top-4 right-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={toggleHalfScreen}
            >
              Close
            </button>
            <div className="p-4 bg-white h-full">
              <h2 className="text-xl font-bold mb-4">Half-Screen Content</h2>
              <p>This is a half-screen overlay starting from the bottom.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { ReportPage };
