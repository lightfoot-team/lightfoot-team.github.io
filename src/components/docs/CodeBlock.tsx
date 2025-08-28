import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
interface CodeBlockProps {
  className: string
  children: unknown
}
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
function CodeBlock(props: CodeBlockProps) {
  const { className, children } = props;
      const language = className ? className.replace('language-', '') : null;
      return (
        <SyntaxHighlighter language={language} style={vscDarkPlus}>
          {children}
        </SyntaxHighlighter>
      );
    };

export default CodeBlock
