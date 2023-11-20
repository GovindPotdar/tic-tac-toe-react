import style from './style.module.css'

function Button({ handleClick, className, icon, iconHeight, text, isDisabled, title}) {
  return (
    <button title={title} className={`${style['game-button']} ${className}`} onClick={handleClick} disabled={isDisabled}> 
      {
        icon ? <img height={iconHeight} src={icon}/> : null
      } 
      {text}
    </button>
  )
}

export default Button
