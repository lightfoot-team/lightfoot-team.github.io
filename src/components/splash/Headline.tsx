import { Link } from "react-router-dom"
import { useDarkModeOn } from "../../hooks/useDarkModeOn"
import LightLogo from '../../assets/images/LF-full-light.svg';
import DarkLogo from '../../assets/images/LF-full-dark.svg';
function Headline() {
  const darkModeOn = useDarkModeOn();
  const logoSrc = darkModeOn
    ? LightLogo
    : DarkLogo;
  return (
    <div id='headline' className="p-1">
      <div className="grid grid-cols-1">
        <img id='main-logo' className=' max-h-70' src={logoSrc}></img>
        <h1 id='support-copy' className="font-light">
          Open source feature flag management with built-in, feature flag-enriched observability and data visualization
        </h1>
      </div>
      <Link to="/case-study" className="case-study-link flex justify-center">
        <button className="m-2">Learn More</button>
      </Link>
    </div>
  )
}

export default Headline