import Lottie from "lottie-react";
import loading from '../../../assets/animations/loading.json'
import LinearBuffer from "./linearProgress";
import download from '../../../assets/animations/download.json'
import upload from '../../../assets/animations/upload.json'
import styles from '../modal/modal.module.css'
import ModalComponent from "../../../components/modal/Modal";

export default function ModalProgress({ progress, open, setOpen }: { progress: { prorocess: string, progress: number, buffer: number }, open: boolean, setOpen: (args: boolean) => void }) {

    const style = {
        height: 340,
    };

    return (
        <ModalComponent
            open={open}
            handleClose={() => setOpen(false)}
            title={progress.prorocess == 'export' ? 'Exporting progress' : 'Importing progress'}
            children={
                <div className={styles.loadingContainer}>
                    <div className={styles.linearProgress}>
                        <LinearBuffer progress={progress} />
                        <span className={styles.percentagem} >{Math.round(progress.progress)}%</span>
                    </div>
                    <div className={styles.studentSeek}>
                        {
                            progress.prorocess === 'export' ?
                                <Lottie style={style} className={styles.visble} animationData={download} loop={true} />
                                : <Lottie style={style} className={styles.visble} animationData={upload} loop={true} />
                        }
                    </div>
                    <div className={styles.loading} >
                        <span>{progress.prorocess == 'export' ? 'Exporting' : 'Importing'}  enrollment data</span>
                        <Lottie style={{ height: 100, marginLeft: "-40px" }} animationData={loading} loop={true} />
                    </div>
                </div>
            }
        />
    )
}