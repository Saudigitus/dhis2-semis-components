import { useConfig } from "@dhis2/app-service-config"

export const GetImageUrl = () => {
    const { baseUrl } = useConfig()

    function imageUrl({ trackedEntity, attribute, program, apiVersion }: { attribute: string, trackedEntity: string, program: string, apiVersion: number }) {
        if (apiVersion == 39)
            return `${baseUrl}/api/trackedEntityInstances/${trackedEntity}/${attribute}/image?dimension=MEDIUM`

        return `${baseUrl}/api/tracker/trackedEntities/${trackedEntity}/attributes/${attribute}/image?program=${program}&dimension=MEDIUM`

    }

    return {
        imageUrl
    }
}