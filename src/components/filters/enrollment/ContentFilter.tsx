import { format } from 'date-fns'
import MenuFilters from './MenuFilters'
import { Button } from '@material-ui/core'
import { useState, useEffect } from 'react'
import styles from './ContentFilter.module.css'
import SelectButton from "../selectButton/SelectButton"
import useViewportWidth from '../../../hooks/common/useViewPort'
import { convertArrayToObject } from '../../../utils/common/formatArrayToObject'
import { type CustomAttributeProps } from '../../../types/variables/AttributeColumns'
import { EnrollmentFilterProps } from '../../../types/filters/filtersProps'

type FiltersValuesProps = Record<string, any | { endDate: string } | { startDate: string }>

function ContentFilter(props: EnrollmentFilterProps) {
    const { variables = [], defaultFilterNumber = 4, filterState, setFilterState } = props;
    const [filtersValues, setfiltersValues] = useState<FiltersValuesProps>({})
    const [localFilters, setlocalFilters] = useState<CustomAttributeProps[]>([])
    const [fieldsFilled, setfieldsFilled] = useState<FiltersValuesProps>({})
    const [anchorEl, setAnchorEl] = useState(null)
    const [resetValues, setresetValues] = useState("")
    const attributesQuerybuilder: any[][] = []
    const dataElementsQuerybuilder: any[][] = []
    const { viewPortWidth } = useViewportWidth()

    useEffect(() => {
        const copyHeader = [...variables]
        const sliceTo = viewPortWidth < 779 ? 1 : defaultFilterNumber
        setlocalFilters(copyHeader.slice(0, sliceTo))
    }, [variables, viewPortWidth])

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const addSearchableHeaders = (e: CustomAttributeProps) => {
        const copyHeader = [...variables]
        const copyHeaderLocal = [...localFilters]

        const pos = copyHeader.findIndex(x => x.id === e.id)
        copyHeaderLocal.push(copyHeader[pos])
        setlocalFilters(copyHeaderLocal)
    }

    const onChangeFilters = (value: any, key: string, type: string, pos: string) => {
        let cloneHeader = { ...filtersValues, ...convertArrayToObject(filterState.dataElements) }

        if (type === 'DATE') {
            let date = cloneHeader[key] ?? {}
            if (pos === 'start') {
                verifyIsFilled(value)
                    ? date = { ...date, startDate: format(value, "yyyy-MM-dd") }
                    : delete date.startDate
            } else {
                verifyIsFilled(value)
                    ? date = { ...date, endDate: format(value, "yyyy-MM-dd") }
                    : delete date.endDate
            }
            cloneHeader[key] = date
        } else {
            if (verifyIsFilled(value)) {
                cloneHeader[key] = value
            } else {
                const { [key]: _, ...withoutKey } = cloneHeader
                cloneHeader = withoutKey
            }
        }
        setfiltersValues(cloneHeader);
    }

    function verifyIsFilled(value: any) {
        if (value != null && value?.replace(/\s/g, '').length) {
            return true
        }
        if (value === "") {
            return false
        }
        return false
    }

    const onQuerySubmit = () => {
        const copyHeader = { ...filtersValues }
        for (const [key, value] of Object.entries(copyHeader)) {
            const variableType = variables.find((x: any) => x.id === key)?.type
            if (typeof value === 'object') {
                if (variableType === "dataElement") {
                    dataElementsQuerybuilder.push([`${key}:ge:${value?.startDate}:le:${value?.endDate}`])
                } else attributesQuerybuilder.push([`${key}:ge:${value?.startDate}:le:${value?.endDate}`])
            } else {
                if (typeof value === 'boolean') {
                    if (variableType === "dataElement") {
                        dataElementsQuerybuilder.push([`${key}:eq:${value}`])
                    } else attributesQuerybuilder.push([`${key}:eq:${value}`])
                } else
                    if (value?.includes(',')) {
                        const newValue = value.replaceAll(",", ";") as string
                        if (variableType === "dataElement") {
                            dataElementsQuerybuilder.push([`${key}:in:${newValue}`])
                        } else attributesQuerybuilder.push([`${key}:in:${newValue}`])
                    } else {
                        if (variableType === "dataElement") {
                            dataElementsQuerybuilder.push([`${key}:in:${value}`])
                        } else attributesQuerybuilder.push([`${key}:like:${value}`])
                    }
            }
        }
        setfieldsFilled(copyHeader)
        setFilterState({
            attributes: attributesQuerybuilder,
            dataElements: dataElementsQuerybuilder
        })
    }
    
    const onResetFilters = (id: string) => {
        const copyHeader = { ...filtersValues }

        const { [id]: _, ...withoutID } = copyHeader;
        setfiltersValues(withoutID)
        setresetValues(id)
    }

    useEffect(() => {
        if (resetValues?.length > 0) {
            onQuerySubmit()
            setresetValues("")
        }
    }, [resetValues])

    return (
        <div className={styles.container}>
            {
                localFilters.filter(x => x.searchable === true).map((colums, index) => (
                    <SelectButton key={index}
                        tooltipContent=''
                        title={colums.displayName}
                        value={filtersValues[colums.id]}
                        colum={colums}
                        onQuerySubmit={onQuerySubmit}
                        onChange={onChangeFilters}
                        disabledReset={
                            typeof filtersValues[colums.id] === "object"
                                ? filtersValues[colums.id]?.startDate !== undefined && filtersValues[colums.id]?.endDate === undefined
                                : (filtersValues[colums.id] === undefined && fieldsFilled[colums.id] === undefined)
                        }
                        disabled={
                            typeof filtersValues[colums.id] === "object"
                                ? fieldsFilled[colums.id]?.startDate === filtersValues[colums.id]?.startDate &&
                                fieldsFilled[colums.id]?.endDate === filtersValues[colums.id]?.endDate

                                : fieldsFilled[colums.id] === filtersValues[colums.id]
                        }
                        filled={(Boolean(fieldsFilled[colums.id])) && fieldsFilled[colums.id]}
                        onResetFilters={onResetFilters}
                    />
                ))
            }
            <div className={styles.moreFiltersContainer}>
                {variables?.filter((x: any) => !localFilters.includes(x) && x.searchable).length > 0 &&
                    <Button className={styles.moreFilters}
                        variant='outlined'
                        onClick={handleClick}
                    >
                        More Filters
                    </Button>
                }
                <MenuFilters
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    options={variables?.filter((x: any) => !localFilters.includes(x) && x.searchable)}
                    addSearchableHeaders={addSearchableHeaders}
                />
            </div>

        </div>
    )
}

export default ContentFilter
