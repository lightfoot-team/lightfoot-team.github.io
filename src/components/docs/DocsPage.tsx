import { useDarkModeOn } from "../../hooks/useDarkModeOn";
import ReactMarkdown from "react-markdown";
import docsContent from "../../assets/content/sections/09-docs";

export default function DocsPage() {
  const darkModeOn = useDarkModeOn();
  const backgroundColor = darkModeOn ? ' bg-[#01233E]' : 'bg-amber-10';
  const textStyles = darkModeOn ? 'prose-invert' : '';

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      <div className="pt-16 px-8 md:px-16 lg:px-24 xl:px-32 max-w-6xl mx-auto">
        <div className={`prose prose-lg max-w-none ${textStyles}`}>
          <ReactMarkdown>
            {docsContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
