import React, { useState } from "react";
import { Tab, ReportTable, Modal } from "./";

const ReportPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHalfScreenOpen, setIsHalfScreenOpen] = useState(false);

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
        <nav className="text-sm text-gray-600">
          <ul className="flex space-x-2">
            <li>Home</li>
            <li>/</li>
            <li>Engineering Report</li>
            <li>/</li>
            <li className="font-semibold">Report №1 06.06.2024</li>
          </ul>
        </nav>
        <div className="flex items-center justify-between mt-4 mb-2">
          <h1 className="text-2xl font-bold">Report №1 06.06.2024</h1>
        </div>
        <button
          className="bg-blue-500 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={openModal}
        >
          + Add Report
        </button>
        <div className="flex mt-2 justify-between items-center">
          <Tab />
        </div>
        <ReportTable />
      </div>
      <div className="w-full">
        <button
          className="inline-block text-white bg-blue-500 p-2 rounded-lg ml-2"
          onClick={toggleHalfScreen}
        >
          Click
        </button>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />

      {/* Bottom Half-Screen Overlay */}
      {isHalfScreenOpen && (
        <div className="fixed bottom-0 right-6 w-[80%] h-1/2 bg-gray-700 bg-opacity-75 z-50 border-[1px]">
          <div className="relative h-full">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
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
