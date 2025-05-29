import style from "../card.module.css"
import { ContentLayoutProps, ContentProps } from "../../../types/cards/cardDashboardProps";
import classNames from "classnames";
import { IconButton, Tooltip } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const CardBody = ({ contents, contentLayout }: { contents?: ContentProps[], contentLayout?: ContentLayoutProps }) => {

    const getContentLayout = () => {
        switch (contentLayout) {
            case "column": return "layoutColum";
            case "grid": return "layoutGrid";
            default: return "layoutColum";
        }
    }

    return (
        <div className={classNames(style.cardStatistics, style[getContentLayout()])}>
            {
                (!contents || contents?.length === 0) ? <strong className={style.cardTitle}>{"[CardTile]"}</strong> :
                    contents?.map((content) => (
                        <div className={style.cardContent}>
                            <strong className={style.cardTitle}>{content?.label ?? "[CardTile]"}</strong>
                            <div className={style.cardStatisticsTotal}>
                                <span className={style.cardStatisticsTotalValue}>{content?.value}</span>
                                {content?.infoMsg ? <Tooltip title={content.infoMsg}>
                                    <IconButton size="small" className={style.cardInfoIcon}>
                                        <InfoOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip> : <></>}
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default CardBody