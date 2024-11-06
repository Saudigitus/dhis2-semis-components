import style from "../card.module.css"

const CardBody = ({ title }: { title?: string }) => {
    return (
        <div className={style.cardStatistics}>
            <strong className={style.cardTitle}>{title??"[CardTile]"}</strong>
        </div>
    )
}

export default CardBody