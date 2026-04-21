import styles from "./infoPage.module.css"
import { type InfoTypes } from '../../types/info/infoPageTypes'
import Text from '../text/Text'
import { Paper } from "@mui/material"

export default function InfoPage(props: InfoTypes) {
    const { sections, title, fontWeigth = 'bold', dataTest } = props

    return (
        <div className={styles.containerInit} data-test={dataTest}>
            <Paper elevation={1} className={styles.paperInit}>
                {title && <Text data-test="info-title" label={title} type='title' weight={fontWeigth} />}
                {
                    sections.map((section) => {
                        return (
                            <>
                                <span data-test="section-title">{section.sectionTitle}</span>
                                <ul data-test="section-instructions">
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

