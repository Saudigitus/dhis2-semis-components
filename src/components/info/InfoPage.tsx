import { Paper } from '@material-ui/core'
import styles from "./infoPage.module.css"
import { type InfoTypes } from '../../types/info/infoPageTypes'

export default function InfoPage(props: InfoTypes) {
    const { sections, title } = props

    return (
        <div className={styles.containerInit}>
            <Paper elevation={1} className={styles.paperInit}>
                {title && <h2>{title}</h2>}
                {
                    sections.map((section) => {
                        return (
                            <>
                                <span>{section.sectionTitle}</span>
                                <ul>
                                    {
                                        section.instructions.map((instruction) => <li className={styles.paperOtherText}>{instruction}</li>)
                                    }
                                </ul>
                            </>
                        )
                    })
                }
            </Paper>
        </div>
    )
}

