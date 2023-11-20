import whatsAppSvg from '../../assets/images/svgs/whatsapp.svg'
import style from './style.module.css'

function ShareOnWhatsApp({ link }) {

  const inviteText = `Your Friend is inviting you to play a game togather join here: ${import.meta.env.VITE_APP_DOMAIN + link}`

  return (
    <a title="invite" target="blank" className={`${style['whatsapp-button']}`} href={`https://api.whatsapp.com/send?text=${inviteText}`} > 
      <img height={45} src={whatsAppSvg}/>
      Invite Friend
    </a>
  )
}

export default ShareOnWhatsApp
