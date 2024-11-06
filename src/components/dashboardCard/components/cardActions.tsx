import { IconButton, Tooltip } from "@material-ui/core"
import style from "../card.module.css"
import { Action, PositionProps } from "../../../types/cardDashboardProps";
import classNames from "classnames";


const CardActions = ({ actions, align }: { actions?: Action[], align: PositionProps }) => {
    return (
        <div className={classNames(style.cardActions, style[align])}>
            {
                actions?.length === 0 ? <></> :
                    actions?.map((action) => (
                        <Tooltip title={action?.label ?? ""}>
                            <IconButton onClick={action?.onAction} size="small">
                                {action.icon ?? <></>}
                            </IconButton>
                        </Tooltip>
                    ))
            }
        </div>
    )
}

export default CardActions