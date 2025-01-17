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
        id: z.string(),
        displayName: z.string(),
        selected: z.array(z.string())
    })
})

export type HeaderValuesProps = z.infer<typeof headerValuesSchema>

export const HeaderValuesState = atom<HeaderValuesProps>({
    key: "header-values-state",
    default: {
        selectedAcademicYear: { label: "", value: "" },
        selectedClass: { label: "", value: "" },
        selectedOu: { id: "", displayName: "", selected: [] },
        selectedGrade: { label: "", value: "" },
    }
})