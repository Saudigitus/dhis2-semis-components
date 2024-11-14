import { Checkbox, IconReorder24 } from '@dhis2/ui';
import styles from './DragDropItems.module.css'
import { DragDropItemsProps } from '../../types/table/ConfigColumnsProps';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';

function DragDropItems(props: DragDropItemsProps) {
    const { handleToggle, id, text, checkable, visible } = props;

    return (
        <div key={props.id} className={classNames(id == 'all' ? styles.title : styles.container, "row d-flex")} >
            <div className="col-12 col-md-6 d-flex">
                {checkable ?
                    <Checkbox
                        checked={visible}
                        onChange={() => { handleToggle(id) }}
                        label={text}
                        valid
                        dense
                    />
                    : <span>
                        {text}
                    </span>
                }
            </div>
            <div className="col-12 col-md-6">
                {(id !== 'all') && <span className={styles.iconContainer} >
                    <IconReorder24 />
                </span>}
            </div>
        </div>
    )
}

export default DragDropItems
