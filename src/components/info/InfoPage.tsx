import styles from "./infoPage.module.css"
import { type InfoTypes } from '../../types/info/infoPageTypes'
import Text from '../text/Text'
import { Paper } from "@mui/material"
import { generateFile } from "../bulk/bulkExport/dataExporter/fileGenerator"

export default function InfoPage(props: InfoTypes) {
    const { sections, title, fontWeigth = 'bold' } = props
    // const { excelGenerator } = generateFile()

    return (
        <div className={styles.containerInit}>
            {/* <button onClick={() => {
                excelGenerator({
                    headers: [{
                        name: "Enrollment Report",
                        headers: [
                            {
                                header: 'Ref',
                                key: 'dataElement.stage',
                                width: 20,
                            },
                            {
                                header: 'School',
                                key: 'school',
                                width: 20,
                            },
                            {
                                header: 'Enrollment_Date',
                                key: 'enrollmentDate',
                                width: 20
                            },
                                 {
                                header: 'Sei la',
                                key: 'dataElement.otherStage',
                                width: 20
                            }
                        ],
                    }],
                    rows: [
                        {
                            "dataElement.stage.eventId": "123456",
                            "dataElement.otherStage.secondEventId": "123456",
                            school: "School 1",
                            enrollmentDate: "2023-01-01",
                            id: "123456",
                        }
                    ],
                    fileName: 'usuarios',
                    filters: [],
                    module: 'enrollment',
                    empty: false,
                    defaultLockedHeaders: [],
                })
            }} >
                Testa bulk
            </button> */}
            <Paper elevation={1} className={styles.paperInit}>
                {title && <Text label={title} type='title' weight={fontWeigth} />}
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

