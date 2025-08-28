
import './App.css'
import { Route, Routes } from "react-router-dom"
import { useDarkModeOn } from './hooks/useDarkModeOn';
import TopNavBar from './components/TopNavBar';
import OurTeam from './components/team/OurTeam';
import SplashPage from './components/splash/SplashPage';
import DocsPage from './components/docs/DocsPage';
import CaseStudyLayout from './components/case study/CaseStudyLayout';
export default function App() {
  const darkModeOn = useDarkModeOn(); 
  const backgroundColor = darkModeOn ? 'bg-[#010928]': 'bg-amber-10' // bg-[#01233E]

  return (
    <div className={`${backgroundColor}`}>
      <TopNavBar></TopNavBar>
      <Routes>
          <Route index element={<SplashPage></SplashPage>} />
          <Route path="our-team" element={<OurTeam></OurTeam>} />
          <Route path="docs" element={<DocsPage></DocsPage>} />
          <Route path="case-study" element={<CaseStudyLayout></CaseStudyLayout>}  />
      
      </Routes>
    </div>
  );
}
