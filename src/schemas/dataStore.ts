import { unknown, z } from "zod"
import { studentDataStoreSchema } from "./studentSchema";
import { staffDataStoreSchema } from "./staffSchema";
import { atom } from "recoil";

const cleanEmptyErrors = (obj: any): object => {
    if (Array.isArray(obj)) {
        return obj.map(cleanEmptyErrors);
    } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            if (key === '_errors' && Array.isArray(obj[key]) && obj[key].length === 0) {
                delete obj[key]; // Remove a chave _errors se for um array vazio
            } else {
                cleanEmptyErrors(obj[key]); // Continua verificando recursivamente
            }
        }
    }
    return obj; // Retorna o objeto atualizado
}

const dataStoreShema = z.array(
    z.union([studentDataStoreSchema, staffDataStoreSchema])
);

type DataStoreProps = z.infer<typeof dataStoreShema>

const dataStoreSchemaValidator = (dataSoreResult: unknown) => {
    const validationResult = dataStoreShema.safeParse(dataSoreResult);

    if (!validationResult.success) {
        const formattedErrors = validationResult.error.format();

        // Limpando os erros
        const cleanedErrors: any = cleanEmptyErrors(formattedErrors)

        // Inclui erros gerais (_errors) no nível do objeto
        if (formattedErrors._errors?.length) {
            cleanedErrors._general = formattedErrors._errors[0]; // Adiciona erro geral
        }

        return { current: dataSoreResult, expected: cleanedErrors, isAllOptional: true }
    }

    return validationResult.success;
}

const DataStoreState = atom<DataStoreProps>({
    key: "data-store-state"
})

export { dataStoreShema, dataStoreSchemaValidator, DataStoreState };
export type { DataStoreProps };
