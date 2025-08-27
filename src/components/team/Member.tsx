import { useDarkModeOn } from "../../hooks/useDarkModeOn"
interface MemberProps {
  name: string,
  links: {
    linkedin: string,
    github: string,
    portfolio?: string
  },
  image: string
}
function Member(props: MemberProps) {
  const { name, links, image } = props;
    const darkModeOn = useDarkModeOn();
    const iconColorMode = darkModeOn ? 'Light' : 'Dark';
  return (
    <div className='team-member'>
      <img className='tm-image rounded-2xl max-w-9/12 h-auto' src={image}></img>
      <div className='tm-name p-1 align-middle'><h3>{name}</h3></div>
      <div className='tm-links'>
        <a href={links.linkedin}>
          <img className='max-w-10  aspect-square' src={`/logos/LinkedIn${iconColorMode}.png`}></img>
        </a>
        <a href={links.github}>
          <img className='max-w-10 aspect-square' src={`/logos/GitHub${iconColorMode}.png`}></img>
        </a>
      </div>
    </div>
  )
}

export default Member;