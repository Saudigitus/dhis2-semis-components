import React from "react";
import { ButtonStrip } from "@dhis2/ui";
import SummaryCard from "../../../card/SummaryCard";
import { useRecoilValue } from "recoil";
import { TranslationState } from "../../../../schemas/translationsSchema";

function SummaryCards({ validRecs, invalidRecs, doneProcessing, dryRun = false, updating = false, stats, module }: { module: string, stats: any, validRecs: any, invalidRecs: any, doneProcessing: boolean, dryRun?: boolean, updating?: boolean }): React.ReactElement {
    const i18n = useRecoilValue(TranslationState) as any
    // Label of the rows that passed the check: they are new only in "Enroll new students / staffs".
    const validLabel = updating ? "Records to update" : module === "enrollment" ? "New Records" : "Valid Records"

    const getStats = (invalid = false) => {
        if (module === "attendance") {
            if (invalid) {
                let soma = validRecs?.reduce((acc: number, item: any) => {
                    return acc + Object.values(item?.Attendance)?.filter((v: string) => v?.length == 0)?.length;
                }, 0)

                soma += invalidRecs?.reduce((acc: number, item: any) => {
                    return acc + Object.values(item?.Attendance)?.filter((v: string) => v?.length == 0)?.length;
                }, 0)
                
                return soma;
            } else {

                const soma = validRecs?.reduce((acc: number, item: any) => {
                    return acc + Object.values(item?.Attendance)?.filter((v: string) => v?.length > 0 && v != "Non School Day")?.length;
                }, 0)

                return soma
            }
        } else {
            if (invalid) return invalidRecs?.length || 0;
            return validRecs?.length || 0;
        }
    }

    return (
        <ButtonStrip>
            {!doneProcessing ? <>
                <SummaryCard color="success" label={`${i18n.t(validLabel)}`} value={getStats()} />
                <SummaryCard color="warning" label={`${i18n.t("Invalid Records")}`} value={getStats(true)} />
            </>
                : dryRun ?
                // A dry run saves nothing: the server reports only the records it would refuse.
                <>
                    <SummaryCard color="secondary" label={`${i18n.t("Rows checked")}`} value={validRecs?.length ?? 0} />
                    <SummaryCard color="error" label={`${i18n.t("Errors")}`} value={stats?.stats?.ignored?.toString()} />
                    <SummaryCard color="warning" label={`${i18n.t("Warnings")}`} value={stats?.warningDetails?.length ?? 0} />
                </>
                :
                <>
                    <SummaryCard color="success" label={`${i18n.t("Imported Records")}`} value={stats?.stats?.created?.toString()} />
                    <SummaryCard color="updated" label={`${i18n.t("Updated Records")}`} value={stats?.stats?.updated?.toString()} />
                    <SummaryCard color="error" label={`${i18n.t("Errors")}`} value={stats?.stats?.ignored?.toString()} />
                    <SummaryCard color="warning" label={`${i18n.t("Warnings")}`} value={stats?.warningDetails?.length ?? 0} />
                    <SummaryCard color="secondary" label={`${i18n.t("Rows sent")}`} value={validRecs?.length ?? 0} />
                </>
            }
        </ButtonStrip>
    )
}

export default SummaryCards;
