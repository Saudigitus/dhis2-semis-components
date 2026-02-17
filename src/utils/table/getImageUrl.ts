import { useConfig } from "@dhis2/app-service-config"

export const GetImageUrl = () => {
    const { baseUrl } = useConfig()

    function imageUrl({ trackedEntity, attribute, program }: { attribute: string, trackedEntity: string, program: string }) {
        return `${baseUrl}/api/tracker/trackedEntities/${trackedEntity}/attributes/${attribute}/image?program=${program}&dimension=MEDIUM`
    }

    return {
        imageUrl
    }
}