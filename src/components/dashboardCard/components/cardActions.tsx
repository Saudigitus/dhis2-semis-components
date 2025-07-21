import style from "../card.module.css"
import { Action, PositionProps } from "../../../types/cards/cardDashboardProps";
import classNames from "classnames";
import { IconButton, Tooltip } from "@mui/material";


const CardActions = ({ actions, align }: { actions?: Action[], align: PositionProps }) => {

    const getActionsAlignment = () => {
        switch (align) {
            case "start": return "alignStart";
            case "center": return "alignCenter";
            case "end": return "alignEnd";
            default: return "alignStart"
        }
    }

    return (
        <div className={classNames(style.cardActions, style[getActionsAlignment()])}>
            {
                actions?.length === 0 ? <></> :
                    actions?.map((action) => (
                        <Tooltip title={action?.label ?? ""}>
                            <span>
                                <IconButton
                                    size="small"
                                    onClick={action?.onAction}
                                    disabled={action?.disabled}
                                >
                                    {action.icon ?? <></>}
                                </IconButton>
                            </span>
                        </Tooltip>
                    ))
            }
        </div>
    )
}

export default CardActions