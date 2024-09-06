import React, { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

// Define the props type for Layout
interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header at the top */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
