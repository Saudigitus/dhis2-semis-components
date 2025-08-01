import { Label } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import GenericFields from "../genericFields/GenericFields";
import styles from './groupform.module.css'
import { type GroupFormProps } from "dhis2-semis-types";
import classNames from "classnames";
import Text from "../text/Text";
import 'bootstrap/dist/css/bootstrap.min.css';

interface customProps {
    setChanged?: any,
    submitted?: boolean
    baseUrl?: string
}

interface CombinedProps extends GroupFormProps, customProps { }

function GroupForm(props: CombinedProps) {
    const { baseUrl, fieldsOrientation = "horizontal" } = props
    const { setChanged, name, fields, description, form, onInputChange, trackedEntity, storyBook, submitted } = props

    return (
        <>
            <WithPadding p={name ? "16px 5px 0px 5px" : "0px"}>
                {name ?
                    <>
                        <Text type="subtitle" label={name} />
                        {description ?
                            <>
                                <WithPadding />
                                <Label className={styles.label}>{description}</Label>
                                <WithPadding p="0.2rem" />
                            </>
                            : null
                        }
                    </>
                    : null
                }


                <WithPadding p={"5px 10px"}>
                    {fields?.filter((x: any) => x.visible)?.map((x: any, i: number) => {
                        return (
                            <div
                                key={i}
                                className={classNames(
                                    "d-flex align-items-center",
                                    fieldsOrientation === "horizontal" ? "flex-row" : "flex-column",
                                    x.error ? styles.fieldError : x.warning ? styles.fieldWarning : styles.fieldNormal
                                )}
                            >
                                <div className={classNames(fieldsOrientation === "horizontal" ? "col-12 col-md-6 d-flex" : "w-100 d-flex")}>
                                    <Label className={styles.label}>
                                        {`${x.labelName}${x.required ? " *" : ""}`}
                                    </Label>
                                </div>
                                <div className={classNames(fieldsOrientation === "horizontal" ? "col-12 col-md-6" : "w-100")}>
                                    <GenericFields
                                        attribute={{ ...x, trackedEntity }}
                                        disabled={!!(x.disabled)}
                                        valueType={x.valueType}
                                        form={form}
                                        onInputChange={onInputChange}
                                        storybook={storyBook}
                                        setChanged={setChanged}
                                        submitted={submitted}
                                        baseUrl={baseUrl}
                                    />
                                    <span className={styles.content}>
                                        {x.content}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    )}
                </WithPadding>
            </WithPadding>
        </>
    )
}

export default GroupForm;