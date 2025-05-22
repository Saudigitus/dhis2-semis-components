// @ts-ignore
import { SelectorBar, SelectorBarItem } from '@dhis2/ui'
import { useEffect, useState } from 'react'
import { DataProvider } from "@dhis2/app-runtime"
import { OptionProps, SemisHeaderProps } from "../../types/header/headerTypes"
import { MenuSelect } from './common/common'
import { RecoilRoot, useRecoilState } from 'recoil'
import { HeaderValuesState } from '../../schemas/headerDataSchema'
import style from "./mainHeader.module.css"
import { useUrlParams } from 'dhis2-semis-functions'
import OrgUnitTreeSearch from './components/orgUnitTreeSearch'

type CombinedTypes = SemisHeaderProps & { baseUrl: string };

const SemisHeaderRaw = (props: CombinedTypes) => {
    const { baseUrl, academicYears, classes, employmentType: typeOfEmployee, grades, orgunits, typeOfStaff } = props
    const { add, remove, urlParameters, useQuery } = useUrlParams()
    const { grade, class: section, school, academicYear, schoolName, employmentType, position } = urlParameters()
    const [openGrade, setOpenGrade] = useState<boolean>(false)
    const [openClass, setOpenClass] = useState<boolean>(false)
    const [openEmploymentType, setOpenEmploymentType] = useState<boolean>(false)
    const [opentTypeStaff, setOpentTypeStaff] = useState<boolean>(false)
    const [openAcademicYear, setOpenAcademicYear] = useState<boolean>(false)
    const [openOu, setOpenOu] = useState<boolean>(false)
    const [headerValues, setHeaderValues] = useRecoilState(HeaderValuesState)

    //RETRIEVE VALUES FROM ULR AND SET TO STATE
    useEffect(() => {
        setHeaderValues({
            selectedAcademicYear: academicYears?.options?.filter((option: OptionProps) => option.value === academicYear)?.[0] as OptionProps,
            selectedClass: classes?.options?.filter((option: OptionProps) => option.value === section)?.[0] as OptionProps,
            selectedGrade: grades?.options?.filter((option: OptionProps) => option.value === grade)?.[0] as OptionProps,
            selectedOu: { displayName: schoolName, id: school, selected: [] },
            selectedEmploymentType: typeOfEmployee?.options?.filter((option: OptionProps) => option.value === employmentType)?.[0] as OptionProps,
            selectedTypeStaff: typeOfStaff?.options?.filter((option: OptionProps) => option.value === position)?.[0] as OptionProps,
        })
    }, [useQuery()])

    const onChangeGrade = (event) => {
        const getSelectOption = grades?.options?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, selectedGrade: getSelectOption }))
        add("grade", getSelectOption.value)
        setOpenGrade(!openGrade)
    }

    const onChangeClass = (event) => {
        const getSelectOption = classes?.options?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, selectedClass: getSelectOption }))
        add("class", getSelectOption.value)
        setOpenClass(!openClass)
    }

    const onChangeOu = (event: { id: string, displayName: string, selected: any }) => {
        setHeaderValues(prevState => ({ ...prevState, selectedOu: event }))
        add("school", event.id)
        add("schoolName", event.displayName)
        setOpenOu(!openOu)
    }

    const onChangeEmploymentType = (event) => {
        const getSelectOption = typeOfEmployee?.options?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, selectedEmploymentType: getSelectOption }))
        add("employmentType", getSelectOption.value)
        setOpenEmploymentType(!openEmploymentType)
    }

    const onChangeTypeStaff = (event) => {
        const getSelectOption = typeOfStaff?.options?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, selectedTypeStaff: getSelectOption }))
        add("position", getSelectOption.value)
        setOpentTypeStaff(!opentTypeStaff)
    }

    const onChangeAcademicYear = (event) => {
        const getSelectOption = academicYears?.options?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, selectedAcademicYear: getSelectOption }))
        add("academicYear", getSelectOption.value)
        setOpenAcademicYear(!openAcademicYear)
    }

    return (
        <SelectorBar className={style.HeaderContainer}
            additionalContent={academicYears &&
                <SelectorBarItem
                    label="Academic year"
                    value={academicYear ?? headerValues?.selectedAcademicYear?.value}
                    noValueMessage="Select a academic year"
                    open={openAcademicYear}
                    setOpen={() => setOpenAcademicYear(!openAcademicYear)}
                >
                    <MenuSelect placeholder="" isSeachable={false} values={academicYears.options} selected={headerValues?.selectedAcademicYear?.value} onChange={onChangeAcademicYear} />
                </SelectorBarItem>
            }
        >

            {orgunits && <SelectorBarItem
                value={schoolName ?? headerValues?.selectedOu?.displayName}
                onClearSelectionClick={() => {
                    setHeaderValues({
                        selectedAcademicYear: { label: "", value: "" },
                        selectedClass: { label: "", value: "" },
                        selectedGrade: { label: "", value: "" },
                        selectedOu: { displayName: "", id: "", selected: [] },
                    })
                    remove("class")
                    remove("grade")
                    remove("school")
                    remove("schoolName")

                }}
                label="School"
                noValueMessage="Select a school"
                open={openOu}
                setOpen={() => setOpenOu(!openOu)}
            >
                <DataProvider baseUrl={baseUrl}>
                    <OrgUnitTreeSearch onChange={onChangeOu} />
                </DataProvider>
            </SelectorBarItem>}

            {grades && <SelectorBarItem
                onClearSelectionClick={() => {
                    setHeaderValues(prevState => ({ ...prevState, selectedGrade: { label: "", value: "" } }))
                    remove("grade")
                }}
                label="Grade"
                value={grade ?? headerValues?.selectedGrade?.value}
                noValueMessage="Select a grade"
                open={openGrade}
                setOpen={() => setOpenGrade(!openGrade)}
            >
                <MenuSelect placeholder="Search for a grade" isSeachable values={grades.options} selected={headerValues?.selectedGrade?.value} onChange={onChangeGrade} />
            </SelectorBarItem>}


            {classes && <SelectorBarItem
                onClearSelectionClick={() => {
                    setHeaderValues(prevState => ({ ...prevState, selectedClass: { label: "", value: "" } }))
                    remove("class")

                }}
                label="Class/Section"
                value={section ?? headerValues?.selectedClass?.value}
                noValueMessage="Select a class"
                open={openClass}
                setOpen={() => setOpenClass(!openClass)}
            >
                <MenuSelect placeholder="Search for a class" isSeachable values={classes.options} selected={headerValues?.selectedClass?.value} onChange={onChangeClass} />
            </SelectorBarItem>}

            {employmentType && <SelectorBarItem
                onClearSelectionClick={() => {
                    setHeaderValues(prevState => ({ ...prevState, selectedEmploymentType: { label: "", value: "" } }))
                    remove("employmentType")
                }}
                label="Employment Type"
                value={employmentType ?? headerValues?.selectedEmploymentType?.value}
                noValueMessage="Select a employment type"
                open={openEmploymentType}
                setOpen={() => setOpenEmploymentType(!openEmploymentType)}
            >
                <MenuSelect placeholder="Search for a employment type" isSeachable values={typeOfEmployee.options} selected={headerValues?.selectedEmploymentType?.value} onChange={onChangeEmploymentType} />
            </SelectorBarItem>}
            {typeOfStaff && <SelectorBarItem
                onClearSelectionClick={() => {
                    setHeaderValues(prevState => ({ ...prevState, selectedTypeStaff: { label: "", value: "" } }))
                    remove("position")
                }}
                label="Type of Staff"
                value={position ?? headerValues?.selectedTypeStaff?.value}
                noValueMessage="Select a type of staff"
                open={opentTypeStaff}
                setOpen={() => setOpentTypeStaff(!opentTypeStaff)}
            >
                <MenuSelect placeholder="Search for a type of staff" isSeachable values={typeOfStaff.options} selected={headerValues?.selectedTypeStaff?.value} onChange={onChangeTypeStaff} />
            </SelectorBarItem>}

        </SelectorBar>
    )
}


const SemisHeader = (props: CombinedTypes) => {

    return (
        <RecoilRoot>
            <SemisHeaderRaw {...props} />
        </RecoilRoot>)
}

export default SemisHeader