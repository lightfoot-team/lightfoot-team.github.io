import ReactMarkdown from "react-markdown";
//import remarkGfm from "remark-gfm"; // Adds GitHub-flavored markdown (tables, strikethrough, etc.)
import Carousel from "./Carousel";
//import type { Components } from "react-markdown";
import markdownImage from "./MarkdownImage";
// import { type Components } from "react-markdown";
interface SectionProps {
  id: string,
  // name: string;
  content: string;
  type?: string;
  images?: Array<string>
}

// const components: Components = {
//   img: markdownImage as unknown as React.JSX.IntrinsicElements
// }
const components: { [key: string]: React.ComponentType } = {
  img: markdownImage,
};

function Section(props: SectionProps) {
  const { id, content } = props;

  if (props.type === 'carousel' && props.images) {
    return (
      <Carousel images={props.images}></Carousel>
    )
  } else {
    return (
      <section id={id} className="cs-section mb-12 mt-6">
        <div className="md prose prose-lg max-w-none">
          <ReactMarkdown components={components}>
            {content}
          </ReactMarkdown>
        </div>

      </section>
    )
  }
}
export default Section;