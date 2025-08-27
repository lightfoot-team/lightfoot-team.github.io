//import TopNavBar from "./TopNavBar";
//import ContentsNavBar from "./case study/ContentsNavBar";
import { Outlet } from "react-router-dom";
//import CaseStudyLayout from "./case study/CaseStudyLayout";
import TopNavBar from "./TopNavBar";
function Layout() {
  return (
    <div 
    id='case-study' 
    className=" min-h-screen bg-gray-100 text-gray-900">

      <TopNavBar />

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;