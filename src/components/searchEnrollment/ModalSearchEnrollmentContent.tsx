import React, { useState } from "react";
import { NoticeBox } from "@dhis2/ui";
import styles from "../modal/modal.module.css"
import { Collapse } from "@material-ui/core";
import WithBorder from "../template/WithBorder";
import WithPadding from "../template/WithPadding";
import { IconButton } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { CustomAttributeProps } from "../../types/variables/AttributeColumns";
import CustomForm from "../form/form";
import { useUrlParams, useDataStoreKey } from 'dhis2-semis-functions'
import useGetSearchEnrollmentForm from "../../hooks/enrollmentSearch/useGetSearchEnrollmentForm";
import { ModalSearchTemplateProps } from '../../types/modal/ModalProps'
import { useGetProgramsAttributes } from "../../utils/tei/useGetProgramsAttributes";
import { formFields } from "../../utils/constants/searchEnrollmentForm";
import { getRecentEnrollment } from "../../utils/tei/getRecentEnrollment";
import useSearchEnrollments from "../../hooks/tei/useSearchEnrollments";
import Table from "../table/render/Table";
import ModalComponent from "../modal/Modal";

function ModalSearchEnrollmentContent(props: ModalSearchTemplateProps) {
  const { sectionName, setOpenNewEnrollment, programConfig, open, setOpen } = props;
  const { searchEnrollmentFields } = useGetSearchEnrollmentForm({ programConfig });
  const { registration } = useDataStoreKey({ sectionType: sectionName })
  const [showResults, setShowResults] = useState<boolean>(false)
  const { teiAttributes, searchableAttributes } = useGetProgramsAttributes({ programConfig });
  const { enrollmentValues, setEnrollmentValues, loading, getEnrollmentsData } = useSearchEnrollments({ sectionType: sectionName })
  // const [, setInitialValues] = useRecoilState(SearchInitialValues)
  const [collapseAttributes, setCollapseAttributes] = useState(0)
  const { urlParameters } = useUrlParams();
  const { school: orgUnit, schoolName: orgUnitName, academicYear } = urlParameters();

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

  const filterCollapsedAttributes = () => {
    // filter collapsed attributes from filled fields
    const selectedObjectIDs: string[] = searchEnrollmentFields[collapseAttributes]?.variables.map((obj: CustomAttributeProps) => obj.id);
    const filteredQueryForm: { [id: string]: string } = {};

    Object.keys(queryForm).forEach(key => {
      if (selectedObjectIDs.includes(key as unknown as string)) {
        filteredQueryForm[key] = queryForm[key];
      }
    });
    return filteredQueryForm;
  }

  const formattedQuery = () => {
    var query = "";
    for (const [key, value] of Object.entries(filterCollapsedAttributes())) {
      if (key && value) {
        const id = teiAttributes?.filter((element) => {
          return element.name == key;
        })[0].name;

        if (id) {
          query += `${id}:LIKE:${value},`;
        }
      }
    }
    return query;
  }

  const onHandleSubmit = async () => {
    if (formattedQuery().length > 0) {
      getEnrollmentsData(formattedQuery(), setShowResults)
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
    // setInitialValues(filterUniqueVariables());
    setOpen(false);
    setOpenNewEnrollment(true);
  };

  const onReset = () => {
    setQueryForm({});
    setEnrollmentValues([]);
    // setInitialValues({})
    setShowResults(false);
  };

  const modalActions = [
    { id: "cancel", small: true, name: "Cancel", disabled: false, primary: true, onClick: () => { setOpen(false) } },
    { id: "continue", name: "Register new", color: "gray", small: true, disabled: loading, onClick: () => { onHandleRegisterNew() } },
  ];


  const onSelectTei = (teiData: any) => {
    const recentEnrollment = getRecentEnrollment(teiData.enrollments).enrollment
    const recentRegistration = teiData.registrationEvents?.find((event: any) => event.enrollment === recentEnrollment)
    const recentSocioEconomics = teiData.socioEconomicsEvents?.find((event: any) => event.enrollment === recentEnrollment)

    // setInitialValues({
    //   trackedEntity: teiData.trackedEntity,
    //   ...teiData?.mainAttributesFormatted,
    //   ...recentRegistration,
    //   ...recentSocioEconomics,
    //   [registration.academicYear]: academicYear
    // })

    setOpenNewEnrollment(true)
    setOpen(false);
  }

  return (
    <ModalComponent
      title="Fill in at least 1 attribute to search."
      actions={modalActions}
      handleClose={() => setOpen(false)}
      open={open}
      size="medium"
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
                    title={`Results found for ${sectionName} search<`}
                  />
                </div> :
                <NoticeBox className={styles.noticeBox} title={`No ${sectionName} found`}>
                  Continue serching or click <strong>'Register new'</strong> if you want to register as a new <strong>{sectionName}</strong>.
                </NoticeBox>}
            </>
          </Collapse>
        </div >
      }
    />
  )
}

export default ModalSearchEnrollmentContent;
