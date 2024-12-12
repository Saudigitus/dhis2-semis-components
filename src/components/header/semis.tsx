// @ts-ignore
import { SelectorBar, SelectorBarItem } from '@dhis2/ui'
import { useState } from 'react'
import React from 'react'
import { DataProvider } from "@dhis2/app-runtime"
import { OptionProps, SemisHeaderProps } from "../../types/header/headerTypes"
import { MenuSelect } from './common/common'
import { RecoilRoot, useRecoilState } from 'recoil'
import { HeaderValuesState } from '../../schemas/headerDataSchema'
import OrgUnitTreeComponent from './components/orgUnitTree'


const SemisHeaderRaw = ({ headerItems }: { headerItems: SemisHeaderProps }) => {
    const [openGrade, setOpenGrade] = useState<boolean>(false)
    const [openClass, setOpenClass] = useState<boolean>(false)
    const [openAcademicYear, setOpenAcademicYear] = useState<boolean>(false)
    const [openOu, setOpenOu] = useState<boolean>(false)
    const [headerValues, setHeaderValues] = useRecoilState(HeaderValuesState)

    const onChangeGrade = (event) => {
        const getSelectOption = headerItems?.grades?.options?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, selectedGrade: getSelectOption }))
        setOpenGrade(!openGrade)
    }

    const onChangeClass = (event) => {
        const getSelectOption = headerItems?.classes?.options?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, selectedClass: getSelectOption }))
        setOpenClass(!openClass)
    }

    const onChangeOu = (event) => {
        console.log(event, "event", headerValues)
    }

    const onChangeAcademicYear = (event) => {
        const getSelectOption = headerItems?.academicYears?.options?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, selectedAcademicYear: getSelectOption }))
        setOpenAcademicYear(!openAcademicYear)
    }

    return (
        <SelectorBar additionalContent={
            <SelectorBarItem
                label="Academic year"
                value={headerValues?.selectedAcademicYear?.value}
                noValueMessage="Select a acamic year"
                open={openAcademicYear}
                setOpen={() => setOpenAcademicYear(!openAcademicYear)}
            >
                <MenuSelect values={headerItems.academicYears.options} selected={headerValues?.selectedAcademicYear?.value} onChange={onChangeAcademicYear} />
            </SelectorBarItem>
        }>
            <SelectorBarItem
                label="School"
                noValueMessage="Select a school"
                open={openOu}
                setOpen={() => setOpenOu(!openOu)}
            >
                <DataProvider baseUrl='http://localhost:8080'>
                    <OrgUnitTreeComponent />
                </DataProvider>
            </SelectorBarItem>
            <SelectorBarItem
                onClearSelectionClick={() => {
                    setHeaderValues(prevState => ({ ...prevState, selectedGrade: { label: "", value: "" } }))
                }}
                label="Grade"
                value={headerValues?.selectedGrade?.value}
                noValueMessage="Select a grade"
                open={openGrade}
                setOpen={() => setOpenGrade(!openGrade)}
            >
                <MenuSelect values={headerItems.grades.options} selected={headerValues?.selectedGrade?.value} onChange={onChangeGrade} />
            </SelectorBarItem>
            <SelectorBarItem
                onClearSelectionClick={() => {
                    setHeaderValues(prevState => ({ ...prevState, selectedClass: { label: "", value: "" } }))
                }}
                label="Class/Section"
                value={headerValues?.selectedClass?.value}
                noValueMessage="Select a class"
                open={openClass}
                setOpen={() => setOpenClass(!openClass)}
            >
                <MenuSelect values={headerItems.classes.options} selected={headerValues?.selectedClass?.value} onChange={onChangeClass} />
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