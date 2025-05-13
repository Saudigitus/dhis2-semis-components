import React from "react";
import { ButtonStrip } from "@dhis2/ui";
import SummaryCard from "../../../card/SummaryCard";

function SummaryCards({ validRecs, invalidRecs, duplicateRecs, doneProcessing }: { validRecs: any, invalidRecs: any, duplicateRecs: any, doneProcessing: boolean }): React.ReactElement {
    const stats: any = {}

    return (
        <ButtonStrip>
            {!doneProcessing ? <>
                <SummaryCard color="success" label="New Records" value={validRecs?.length} />
                <SummaryCard color="warning" label="Invalid Records" value={invalidRecs?.length} />
                <SummaryCard color="error" label="Duplicates" value={duplicateRecs?.length} />
            </>
                :
                <>
                    <SummaryCard color="success" label="Imported" value={stats.statsCount?.created.toString()} />
                    <SummaryCard color="secondary" label="Updated" value={stats.statsCount?.updated?.toString()} />
                    <SummaryCard color="error" label="Ignored" value={stats.statsCount?.ignored?.toString()} />
                    {/* <SummaryCard color="secondary" label="Total" value={stats.statsCount?.total?.toString()} /> */}
                </>
            }
        </ButtonStrip>
    )
}

export default SummaryCards;
