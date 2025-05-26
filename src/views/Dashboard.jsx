import { useState } from "react"
import DashboardSidebar from "./components/DashboardSidebar";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full mx-24 my-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-md shadow-md p-6">Dasboard Item</div>
        <div className="bg-white rounded-md shadow-md p-6">Dasboard Item</div>
        <div className="bg-white rounded-md shadow-md p-6">Dasboard Item</div>
        <div className="bg-white rounded-md shadow-md p-6">Dasboard Item</div>
      </div>
    </div>
  )
}
