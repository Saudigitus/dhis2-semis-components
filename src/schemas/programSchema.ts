import { atom } from "recoil"
import { ProgramConfig } from "dhis2-semis-types"

export const ProgramConfigState = atom<ProgramConfig[]>({
    key: "programConfig-get-state",
    default: []
})