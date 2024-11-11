import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDropListItem from './DragDropItems.js';
import { Paper } from '@material-ui/core';

interface DragDropListProps {
    listItems: any[]
    handleUpdateListOrder?: (list: any[]) => void
    handleToggle: (id: string) => void
    width?: string
    checkable?: boolean
    reordable?: boolean
    title: string
    style?: any
}

function DragDropList(props: DragDropListProps) {
    const { listItems, handleToggle, checkable = true, width, reordable = true, title, style } = props;

    return (
        <Paper elevation={0} style={{ width: width ?? '350px', ...style }} >
            <DndProvider backend={HTML5Backend}>
                <Table>
                    <TableHead>
                        <DragDropListItem
                            reordable={reordable}
                            checkable={checkable}
                            key={"all"}
                            id={"all"}
                            text={title}
                            handleToggle={handleToggle}
                            visible={listItems?.filter(x => x.visible == false)?.length == 0}
                        />
                    </TableHead>
                    <TableBody>
                        {listItems?.map((item) =>
                            <DragDropListItem
                                reordable={reordable}
                                checkable={checkable}
                                key={item.id}
                                id={item.id}
                                text={item.header}
                                handleToggle={handleToggle}
                                visible={item.visible}
                            />
                        )}
                    </TableBody>
                </Table>
            </DndProvider>
        </Paper>
    )
}

export default DragDropList
