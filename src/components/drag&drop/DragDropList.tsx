import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDropListItem from './DragDropItems.js';
import { Paper } from '@material-ui/core';

interface DragDropListProps {
    listItems: any[]
    handleUpdateListOrder: (list: any[]) => void
    handleToggle: (id: string) => void
    width?: string
}

function DragDropList(props: DragDropListProps) {
    const { listItems, handleToggle, width } = props;

    return (
        <Paper elevation={0} style={{ width: width ?? '350px' }} >
            <DndProvider backend={HTML5Backend}>
                <Table>
                    <TableHead>
                        <DragDropListItem
                            key={"all"}
                            id={"all"}
                            text='Column'
                            handleToggle={handleToggle}
                            visible={listItems?.filter(x => x.visible == false)?.length == 0}
                        />
                    </TableHead>
                    <TableBody>
                        {listItems?.map((item) =>
                            <DragDropListItem
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
