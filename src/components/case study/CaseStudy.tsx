import Section from "./Section";
import { useDarkModeOn } from "../../hooks/useDarkModeOn";
import { useEffect } from "react";
interface SectionDetails {
  id: string;
  content: string;
  type?: string;
  images?: Array<string>
}
interface CaseStudyProps {
  sections: Array<SectionDetails>
  sideBarOpen: boolean
  onIntersect: (id: string) => void;
}
function CaseStudy(props: CaseStudyProps) {
  const { sections, sideBarOpen, onIntersect } = props;
  const darkModeOn = useDarkModeOn();
  const backgroundColor = darkModeOn ? ' bg-[#010928]' : 'bg-amber-10';

  useEffect(() => {
    const sectionElements = document.querySelectorAll(".cs-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px"} 
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (

    <main id='case-study-container' className={`${backgroundColor} flex-3 p-6 transition-all
    ${sideBarOpen ? "ml-60" : "ml-0"}
    md:ml-66 lg:mr-33
  `}>
      {sections.map((section) => {
        if (section.type === 'carousel') {
          const { id, content, type, images } = section;
          return (
            <div>
              <Section id={id} content={content} type={type} images={images}>
              </Section>
              {/* <br></br> */}
            </div>
          )
        }
        const { id, content } = section;

        return (
          <Section id={id} content={content}>
          </Section>
        )
      })}


    </main>

  )
}

export default CaseStudy