import { Box, Card } from "@dhis2/ui"
import style from "./card.module.css"
import classNames from "classnames"
import CardHeader from "./components/cardHeader"
import { Divider } from "@material-ui/core"
import CardBody from "./components/cardBody"
import CardActions from "./components/cardActions"
import { CardDashboardProps } from "../../types/cardDashboardProps"

/** A friendly dashboard simple card with icon, title and actions*/
const DashboardCard = ({ title, icon, actions, alignActions }: CardDashboardProps) => {
  return (
    <Box className={style.dinamicBox}>
      <Card className={classNames(style.cardContainer)}>
        <CardHeader icon={icon} />
        <Divider />
        <CardBody title={title} />
        {(!actions || actions?.length > 0) && <Divider />}
        <CardActions actions={actions} align={alignActions ?? "alignEnd"} />
      </Card>
    </Box>
  )
}

export default DashboardCard