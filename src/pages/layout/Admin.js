import React from "react"

// components
import AdminNavbar from "@templates/Navbars/AdminNavbar"
import Sidebar from "@templates/Sidebar/Sidebar"
import HeaderStats from "@templates/Headers/HeaderStats"
import FooterAdmin from "@templates/Footers/FooterAdmin"

export default function Admin(props) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -mt-28 md:pt-10 relative">
          <div className="min-h-screen">
            {props.children}
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  )
}
