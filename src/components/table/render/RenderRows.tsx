import React, { useState } from 'react'
import classNames from 'classnames';
import { RenderRowsProps } from '../../../types/table/TableContentProps';
import { makeStyles, type Theme, createStyles } from '@material-ui/core/styles';
import MobileRow from '../components/mobileRow/MobileRow';
import RowTable from '../components/row/RowTable';
import RowCell from '../components/row/RowCell';
import TableRowActions from '../components/rowsActions/TableRowActions';
import { getDisplayName } from '../../../utils/table/getDisplayNameByOption';
import { checkCanceled } from '../../../utils/table/checkCanceled';
import { checkOwnershipOu } from '../../../utils/table/checkCanceled';
import { Attribute } from '../../../types/generated/models';
import { formatKeyValueTypeHeader } from '../../../utils/common/formatKeyValueType';
import { GetImageUrl } from '../../../utils/table/getImageUrl';
import { IconButton, Tooltip } from '@mui/material';
import { CropOriginal } from '@material-ui/icons';
import EnrollmentDetailsComponent from '../../../components/searchEnrollment/enrollmentDetailsComponent/EnrollmentDetailsComponent';
import { checkEnrolledAcademicYear } from '../../../utils/table/checkEnrolledAcademicYear';
import { Checkbox } from "@dhis2/ui"
import { useUrlParams } from 'dhis2-semis-functions';
import { useDataStoreKey } from '../../../hooks/dataStore/useDataStoreKey';
import { deepEqual } from '../../../utils/table/objectComparison';
import { VariablesTypes } from '../../../types/variables/AttributeColumns';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: { width: "100%" },
        historyRow: { backgroundColor: "#FFFF" },
        dataRow: {
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#F1FBFF'
            }
        },
        dataRowCollapsed: {
            backgroundColor: '#F1FBFF'
        },
        cell: {
            whiteSpace: "nowrap",
            padding: `${theme.spacing(1) / 2}px ${theme.spacing(1) * 7}px ${theme.spacing(1) /
                2}px ${theme.spacing(1) * 3}px`,
            '&:last-child': {
                paddingRight: theme.spacing(1) * 3
            },
            borderBottomColor: "rgba(224, 224, 224, 1)",
            [theme.breakpoints.down('md')]: {
                padding: `${theme.spacing(1) * 1}px`,
                '&:last-child': {
                    paddingRight: `${theme.spacing(1) * 1}px`
                },
            },
            [theme.breakpoints.down('sm')]: {
                padding: `${theme.spacing(1) * 1}px`,
                '&:last-child': {
                    paddingRight: `${theme.spacing(1) * 1}px`
                },
            },
        },
        bodyCell: {
            fontSize: theme.typography.pxToRem(13),
            color: theme.palette.text.primary,
            [theme.breakpoints.down('md')]: {
                fontSize: theme.typography.pxToRem(12),
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.pxToRem(11),
            }
        },
        actionsCell: {
            padding: `${theme.spacing(1) / 2}px ${theme.spacing(1) * 7}px ${theme.spacing(1) / 2}px ${theme.spacing(1 + 0.25)}px`,
            [theme.breakpoints.down('md')]: {
                padding: `${theme.spacing(1)}px`,
            },
            [theme.breakpoints.down('sm')]: {
                padding: `${theme.spacing(1)}px`,
            }
        }
    })
);

