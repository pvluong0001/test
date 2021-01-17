import React from "react"

// components
import AdminNavbar from "@templates/Navbars/AdminNavbar"
import Sidebar from "@templates/Sidebar/Sidebar"
import HeaderStats from "@templates/Headers/HeaderStats"
import FooterAdmin from "@templates/Footers/FooterAdmin"
import {Route, Switch} from 'react-router-dom';
import Dashboard from '@pages/admin/Dashboard';
import Project from '@pages/admin/project/Project';
import ProjectDetail from '@pages/admin/project/ProjectDetail';
import Scenario from '@pages/admin/scenario/Scenario';
import CreateScenario from '@pages/admin/scenario/CreateScenario';

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -mt-28 md:pt-10 relative">
          <div className="min-h-screen">
            <Switch>
              <Route path="/admin/project" exact component={Project}/>
              <Route path="/admin/project/:id" exact component={ProjectDetail}/>

              <Route path="/admin/scenario" exact component={Scenario}/>
              <Route path="/admin/scenario/create" exact component={CreateScenario}/>

              <Route path="/admin" component={Dashboard}/>
            </Switch>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  )
}
