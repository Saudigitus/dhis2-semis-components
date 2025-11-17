import { ProgramConfig } from "dhis2-semis-types";

export function applyProgramTranslations (programData: ProgramConfig, locale: string) {
    const translationMap = new Map(); // id -> { property, value }

    // Função auxiliar para coletar traduções
    function collectTranslations(obj: any, idKey = 'id') {
        if (!obj || !obj.translations || !obj[idKey]) return;
        obj.translations.forEach((t: any) => {
            if (t.locale === locale) {
                const key = `${obj[idKey]}|${t.property}`;
                translationMap.set(key, t.value);
            }
        });
    }

    // 1. Coletar traduções de Tracked Entity Attributes
    programData.programTrackedEntityAttributes.forEach(ptea => {
        const tea = ptea.trackedEntityAttribute;
        if (tea) collectTranslations(tea);
    });

    // 2. Coletar traduções de Data Elements
    programData.programStages.forEach(stage => {
        stage.programStageDataElements.forEach(psde => {
            const de = psde.dataElement;
            if (de) {
                collectTranslations(de);
                // Coletar traduções de options
                if (de.optionSet && de.optionSet.options) {
                    de.optionSet.options.forEach(option => {
                        collectTranslations(option, 'value'); // options usam 'value' como ID
                    });
                }
            }
        });
    });

    // 3. Aplicar traduções
    function applyToObject(obj: any, id: string, targetProp: any, translationProp: any) {
        if (!obj || !id) return;
        const translated = translationMap.get(`${id}|${translationProp}`);
        if (translated) {
            obj[targetProp] = translated;
        }
    }

    // Aplicar em Tracked Entity Attributes
    programData.programTrackedEntityAttributes.forEach(ptea => {
        const tea = ptea.trackedEntityAttribute;
        if (tea) {
            applyToObject(tea, tea.id, 'displayName', 'FORM_NAME');
            applyToObject(tea, tea.id, 'formName', 'FORM_NAME'); // opcional
        }
    });

    // Aplicar em Data Elements
    programData.programStages.forEach(stage => {
        stage.programStageDataElements.forEach(psde => {
            const de = psde.dataElement;
            if (de) {
                applyToObject(de, de.id, 'displayName', 'FORM_NAME');
                applyToObject(de, de.id, 'formName', 'FORM_NAME');

                // Aplicar em Options
                if (de.optionSet && de.optionSet.options) {
                    de.optionSet.options.forEach(option => {
                        // Prioridade: NAME > FORM_NAME
                        const translatedName = translationMap.get(`${option.value}|NAME`) ||
                            translationMap.get(`${option.value}|FORM_NAME`);
                        if (translatedName) {
                            option.label = translatedName;
                        }
                    });
                }
            }
        });
    });

    return programData; // retorna o mesmo objeto modificado
}
