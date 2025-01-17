import { atom } from "recoil"

export type ProgramConfig = {
    displayName: string;
    id: string;
    description: string;
    access?: any; // This remains optional due to `.optional()` in the schema.
    programType: string;
    programStages: {
        autoGenerateEvent: boolean;
        displayName: string;
        id: string;
        programStageDataElements: {
            displayInReports: boolean;
            compulsory: boolean;
            dataElement: {
                displayName: string;
                id: string;
                valueType: string;
                optionSet: {
                    id: string;
                    options: {
                        value: string;
                        label: string;
                    };
                };
            };
        }[];
    }[];
    programTrackedEntityAttributes: {
        trackedEntityAttribute: {
            generated: boolean;
            pattern?: string; // This remains optional due to `.optional()` in the schema.
            displayName: string;
            id: string;
            valueType: string;
            optionSet: {
                id: string;
                options: {
                    value: string;
                    label: string;
                };
            };
        };
        searchable: boolean;
        displayInList: boolean;
        mandatory: boolean;
    }[];
    trackedEntityType: {
        trackedEntityTypeAttributes: {
            trackedEntityAttribute: {
                id: string;
            };
        }[];
        id: string;
    };
};


export const ProgramConfigState = atom<ProgramConfig[]>({
    key: "programConfig-get-state",
    default: []
})