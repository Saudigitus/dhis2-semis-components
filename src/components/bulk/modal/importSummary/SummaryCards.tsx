import React from "react";
import { ButtonStrip } from "@dhis2/ui";
import SummaryCard from "../../../card/SummaryCard";

function SummaryCards({ validRecs, invalidRecs, duplicateRecs, doneProcessing, stats }: { stats: any, validRecs: any, invalidRecs: any, duplicateRecs: any, doneProcessing: boolean }): React.ReactElement {

    return (
        <ButtonStrip>
            {!doneProcessing ? <>
                <SummaryCard color="success" label="New Records" value={validRecs?.length} />
                <SummaryCard color="warning" label="Invalid Records" value={invalidRecs?.length} />
                <SummaryCard color="error" label="Duplicates" value={duplicateRecs?.length} />
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
