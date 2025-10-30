import useDataStore from "./useGetDataStore";
import useProgramConfig from "./useProgramConfig";
import { ProgramConfigState } from "../../schemas/programSchema";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DataStoreState, DataStoreStatusState } from "../../schemas/dataStore";
import { useState } from "react";
import { SchoolCalendarData } from "../../schemas/schoolCalendar";
import { applyProgramTranslations } from "../../utils/program/formatProgramTranslation";
import { TranslationState } from "../../schemas/translationsSchema";

const useSetupDataStore = (
    { dataStoreKey, schoolCalendarKey, keyDbLocale, i18n }:
        { dataStoreKey: string, schoolCalendarKey: string, keyDbLocale: string, i18n: any }
) => {
    const { error, getDataStore } = useDataStore();
    const [loading, setLoading] = useState<boolean>(true)
    const setProgramsValues = useSetRecoilState(ProgramConfigState)
    const setDataStoreValues = useSetRecoilState(DataStoreState)
    const setCalendarValues = useSetRecoilState(SchoolCalendarData)
    const setTranslationsValues = useSetRecoilState(TranslationState)
    const [dataStoreStatus, setDataStoreStatus] = useRecoilState(DataStoreStatusState)
    const { getProgram, error: errorProgram } = useProgramConfig()

    const setupDataStore = async () => {
        setLoading(true)

        //Setting i18n translations
        setTranslationsValues(i18n)

        //TRY TO GET CONFIG DATASTORE
        return await getDataStore(dataStoreKey).then(async (configs) => {
            let programs: any = []
            for (let i = 0; i < configs?.length; i++) {
                const result = await getProgram(configs?.[i].program) as any
                programs.push(applyProgramTranslations(result, keyDbLocale))
            }
            setProgramsValues(programs);
            setDataStoreValues(configs)

            setDataStoreStatus({
                ...dataStoreStatus,
                not_found_config: false
            })

            //IF THERE A CONFIG CREATED, TRY TO GET SCHOOL CALENDAR DATASTORE
            await getDataStore(schoolCalendarKey).then((callendar) => {
                setCalendarValues(callendar)

                setDataStoreStatus({
                    not_found_calendar: false,
                    not_found_config: false
                })
            }).catch(() => {
            }).finally(() => {
                setLoading(false)
            })
        }).catch(() => {
            setLoading(false)
        })
    }
    return { setupDataStore, loading, error, errorProgram }
}
export { useSetupDataStore }