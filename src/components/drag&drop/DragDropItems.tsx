import { Checkbox, IconReorder24 } from '@dhis2/ui';
import TableCell from '@material-ui/core/TableCell';
import styles from './DragDropItems.module.css'
import { DragDropItemsProps } from '../../types/table/ConfigColumnsProps';

function DragDropItems(props: DragDropItemsProps) {
    const { handleToggle, id, text, checkable, reordable } = props;

    return (
        <tr key={props.id} tabIndex={-1} className={styles.tr} >
            <TableCell component="th" scope="row">
                {checkable ?
                    <Checkbox
                        checked={props.visible}
                        tabIndex={-1}
                        onChange={() => { handleToggle(id) }}
                        label={text}
                        valid
                        dense
                    />
                    : <span>
                        {text}
                    </span>
                }
            </TableCell>
            <TableCell>
                {(reordable && id !== 'all') && <span className={styles.iconContainer} >
                    <IconReorder24 />
                </span>}
            </TableCell>
        </tr>
    )
}

export default DragDropItems
