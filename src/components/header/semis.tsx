// @ts-ignore
import { SelectorBar, SelectorBarItem } from '@dhis2/ui'
import { useEffect, useState } from 'react'
import { DataProvider } from "@dhis2/app-runtime"
import { ExtendedDynamicHeaderProps, OptionProps, SemisHeaderProps } from "../../types/header/headerTypes"
import { MenuSelect } from './common/common'
import { RecoilRoot, useRecoilState } from 'recoil'
import { HeaderValuesState } from '../../schemas/headerDataSchema'
import style from "./mainHeader.module.css"
import { useUrlParams } from 'dhis2-semis-functions'
import OrgUnitTreeSearch from './components/orgUnitTreeSearch'
import { getOptionsByDataElement } from './utils/getOptions'
import { it } from 'date-fns/locale'

const SemisHeaderRaw = ({ headerItems, program, dataStoreValues, baseUrl = "http://localhost:8080" }: { headerItems?: SemisHeaderProps, program: any, dataStoreValues?: any, baseUrl?: string }) => {
    const hash = window.location.hash;
    const queryString = hash.split('?')[1];
    const searchParams = new URLSearchParams(queryString);
    const { otherItems = [], hideTree = false, hideDataStoreFilters = false, hideAcademicYear = false } = headerItems ?? {}
    const [dynamicItems = [], setDynamicItems] = useState<ExtendedDynamicHeaderProps[]>([...otherItems?.map(item => ({ ...item, position: item?.position ?? "LEFT", options: item.options ?? [], open: false, id: crypto.randomUUID() })), (hideDataStoreFilters ? [] : dataStoreValues?.filters?.dataElements?.map(item => ({ ...item, position: item?.position ?? "LEFT", options: item?.options ?? [], open: false, id: crypto.randomUUID() })))])
    const { add, remove, urlParameters } = useUrlParams()
    const { school, academicYear, schoolName } = urlParameters()
    const [openAcademicYear, setOpenAcademicYear] = useState<boolean>(false)
    const [openOu, setOpenOu] = useState<boolean>(false)
    const [headerValues, setHeaderValues] = useRecoilState(HeaderValuesState)

    const onOpenDynamicItems = (item: ExtendedDynamicHeaderProps) => {
        const updatedItems = dynamicItems.map((dynamicItem: ExtendedDynamicHeaderProps) => {
            if (dynamicItem.id === item.id) {
                return { ...dynamicItem, open: !dynamicItem.open }
            }
            return { ...dynamicItem, open: false }
        })
        setDynamicItems(updatedItems)
    }

    //RETRIEVE VALUES FROM ULR AND SET TO STATE
    useEffect(() => {
        const otherItemsValues = {}

        dynamicItems.forEach((item: ExtendedDynamicHeaderProps) => {
            const options = [...getOptionsByDataElement(item?.dataElement, item?.program ?? program), ...item?.options]
            const getSelectedValue = options.filter((option: OptionProps) => option.value === searchParams.get(item?.ulrParam))?.[0] as OptionProps
            otherItemsValues[item?.ulrParam] = getSelectedValue
        })

        setHeaderValues({
            selectedAcademicYear: getOptionsByDataElement(dataStoreValues?.registration?.academicYear, program)?.filter((option: OptionProps) => option.value === academicYear)?.[0] as OptionProps,
            selectedOu: { displayName: schoolName, id: school, selected: [] },
            ...otherItemsValues
        })
    }, [])

    const onChangeOu = (event: { id: string, displayName: string, selected: any }) => {
        setHeaderValues(prevState => ({ ...prevState, selectedOu: event }))
        add("school", event.id)
        add("schoolName", event.displayName)
        setOpenOu(!openOu)
    }

    const onChangeAcademicYear = (event: any) => {
        const getSelectOption = getOptionsByDataElement(dataStoreValues?.registration?.academicYear, program)?.filter((option: OptionProps) => option.value === event.selected)[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, selectedAcademicYear: getSelectOption }))
        add("academicYear", getSelectOption.value)
        setOpenAcademicYear(!openAcademicYear)
    }

    const onChangeDynamicItems = (event: any, options: any[], item: ExtendedDynamicHeaderProps) => {
        const getSelectOption = options?.filter((option: OptionProps) => option.value === event.selected)?.[0] as OptionProps
        setHeaderValues(prevState => ({ ...prevState, [item?.ulrParam]: getSelectOption }))

        if (item?.ulrParam) {
            add(item?.ulrParam, getSelectOption.value)
        }
        onOpenDynamicItems(item)
    }

    return (
        <SelectorBar className={style.HeaderContainer}
            additionalContent={
                <div style={{ display: "flex" }}>
                    {
                        dynamicItems.map((item: ExtendedDynamicHeaderProps, index) => {
                            return item?.position === "RIGHT" ? (
                                <SelectorBarItem
                                    key={index}
                                    onClearSelectionClick={() => {
                                        setHeaderValues(prevState => ({ ...prevState, [item?.ulrParam]: { label: "", value: "" } }))
                                        remove(item?.ulrParam)
                                    }}
                                    label={item.label ?? "No Label"}
                                    value={searchParams.get(item?.ulrParam) ?? headerValues[item?.ulrParam]?.value}
                                    noValueMessage={item.placehoder ?? `Select a ${item.label ?? "item"}`}
                                    open={item.open}
                                    setOpen={() => onOpenDynamicItems(item)}
                                >
                                    <MenuSelect
                                        dataElelementId={item?.dataElement}
                                        program={item?.program ?? program}
                                        placeholder={item.placehoder ?? `Search for a ${item.label ?? "item"}`}
                                        isSeachable={item?.isSeachable ?? true}
                                        values={[...getOptionsByDataElement(item?.dataElement, item?.program ?? program), ...item?.options]}
                                        selected={headerValues?.[item?.ulrParam]?.value}
                                        onChange={(event: any) => onChangeDynamicItems(event, [...getOptionsByDataElement(item?.dataElement, item?.program ?? program), ...item?.options], item)} />
                                </SelectorBarItem>
                            ) : null
                        })
                    }
                    {
                        !hideAcademicYear &&
                        <SelectorBarItem
                            label="Academic year"
                            value={academicYear ?? headerValues?.selectedAcademicYear?.value}
                            noValueMessage="Select a academic year"
                            open={openAcademicYear}
                            setOpen={() => setOpenAcademicYear(!openAcademicYear)}
                        >
                            <MenuSelect dataElelementId={dataStoreValues?.registration?.academicYear} program={program} placeholder="Select a academic year" isSeachable={false} values={getOptionsByDataElement(dataStoreValues?.registration?.academicYear, program)} selected={headerValues?.selectedAcademicYear?.value} onChange={onChangeAcademicYear} />
                        </SelectorBarItem>
                    }
                </div>
            }
        >

            {!hideTree && <SelectorBarItem
                value={schoolName ?? headerValues?.selectedOu?.displayName}
                onClearSelectionClick={() => {
                    setHeaderValues({
                        selectedOu: { displayName: "", id: "", selected: [] },
                    })
                    remove("school")
                    remove("schoolName")

                    dynamicItems.forEach((item: ExtendedDynamicHeaderProps) => {
                        remove(item?.ulrParam)
                    })

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
            {
                dynamicItems.map((item: ExtendedDynamicHeaderProps, index) => {
                    return item?.position === "LEFT" ? (
                        <SelectorBarItem
                            key={index}
                            onClearSelectionClick={() => {
                                setHeaderValues(prevState => ({ ...prevState, [item?.ulrParam]: { label: "", value: "" } }))
                                remove(item?.ulrParam)
                            }}
                            label={item.label ?? "No Label"}
                            value={searchParams.get(item?.ulrParam) ?? headerValues[item?.ulrParam]?.value}
                            noValueMessage={item.placehoder ?? `Select a ${item.label ?? "item"}`}
                            open={item.open}
                            setOpen={() => onOpenDynamicItems(item)}
                        >
                            <MenuSelect
                                dataElelementId={item?.dataElement}
                                program={item?.program ?? program}
                                placeholder={item.placehoder ?? `Search for a ${item.label ?? "item"}`}
                                isSeachable={item?.isSeachable ?? true}
                                values={[...getOptionsByDataElement(item?.dataElement, item?.program ?? program), ...item?.options]}
                                selected={headerValues?.[item?.ulrParam]?.value}
                                onChange={(event: any) => onChangeDynamicItems(event, [...getOptionsByDataElement(item?.dataElement, item?.program ?? program), ...item?.options], item)} />
                        </SelectorBarItem>) : null
                })
            }
        </SelectorBar>
    )
}

const SemisHeader = ({ headerItems, program, dataStoreValues, baseUrl }: { headerItems?: SemisHeaderProps, program?: any, dataStoreValues?: any, baseUrl?: string }) => {

    return (
        <RecoilRoot>
            <SemisHeaderRaw baseUrl={baseUrl} program={program} dataStoreValues={dataStoreValues} headerItems={headerItems} />
        </RecoilRoot>)
}

export default SemisHeader