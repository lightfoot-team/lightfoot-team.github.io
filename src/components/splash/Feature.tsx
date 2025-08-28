interface FeatureProps {
  headline: string;
  imageSrc: string;
}
function Feature(props: FeatureProps) {
  const {headline, imageSrc} = props;
  return (
    <div className="feature p-10 flex flex-col items-center text-center">
      <img className='max-h-42 mb-1 p-2' src={imageSrc}></img>
      <h2 className=" font-medium max-w-85">
        {headline}
      </h2>

    </div>
  )
}

export default Feature