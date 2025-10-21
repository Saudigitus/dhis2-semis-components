import React from "react";
import { ButtonStrip } from "@dhis2/ui";
import SummaryCard from "../../../card/SummaryCard";

function SummaryCards({ validRecs, invalidRecs, doneProcessing, stats, module }: { module: string, stats: any, validRecs: any, invalidRecs: any, doneProcessing: boolean }): React.ReactElement {

    const getStats = (invalid = false) => {
        if (module === "attendance") {
            if (invalid) {
                const soma = validRecs?.reduce((acc: number, item: any) => {
                    return acc + Object.values(item?.Attendance).filter((v: string) => v?.length == 0).length;
                }, 0)

                return soma + (invalidRecs?.length || 0);
            } else {

                const soma = validRecs?.reduce((acc: number, item: any) => {
                    return acc + Object.values(item?.Attendance).filter((v: string) => v?.length > 0 && v != "Non School Day").length;
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
                <SummaryCard color="success" label="New Records" value={getStats()} />
                <SummaryCard color="warning" label="Invalid Records" value={getStats(true)} />
            </>
                :
                <>
                    <SummaryCard color="success" label="Imported" value={stats?.stats?.created?.toString()} />
                    <SummaryCard color="updated" label="Updated" value={stats?.stats?.updated?.toString()} />
                    <SummaryCard color="error" label="Errors" value={stats?.stats?.ignored?.toString()} />
                    <SummaryCard color="secondary" label="Total rows" value={validRecs?.length + invalidRecs?.length} />
                </>
            }
        </ButtonStrip>
    )
}

export default SummaryCards;
