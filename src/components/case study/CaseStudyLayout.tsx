// import { Section } from "lucide-react";
import { useState } from "react";
//import { Menu, X } from "lucide-react";
import sections from "../../assets/content/allSections";
import CaseStudy from "./CaseStudy";
import ContentsNavBar from "./ContentsNavBar";

function CaseStudyLayout() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const tocItems = sections.map(section => {
    const { id, label } = section
    return {
      id,
      label,
    }
  })

  return (
    <div id="cs-grid-container" className="">
      <ContentsNavBar onToggle={()=>setOpen(!open)} sections={tocItems} open={open} activeId={activeId}></ContentsNavBar>

      <CaseStudy sections={sections} sideBarOpen={open} onIntersect={setActiveId}></CaseStudy>
    </div>
  );
}



export default CaseStudyLayout