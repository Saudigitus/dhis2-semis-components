import React from "react";
import { Button, IconAddCircle16 } from "@dhis2/ui";
import styles from "./enrollmentDetails.module.css";
import { useEnrollmentsHeader } from "../../../utils/table/useEnrollmentsHeader";
import { useGetSectionTypeLabel } from "dhis2-semis-functions";

function EnrollmentDetailsComponent(props: any): React.ReactElement {
  const { enrollmentsData, existingAcademicYear, onSelectTei, programConfig } = props;
  const { columns: dataElements } = useEnrollmentsHeader({ programConfig });
  const { sectionName } = useGetSectionTypeLabel();

  return (
    <div className={styles.details_container}>
      <div className={styles.details_header}>
        <div className={styles.details_header_title}>
          <h6 style={{ fontSize: 13 }}>Enrollment History</h6>
        </div>
        <div className={styles.details_header_button}>
          {existingAcademicYear ?
            <i className={styles.enrolledAlertLabel}>This {sectionName} is already enrolled for this year.</i>
            :
            <Button {...{ small: true, success: "success", onClick: onSelectTei, label: "New enrollment", icon: <IconAddCircle16 /> }} />
          }
        </div>
      </div>
      <div className={styles.details_body}>

        {enrollmentsData.length ?
          enrollmentsData?.map((enrollment: any) => (
            <div className={styles.detailsCard}>
              {dataElements?.map((dataElement: any, key: number) => (
                <div className={styles.details_body_list} key={key}>
                  <label className={styles.detailsCardVariable}>{dataElement?.displayName}:</label>
                  <label className={styles.detailsCardLabel}> {enrollment[dataElement?.id]} </label>
                </div>
              ))}
            </div>
          )) : <span className="ml-1">No enrollments found.</span>
        }
      </div>
    </div>

  )
}

export default EnrollmentDetailsComponent;
