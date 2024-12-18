import { saveAs } from 'file-saver'
import { excelProps } from '../../../../types/bulk/bulkOperations';
import excelWorker from './excelWorker?worker';

export function generateFile({ unavailableDays, setProgress }: { unavailableDays: (date: Date) => boolean, setProgress: (args: any) => void }) {

    async function excelGenerator(props: excelProps) {
        const { fileName } = props
        const worker = new excelWorker();

        worker.onmessage = (e: MessageEvent) => {
            const { buffer } = e.data;
            setProgress({ progress: 110 })
            saveAs(new Blob([buffer]), fileName + ".xlsx")
            worker.terminate();
        };

        worker.postMessage({ props: { ...props }, unavailableDays: unavailableDays });
    }

    return { excelGenerator }
}