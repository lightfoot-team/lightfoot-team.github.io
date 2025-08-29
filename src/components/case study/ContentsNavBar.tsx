interface SectionDetails {
  id: string;
  label: string;
  content?: string;
  type?: string;
}
import SectionSubheadings from "./SectionSubheadings";
interface NavBarProps {
  open: boolean;
  onToggle: (open: boolean) => void;
  sections: Array<SectionDetails>;
  activeId: string;

}
function ContentsNavBar(props: NavBarProps) {
  const {open, onToggle, sections, activeId} = props;


  const tocItems = sections.map(section => {
    const { id, label } = section;
    const subHeadings = document.querySelectorAll(`#${id} h2`)
    return {
      id,
      label,
      subHeadings
    }
  }).filter(section=>!section.id.includes('ui-s'))
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => onToggle(false)}
        />
      )}
      <button
        className="expand-sidebar p-2 md:hidden fixed top-14 left-3 z-60 bg-white rounded shadow opacity-98"
        onClick={() => onToggle(true)}
      >
        {open ? 'X' : '☰'}
      </button>

      <aside
        id="contents-nav"
        className={`
      fixed top-12 h-screen w-65 bg-white shadow-lg
    z-50 
    transition-transform transform
    ${open ? "translate-x-0 w-100 open" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
        <nav className="p-3 space-y-2 overflow-y-auto h-full">
          {tocItems.map((item) => (
            <>
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`contents-nav-item block px-3 py-2 rounded-lg
                 hover:bg-gray-100 text-gray-700
                 ${activeId === item.id ? 'active-section-link': ''}
                 `}
            >
     
              {item.label}
            </a>
            <SectionSubheadings parentActive={item.id===activeId} subsections={item.subHeadings}></SectionSubheadings>
            </>
          ))}
        </nav>
      </aside>
    </>
  );
}



export default ContentsNavBar