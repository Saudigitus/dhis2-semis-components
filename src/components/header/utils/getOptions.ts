const getOptionsByDataElemet = (dataElement: string, program: any) => {
    const options = [];
    program?.programStages?.forEach((stage: any) => {
        stage.programStageDataElements.forEach(element => {
            if (element.dataElement.id === dataElement && element.dataElement.optionSet) {
                options.push(...element.dataElement.optionSet.options);
            }
        });
    });
    return options
}

export { getOptionsByDataElemet }