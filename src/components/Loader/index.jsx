import loader from '../../assets/images/loader.png'
import loaderGif from '../../assets/images/loader.gif'

import style from './style.module.css'

function Loader({ height, className }) {
  return (
      // <img height={height} className={`${className} ${style['loader-img']}`} src={loader}/>
      <img height={height} className={`${className} ${style['loader-img']}`} src={loaderGif}/>
  )
}

export default Loader
