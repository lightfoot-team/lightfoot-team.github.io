
import { useDarkModeOn } from "../../hooks/useDarkModeOn";
import Member from "./Member";
export default function OurTeam() {
  const darkModeOn = useDarkModeOn();
  const backgroundColor = darkModeOn ? ' bg-[#01233E]' : 'bg-amber-10'

  return (
    <div className = {`float-start our-team ${backgroundColor}`}> 
    <h1 className=' font-semibold'>Our Team</h1>
    <div id='our-team-container' className='my-15 grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1'>
      <Member
        name={'Alex Johnson'}
        links={{ linkedin: 'https://www.linkedin.com/in/alexander-johnson-48b083159/', github: 'https://github.com/alexwjohnson964' }}
        image={'/team/alex-johnson.png'}>
      </Member>
      <Member
        name={'Allister Driscoll'}
        links={{ linkedin: 'https://www.linkedin.com/in/allister-driscoll-6a1666202/', github: 'https://github.com/allisterdrisc' }}
        image={'/team/allister-driscoll.png'}>
      </Member>
      <Member
        name={'Patrick Moran'}
        links={{ linkedin: 'https://www.linkedin.com/in/patrick-mayo-moran/', github: 'https://github.com/PatrickMayoMoran' }}
        image={'/team/patrick-moran.JPG'}>
      </Member>
      <Member
        name={'Scott Venkataraman'}
        links={{ linkedin: 'https://www.linkedin.com/in/scott-venkataraman-166bb5b/', github: 'https://github.com/ScottVenkataraman' }}
        image={'/team/scott-headshot.JPG'}>
      </Member>
    </div>
    </div>
  );
}
