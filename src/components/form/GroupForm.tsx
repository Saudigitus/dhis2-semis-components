import { Label } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import GenericFields from "../genericFields/GenericFields";
import styles from './groupform.module.css'
import { type GroupFormProps } from "../../types/form/GroupFormProps";
import classNames from "classnames";
import Text from "../text/Text";
import 'bootstrap/dist/css/bootstrap.min.css';

function GroupForm(props: GroupFormProps) {
    const { name, fields, description } = props

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


                <WithPadding p={"5px 5px"}>
                    {fields?.filter((x: any) => x.visible)?.map((x: any, i: number) => {
                        return (
                            <div className={classNames("row d-flex align-items-center", x.error ? styles.fieldError : x.warning ? styles.fieldWarning : styles.fieldNormal)} key={i}
                                style={{ display: "flex" }}>
                                <div className="col-12 col-md-6 d-flex">
                                    <Label className={styles.label}>
                                        {x.labelName} {x.required ? " *" : ""}
                                    </Label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <GenericFields
                                        attribute={x}
                                        disabled={!!(x.disabled)}
                                        valueType={x.valueType}
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