function RenderRows(props: RenderRowsProps): React.ReactElement {
    const classes = useStyles()
    const { imageUrl } = GetImageUrl()
    const { urlParameters } = useUrlParams()
    const { academicYear, sectionType, school } = urlParameters();
    const { registration } = useDataStoreKey({ sectionType: sectionType as unknown as "student" | "staff" })
    const [showEnrollments, setShowEnrollments] = useState<string>()
    const { headerData, rowsData = [], pagination, searchActions, showRowIndex, loading, viewPortWidth, selectedOU, showRowActions, rowAction, displayType, programConfig, inactiveRowMessage, onRowClick, indeterminate, isCheckbox, onChange, selected } = props;

    const isSelected = (row: any): boolean => selected?.find((item: any) => deepEqual(item, row));

    if (rowsData?.length === 0 && !loading) {
        return (
            <RowTable
                className={classes.row}
            >
                <RowCell
                    className={classNames(classes.cell, classes.bodyCell)}
                    colspan={headerData?.filter(x => x.visible)?.length as unknown as number + 1}
                >
                    {'No data to display'}
                </RowCell>
            </RowTable>
        );
    }

    const renderRowCheckBox = ({ row }: { row: Record<string, any> }) => {
        return (
            <>
                {isCheckbox &&
                    <RowCell
                        className={classNames(classes.cell, classes.bodyCell)}
                    >
                        <Checkbox
                            indeterminate={indeterminate}
                            checked={isSelected(row)}
                            onChange={() => onChange && onChange(row)}
                        />
                    </RowCell>
                }
            </>
        )
    }

    const renderRowAction = ({ row }: { row: Record<string, any> }) => {
        return (
            <>
                {
                    showRowActions &&
                    <RowCell
                        key={"actions"}
                        className={classNames(classes.cell, classes.bodyCell, classes.actionsCell)}
                    >
                        <TableRowActions
                            actions={
                                searchActions ? [{
                                    ...rowAction[0],
                                    onClick: () => setShowEnrollments(showEnrollments === row.trackedEntity ? "" : row.trackedEntity)
                                }] : rowAction
                            }
                            row={row}
                            disabled={checkCanceled(row.status)}
                            loading={loading!}
                            displayType={displayType}
                        />
                    </RowCell>
                }
            </>
        )
    }

    const renderRowIndex = ({ index }: { index: number }) => {
        return (
            <>
                {showRowIndex &&
                    <RowCell
                        className={classNames(classes.cell, classes.bodyCell)}
                    >
                        {(pagination.page - 1) * pagination.pageSize + index + 1}
                    </RowCell>
                }
            </>
        )
    }



    return (
        <React.Fragment>
            {
                rowsData?.map((row, index) => (
                    <>
                        {viewPortWidth > 520 ?
                            <RowTable
                                key={index}
                                inactive={checkCanceled(row.status)}
                                title={inactiveRowMessage}
                                isOwnershipOu={checkOwnershipOu(row.ownershipOu, selectedOU)}
                                className={classNames(classes.row, classes.dataRow, (searchActions && showEnrollments) ? classes.dataRowCollapsed : null)}
                            >
                                {renderRowCheckBox({ row })}
                                {renderRowIndex({ index })}
                                {
                                    headerData?.filter((x: any) => x.visible)?.map((column: any) => (
                                        <RowCell
                                            key={column.id}
                                            className={classNames(classes.cell, classes.bodyCell)}
                                            onClick={() => onRowClick ? onRowClick(row) : {}}
                                        >
                                            {
                                                column.type === VariablesTypes.Custom ? row[column.id] :
                                                    formatKeyValueTypeHeader(headerData)[column.id] === Attribute.valueType.IMAGE ?
                                                        <a href={imageUrl({ attribute: column.id, trackedEntity: row.trackedEntity })} target='_blank'>
                                                            {row[column.id] &&
                                                                <Tooltip title="Click to open in new tab" >
                                                                    <IconButton> <CropOriginal /></IconButton>
                                                                </Tooltip>
                                                            }
                                                        </a>
                                                        : <div>
                                                            {getDisplayName({ metaData: column.id, value: row[column.id], program: programConfig })}
                                                        </div>
                                            }
                                        </RowCell>
                                    ))
                                }
                                {renderRowAction({ row })}
                            </RowTable>
                            :
                            <MobileRow
                                rowData={row}
                                headerData={headerData}
                                programConfig={programConfig}
                                helperText={inactiveRowMessage}
                                rowIndex={renderRowIndex({ index })}
                                rowActions={renderRowAction({ row })}
                                checkBox={renderRowCheckBox({ row })}
                            />
                        }

                        {searchActions && showEnrollments === row.trackedEntity ?
                            <RowTable className={classNames(classes.row, classes.historyRow)}>
                                <RowCell
                                    className={classNames(classes.cell, classes.bodyCell)}
                                    colspan={headerData?.filter(x => x.visible)?.length as unknown as number + 1}
                                >
                                    <EnrollmentDetailsComponent programConfig={programConfig} existingAcademicYear={checkEnrolledAcademicYear
                                        (
                                            row?.registrationEvents,
                                            academicYear as unknown as string,
                                            registration.academicYear,
                                            school!,
                                            sectionType!
                                        )} onSelectTei={onRowClick ? () => onRowClick(row) : undefined} enrollmentsData={row.registrationEvents} />
                                </RowCell>
                            </RowTable>
                            : null
                        }
                    </>
                ))
            }
        </React.Fragment>
    )
}

export default RenderRows
