import React, { useState } from "react";
import { Button, ButtonStrip, NoticeBox } from "@dhis2/ui";
import styles from "../modal/modal.module.css"
import { Collapse } from "@material-ui/core";
import WithBorder from "../template/WithBorder";
import WithPadding from "../template/WithPadding";
import { IconButton } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import CustomForm from "../form/form";
import { useUrlParams } from 'dhis2-semis-functions'
import useGetSearchEnrollmentForm from "../../hooks/enrollmentSearch/useGetSearchEnrollmentForm";
import { ModalSearchTemplateProps } from '../../types/modal/ModalProps'
import { useGetProgramsAttributes } from "../../utils/tei/useGetProgramsAttributes";
import { formFields } from "../../utils/constants/searchEnrollmentForm";
import { getRecentEnrollment } from "../../utils/tei/getRecentEnrollment";
import useSearchEnrollments from "../../hooks/tei/useSearchEnrollments";
import Table from "../table/render/Table";
import ModalComponent from "../modal/Modal";
import { useDataStoreKey } from "../../hooks/dataStore/useDataStoreKey";
import { formattedQuery } from "../../utils/search/formatQuery";
import { IconInfo24 } from "@dhis2/ui";

function ModalSearchEnrollmentContent(props: ModalSearchTemplateProps) {
  const { sectionName, setOpenNewEnrollmentModal, programConfig, open, setOpen, Form, setFormInitialValues } = props;
  const { searchEnrollmentFields } = useGetSearchEnrollmentForm({ programConfig });
  const { registration } = useDataStoreKey({ sectionType: sectionName })
  const [showResults, setShowResults] = useState<boolean>(false)
  const { teiAttributes, searchableAttributes } = useGetProgramsAttributes({ programConfig });
  const { enrollmentValues, setEnrollmentValues, loading, getEnrollmentsData } = useSearchEnrollments({ sectionType: sectionName })
  const [collapseAttributes, setCollapseAttributes] = useState(0)
  const { urlParameters } = useUrlParams();
  const { school: orgUnit, schoolName: orgUnitName, academicYear } = urlParameters();

  const rowsActions: any = [
    { icon: <IconInfo24 />, color: '#144b73', label: `View history`, disabled: false },
  ];

  const modalActions = [
    { id: "cancel", small: true, name: "Cancel", disabled: false, primary: true, onClick: () => { setOpen(false) } },
    { id: "continue", name: "Register new", color: "gray", small: true, disabled: loading, onClick: () => { onHandleRegisterNew() } },
  ];

  const [initialValues] = useState<object>({
    registeringSchool: orgUnitName,
    [registration?.academicYear]: academicYear
  })

  const [queryForm, setQueryForm] = useState<any>({});

  const onHandleChange = ({ target: { value, name } }: { target: { value: any; name: any } }) => {
    if (value.length === 0 || value === null || value === undefined) {
      const updatedForm = { ...queryForm };
      delete updatedForm[name];
      setQueryForm(updatedForm);
    } else {
      setQueryForm((prevQueryForm: any) => ({
        ...prevQueryForm,
        [name]: value,
      }));
    }
  };


  const onHandleSubmit = async () => {
    if (formattedQuery(
      teiAttributes,
      searchEnrollmentFields,
      collapseAttributes,
      queryForm
    ).length > 0) {
      getEnrollmentsData(formattedQuery(
        teiAttributes,
        searchEnrollmentFields,
        collapseAttributes,
        queryForm
      ), setShowResults, orgUnit)
    }
  };

  function filterUniqueVariables() {
    // When click on REGISTER NEW, ignore the unique attributes, these will be generated when open the form
    const uniqueVariableIDsToRemove: string[] = searchableAttributes.filter(attribute => attribute.unique).map(attribute => attribute.id);

    const filteredOriginalObject = Object.fromEntries(
      Object.entries(queryForm).filter(([id]) => !uniqueVariableIDsToRemove.includes(id))
    );

    return filteredOriginalObject;
  }

  const onHandleRegisterNew = async () => {
    setFormInitialValues(filterUniqueVariables());
    setOpen(false);
    setOpenNewEnrollmentModal(true);
  };

  const onReset = () => {
    setQueryForm({});
    setEnrollmentValues([]);
    setFormInitialValues({})
    setShowResults(false);
  };


  const onSelectTei = (teiData: any) => {
    const recentEnrollment = getRecentEnrollment(teiData.enrollments).enrollment
    const recentRegistration = teiData.registrationEvents?.find((event: any) => event.enrollment === recentEnrollment)
    const recentSocioEconomics = teiData.socioEconomicsEvents?.find((event: any) => event.enrollment === recentEnrollment)

    setFormInitialValues({
      trackedEntity: teiData.trackedEntity,
      ...teiData?.mainAttributesFormatted,
      ...recentRegistration,
      ...recentSocioEconomics,
      [registration.academicYear]: academicYear
    })

    setOpenNewEnrollmentModal(true)
    setOpen(false);
  }
  
  return (
    <ModalComponent
      title="Fill in at least 1 attribute to search."
      actions={modalActions}
      handleClose={() => setOpen(false)}
      open={open}
      size="large"
      isClickAway={false}
      showActions={showResults}
      children={
        <div>
          {searchEnrollmentFields?.map((group, index) => (
            <div className="mb-3">
              <WithBorder type="all">
                <div className={styles.accordionHeaderContainer} onClick={() => setCollapseAttributes(index === collapseAttributes ? -1 : index)}>
                  <label className={styles.accordionHeader}>Search by {group?.name}</label>
                  <IconButton size="small" onClick={() => setCollapseAttributes(index)}> {collapseAttributes === index ? <ExpandLess /> : <ExpandMore />}  </IconButton>
                </div>

                <Collapse in={collapseAttributes === index}>
                  <WithBorder type="top">
                    <WithPadding>
                      <CustomForm
                        formFields={formFields(group?.variables, sectionName)}
                        initialValues={{ ...initialValues, orgUnit, ...queryForm }}
                        onFormSubtmit={onHandleSubmit}
                        onInputChange={onHandleChange}
                        onCancel={onReset}
                        submitButtonLabel={`Search ${sectionName.toLocaleLowerCase()}`}
                        Form={Form}
                        withButtons={true}
                        loading={loading}
                      />
                    </WithPadding>
                  </WithBorder>
                </Collapse>
              </WithBorder>
            </div>
          ))}

          <Collapse in={showResults} style={{}}>
            <>
              {enrollmentValues?.length ?
                <div className="">
                  <Table
                    columns={searchableAttributes}
                    programConfig={programConfig}
                    tableData={enrollmentValues}
                    totalElements={10}
                    title={`Results found for ${sectionName} search`}
                    rowAction={rowsActions}
                    onRowClick={onSelectTei}
                    displayType="icon"
                    showRowActions
                    searchActions
                  />
                </div> :
                <NoticeBox className={styles.noticeBox} title={`No ${sectionName} found`}>
                  Continue serching or click <strong>'Register new'</strong> if you want to register as a new <strong>{sectionName}</strong>.
                </NoticeBox>}
            </>
          </Collapse>
          {!showResults &&
            <ButtonStrip end>
              <Button key={"fechar"} onClick={() => setOpen(false)} loading={false}>
                Fechar
              </Button>
            </ButtonStrip>
          }
        </div >
      }
    />
  )
}

export default ModalSearchEnrollmentContent;
