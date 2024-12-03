import { NoticeBox } from "@dhis2/ui"
import ReactJson from 'react-json-view';

import style from "../appWrapper.module.css"

const DataStoreNotFound = ({ error }:{error:any}) => {
    return (
        <div className={style.wrapperPermanenteError}>
            <NoticeBox error title={`${error?.message ?? "An unknown error occurred loading the DataStore"}`}>
                You are experiencing this error because the data store was not loaded correctly.
            </NoticeBox>
        </div>
    )
}

const ProgramNotFound = ({ error }:{error:any}) => {
    return (
        <div className={style.wrapperPermanenteError}>
            <NoticeBox error title={`${error?.message ?? "An unknown error occurred loading the DataStore"}`}>
                You are experiencing this error because the programs was not loaded correctly.
            </NoticeBox>
        </div>
    )
}

const DataStoreNotValidated = ({ error }:{error:any}) => {

    return (
        <div style={{ padding: "20px" }}>
            <NoticeBox error title="Data Store configuration error">
                You are not able to continue before configure properly all required keys on data store. See more detail bellow
            </NoticeBox>
            <div style={{ display: "flex", gap: "100px", padding: "20px",flexWrap: "wrap" }}>
                <div style={{ width: "auto" }}>
                    <h3>Data Store current state</h3>
                    <ReactJson name={false} style={{ padding: "10px" }} src={error?.current} />
                </div>
                <div style={{ width: "auto" }}>
                    <h3>Data Store validation error</h3>
                    <ReactJson name={false} style={{ padding: "10px" }} src={error?.expected} />
                </div>
            </div>
        </div>
    )
}

export { DataStoreNotFound, DataStoreNotValidated,ProgramNotFound }