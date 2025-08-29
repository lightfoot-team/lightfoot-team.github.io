import { useEffect, useState } from "react";
interface SubheadingProps {
  parentActive: boolean,
  subsections: NodeListOf<Element>,
  onToggle: (open: boolean) => void
}
function SectionSubheadings(props: SubheadingProps) {
  const { parentActive, subsections, onToggle } = props;
  const [activeSubsectionId, setActiveSubsectionId] = useState('')
  useEffect(() => {
    const sectionElements = document.querySelectorAll("h2");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSubsectionId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <div className='cs-subheading-container'>
      {Array.from(subsections).map((s: Element) => {
        const id = s.textContent.replace(/\s/g, '-');
        s.id = id;
        return (
          <>

            <a
              onClick={() => onToggle(false)}
              href={`#${id}`} id={`${id}-link`}
              className={`cs-subheading ${parentActive ? 'open' : 'closed'} ${activeSubsectionId === id && 'selected'}`}
            >
              {s.textContent}
            </a>
            {/* {parentActive && <br></br>} */}
          </>
        )
      })}
    </div>
  )
}

export default SectionSubheadings