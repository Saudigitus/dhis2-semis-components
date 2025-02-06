import React from "react";
import { ButtonStrip } from "@dhis2/ui";
import SummaryCard from "../../../card/SummaryCard";
import { useRecoilValue } from "recoil";

function SummaryCards(props: any): React.ReactElement {
    const newRecs = props?.summary?.new?.reduce((sum: any, item: any) => sum + item.columns, 0);
    const invalid = props?.summary?.invalid?.reduce((sum: any, item: any) => sum + item.columns, 0);
    const stats: any = {}

    return (
        <ButtonStrip>
            {!props.doneProcessing ? <>
                <SummaryCard color="success" label="New Records" value={newRecs?.toString()} />
                <SummaryCard color="warning" label="Invalid Records" value={invalid?.toString()} />
                <SummaryCard color="error" label="Invalid Sheets" value={props?.summary?.invalidSheets?.length.toString()} />
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
