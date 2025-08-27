import { Link } from "react-router-dom"
import { useDarkModeOn } from "../hooks/useDarkModeOn";

function TopNavBar() {
    const darkModeOn = useDarkModeOn();
    const iconColorMode = darkModeOn ? 'Light' : 'Dark';
  return (
    <nav id="top-nav" className="fixed top-0 w-full bg-blue-300 text-white shadow mb-6 z-60">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex space-x-6 items-center">
          <Link to="/">
            <img className='max-w-10 ' src='/logos/LightFoot.png'></img>
          </Link>
          <Link to="/case-study" className="hover:text-yellow-400 font-medium">
            Case Study
          </Link>
          <Link to="/our-team" className="hover:text-yellow-400 font-medium">
            Our Team
          </Link>
        </div>
        <Link to="https://github.com/lightfoot-team" className="hover:text-yellow-400 font-medium">
          <img className='max-w-6 ' src={`/logos/GitHub${iconColorMode}.png`}></img>
        </Link>
      </div>
    </nav>
  );
}

export default TopNavBar