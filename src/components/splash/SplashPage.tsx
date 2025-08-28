import Headline from "./Headline";
import Feature from "./Feature";
import { useDarkModeOn } from "../../hooks/useDarkModeOn";
import graphIcon from '../../assets/images/graph-icon.svg'
function SplashPage() {
  const darkModeOn = useDarkModeOn();
  const backgroundColor = darkModeOn 
    ? 'from-blue-800 to-black-950' 
    : 'from-amber-000 to-amber-500';

  return (
    <div id='splash' className="mt-12">
      <div
        className={`w-full rounded-2xl shadow-xl p-10 text-center bg-gradient-to-b ${backgroundColor}`}
      >
        <Headline />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <Feature
          imageSrc={'/logos/yellow-toggle.png'}
          headline="Safely and easily roll out features without redeploying"
        />
        <Feature
          imageSrc={graphIcon}//{'/logos/graph.png'}
          headline="Instantly see how new features impact performance and user experience"
        />
        <Feature
          imageSrc={'/logos/grafana.png'}
          headline="Observe the entire system with OpenTelemetry and integrated Grafana backends"
        />
      </div>
    </div>
  );
}


export default SplashPage