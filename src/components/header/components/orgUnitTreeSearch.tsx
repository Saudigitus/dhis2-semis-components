import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { OuQueryString } from "../../../schemas/headerSearchInputSchema";
import { useDataQuery } from "@dhis2/app-runtime";
import { SearchOu } from "../../../types/header/ouQueryParams";
import { Center, CircularLoader, Help, Input, Menu } from "@dhis2/ui";
import OrgUnitTreeComponent from "./orgUnitTree";
import style from "../mainHeader.module.css"


const OrgUnitTree = ({ onChange, stringQuery }) => {
    const [key, setKey] = useState<any>(undefined);

    const { loading, data, error } = useDataQuery<{ orgUnits: { organisationUnits: [{ id: string, displayName: string }] } }>(
        useMemo(
            () => ({
                orgUnits: {
                    resource: 'me',
                    params: {
                        fields: ['organisationUnits[id,path]'],
                    },
                },
            }),
            [],
        ),
    );

    const { loading: searchLoading, data: searchData, refetch: refetchOrg, error: searchError } = useDataQuery<{ orgUnits: { organisationUnits: [SearchOu] } }>(
        useMemo(
            () => ({
                orgUnits: {
                    resource: 'organisationUnits',
                    params: ({ variables: { stringQuery: currentSearchText } }) => ({
                        fields: [
                            'id,displayName,path,publicAccess,access,lastUpdated',
                            'children[id,displayName,publicAccess,access,path,children::isNotEmpty]',
                        ].join(','),
                        paging: true,
                        query: currentSearchText,
                        withinUserSearchHierarchy: true,
                        pageSize: 15,
                    }),

                },
            }),
            [],
        ),
        { lazy: true },
    );

    const ready = stringQuery?.length ? !searchLoading : !loading;

    useEffect(() => {
        // Define um temporizador (timeout) de 500 milissegundos
        const timeoutId = setTimeout(() => {
            // O código dentro deste bloco será executado após 500 milissegundos
            if (stringQuery?.length) {
                refetchOrg({ variables: { stringQuery } });
                setKey(`${stringQuery}-${new Date().getTime()}`);
            }
        }, 500);

        // Limpa o temporizador existente antes de definir um novo
        return () => clearTimeout(timeoutId);
    }, [refetchOrg, stringQuery]);

    if (error != null || searchError != null) {
        return (
            <Help error>
                Something went wrong when loading the organisation units!
            </Help>
        )
    }

    if (loading || searchLoading) {
        return (
            <Center>
                <CircularLoader small />
            </Center>
        )
    }


    const renderOrgUnitTree = () => {
        if (stringQuery?.length) {
            return (<OrgUnitTreeComponent
                roots={searchData?.orgUnits?.organisationUnits as unknown[]}
                onSelectClick={onChange}
                treeKey={key}
            />);
        }
        return (<OrgUnitTreeComponent
            roots={data?.orgUnits?.organisationUnits as unknown[]}
            onSelectClick={onChange}
            treeKey={'initial'}
            previousOrgUnitId={[]}
        />);
    };

    return (
        <>
            {renderOrgUnitTree()}
        </>
    )
}

const OrgUnitTreeSearch = ({ onChange }) => {
    const [stringQuery, setStringQuery] = useRecoilState(OuQueryString)
    const onChangeQuerySearch = (e: { value: string, name: string }) => {
        setStringQuery(e.value);
    }

    return (
        <div style={{ width: 400, minHeight: 400 }} onClick={(e) => e.stopPropagation()}>
            <Menu>
                <div onClick={(e) => e.stopPropagation()}>
                    <div className={style.SimpleSearcInputContainer} >
                        <Input onChange={onChangeQuerySearch} value={stringQuery} initialFocus dense placeholder={"Search for a school"} name="input" />
                    </div>
                    <OrgUnitTree onChange={onChange} stringQuery={stringQuery} />
                </div>
            </Menu>
        </div>
    )
}
export default OrgUnitTreeSearch