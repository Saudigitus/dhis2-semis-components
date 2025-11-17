import React from "react";
import { ButtonStrip } from "@dhis2/ui";
import SummaryCard from "../../../card/SummaryCard";
import { useRecoilValue } from "recoil";
import { TranslationState } from "../../../../schemas/translationsSchema";

function SummaryCards({ validRecs, invalidRecs, doneProcessing, stats, module }: { module: string, stats: any, validRecs: any, invalidRecs: any, doneProcessing: boolean }): React.ReactElement {
    const i18n = useRecoilValue(TranslationState) as any

    const getStats = (invalid = false) => {
        if (module === "attendance") {
            if (invalid) {
                const soma = validRecs?.reduce((acc: number, item: any) => {
                    return acc + Object.values(item?.Attendance)?.filter((v: string) => v?.length == 0)?.length;
                }, 0)

                return soma + (invalidRecs?.length || 0);
            } else {

                const soma = validRecs?.reduce((acc: number, item: any) => {
                    return acc + Object.values(item?.Attendance)?.filter((v: string) => v?.length > 0 && v != "Non School Day")?.length;
                }, 0)

                return soma
            }
        } else {
            if (invalid) invalidRecs?.length || 0;
            return validRecs?.length || 0;
        }
    }

    return (
        <ButtonStrip>
            {!doneProcessing ? <>
                <SummaryCard color="success" label={`${i18n.t("New Records")}`} value={getStats()} />
                <SummaryCard color="warning" label={`${i18n.t("Invalid Records")}`} value={getStats(true)} />
            </>
                :
                <>
                    <SummaryCard color="success" label={`${i18n.t("Imported Records")}`} value={stats?.stats?.created?.toString()} />
                    <SummaryCard color="updated" label={`${i18n.t("Updated Records")}`} value={stats?.stats?.updated?.toString()} />
                    <SummaryCard color="error" label={`${i18n.t("Error")}`} value={stats?.stats?.ignored?.toString()} />
                    <SummaryCard color="secondary" label={`${i18n.t("Total rows")}`} value={validRecs?.length + invalidRecs?.length} />
                </>
            }
        </ButtonStrip>
    )
}

export default SummaryCards;
