interface MarkdownImageProps {
  src: string;
  // alt: string;
}
const markdownImage = (props: MarkdownImageProps) => {
  const { src} = props;
  
  const smallImages = [
    '/diagrams/2.1-flag-state.png',
    '/diagrams/2.3-span.png',
    '/diagrams/2.4-enriched.png'
  ];

  const isSmallImage = smallImages.some(path => src?.includes(path));
  const imageClassName = isSmallImage ? "small-image" : "";

  return (
    <div className='md-img-container place-items-center'>
      <img
        className={imageClassName}
        {...props}
      />
    </div>
  );
}

export default markdownImage;