import style from "../card.module.css"
import defaultIcon from "../../../assets/foto.png"

const CardHeader = ({icon}:{icon?:string}) => {
  return (
    <div className={style.cardHeader}>
          <img src={icon??defaultIcon} />
    </div>
  )
}

export default CardHeader