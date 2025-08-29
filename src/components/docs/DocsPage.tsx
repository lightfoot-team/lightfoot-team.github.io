import { useDarkModeOn } from "../../hooks/useDarkModeOn";
import { useState } from "react";
import CodeBlock from "./CodeBlock";
import ReactMarkdown from "react-markdown";
import SDKOverviewContent from "../../assets/content/docs/01-sdk-overview";
import serverSDKContent from "../../assets/content/docs/02-server-sdk";
import clientSDKContent from "../../assets/content/docs/03-client-sdk";
export default function DocsPage() {
  const [SDKSelection, setSDKSelection] = useState('server')
  const darkModeOn = useDarkModeOn();
  const backgroundColor = darkModeOn ? ' bg-[#01233E]' : 'bg-amber-10';
  const textStyles = darkModeOn ? 'prose-invert' : '';
  const components: { [key: string]: React.ComponentType } = {
    code: CodeBlock,
  };
  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      <div className="pt-16 px-8 md:px-16 lg:px-24 xl:px-32 max-w-6xl mx-auto">
        <div className={`prose prose-lg max-w-none ${textStyles}`}>

          <ReactMarkdown components={components}>
            {SDKOverviewContent}
          </ReactMarkdown>
          <button className={'sdk-button'} onClick = {()=>setSDKSelection('server')}>Server SDK</button>
          <button className={'sdk-button'} onClick = {()=>setSDKSelection('client')}>Client SDK</button>
          {SDKSelection === 'server' &&
            <ReactMarkdown components={components}>
              {serverSDKContent}
            </ReactMarkdown>
          }
          {SDKSelection === 'client' &&
            <ReactMarkdown components={components}>
              {clientSDKContent}
            </ReactMarkdown>
          }
        </div>
      </div>
    </div>
  );
};
