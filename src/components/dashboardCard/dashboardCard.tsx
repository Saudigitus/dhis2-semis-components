import { Box, Card, Divider } from "@dhis2/ui"
import style from "./card.module.css"
import classNames from "classnames"
import CardHeader from "./components/cardHeader"
import CardBody from "./components/cardBody"
import CardActions from "./components/cardActions"
import { CardDashboardProps } from "../../types/cards/cardDashboardProps"

/** A friendly dashboard simple card with icon, title and actions*/
const DashboardCard = ({ icon, actions, alignActions, size, contents }: CardDashboardProps) => {

  const getCardSize = () => {
    switch (size) {
      case "small": return "cardSamll";
      case "medium": return "cardMedium";
      case "large": return "cardLarge";
      default: return "small";
    }
  }

  return (
    <Box className={classNames(style.dinamicBox, style[getCardSize()])}>
      <Card className={classNames(style.cardContainer)}>
        <CardHeader icon={icon} />
        <Divider className={style.customDivider}/>
        <CardBody contents={contents} />
        {(!actions || actions?.length > 0) && <Divider className={style.customDivider} />}
        <CardActions actions={actions} align={alignActions ?? "end"} />
      </Card>
    </Box>
  )
}

export default DashboardCard