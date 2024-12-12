import { z } from "zod"
import { atom } from "recoil";

const headerValuesSchema = z.object({
    selectedAcademicYear: z.object({
        label: z.string(),
        value: z.string()
    }),
    selectedClass: z.object({
        label: z.string(),
        value: z.string()
    }),
    selectedGrade: z.object({
        label: z.string(),
        value: z.string()
    }),
    selectedOu: z.object({
        label: z.string(),
        value: z.string()
    })
})

export type HeaderValuesProps = z.infer<typeof headerValuesSchema>

export const HeaderValuesState = atom<HeaderValuesProps>({
    key: "data-store-state",
    default: {
        selectedAcademicYear: { label: "", value: "" },
        selectedClass: { label: "", value: "" },
        selectedOu: { label: "", value: "" },
        selectedGrade: { label: "", value: "" },
    }
})