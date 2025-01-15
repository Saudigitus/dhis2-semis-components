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


const SemisHeaderRaw = ({ headerItems }: { headerItems: SemisHeaderProps }) => {
    const { add, remove, urlParameters, useQuery } = useUrlParams()
    const { grade, class: section, school, academicYear, schoolName } = urlParameters()
    const [openGrade, setOpenGrade] = useState<boolean>(false)
    const [openClass, setOpenClass] = useState<boolean>(false)
    const [openAcademicYear, setOpenAcademicYear] = useState<boolean>(false)
    const [openOu, setOpenOu] = useState<boolean>(false)
    const [headerValues, setHeaderValues] = useRecoilState(HeaderValuesState)

    //RETRIEVE VALUES FROM ULR AND SET TO STATE
    useEffect(() => {
        setHeaderValues({
            selectedAcademicYear: headerItems?.academicYears?.options?.filter((option: OptionProps) => option.value === academicYear)?.[0] as OptionProps,
            selectedClass: headerItems?.classes?.options?.filter((option: OptionProps) => option.value === section)?.[0] as OptionProps,
            selectedGrade: headerItems?.grades?.options?.filter((option: OptionProps) => option.value === grade)?.[0] as OptionProps,
            selectedOu: { displayName: schoolName, id: school, selected: [] }
        })
    }, [useQuery()])

    const onChangeGrade = (event) => {
        const getSelectOption = headerItems?.grades?.options?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, selectedGrade: getSelectOption }))
        add("grade", getSelectOption.value)
        setOpenGrade(!openGrade)
    }

    const onChangeClass = (event) => {
        const getSelectOption = headerItems?.classes?.options?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
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

    const onChangeAcademicYear = (event) => {
        const getSelectOption = headerItems?.academicYears?.options?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, selectedAcademicYear: getSelectOption }))
        add("academicYear", getSelectOption.value)
        setOpenAcademicYear(!openAcademicYear)
    }

    return (
        <SelectorBar className={style.HeaderContainer}
            additionalContent={
                <SelectorBarItem
                    label="Academic year"
                    value={academicYear ?? headerValues?.selectedAcademicYear?.value}
                    noValueMessage="Select a acamic year"
                    open={openAcademicYear}
                    setOpen={() => setOpenAcademicYear(!openAcademicYear)}
                >
                    <MenuSelect placeholder="" isSeachable={false} values={headerItems.academicYears.options} selected={headerValues?.selectedAcademicYear?.value} onChange={onChangeAcademicYear} />
                </SelectorBarItem>
            }
        >
            <SelectorBarItem
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
                <DataProvider baseUrl='http://localhost:8080'>
                    <OrgUnitTreeSearch onChange={onChangeOu} />
                </DataProvider>
            </SelectorBarItem>
            <SelectorBarItem
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
                <MenuSelect placeholder="Search for a grade" isSeachable values={headerItems.grades.options} selected={headerValues?.selectedGrade?.value} onChange={onChangeGrade} />
            </SelectorBarItem>
            <SelectorBarItem
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
                <MenuSelect placeholder="Search for a class" isSeachable values={headerItems.classes.options} selected={headerValues?.selectedClass?.value} onChange={onChangeClass} />
            </SelectorBarItem>
        </SelectorBar>
    )
}

const SemisHeader = ({ headerItems }: { headerItems: SemisHeaderProps }) => {
    return (
        <RecoilRoot>
            <SemisHeaderRaw headerItems={headerItems} />
        </RecoilRoot>)
}

export default SemisHeader