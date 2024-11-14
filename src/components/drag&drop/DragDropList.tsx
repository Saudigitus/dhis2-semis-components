import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragDropItems from './DragDropItems.js';
import { DragDropListProps } from '../../types/drag&drop/drag&drop.js';

function DragDropList(props: DragDropListProps) {
    const { listItems, checkable = true, width, title, setListItems } = props;

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(listItems);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);

        setListItems(reorderedItems);
    };

    function handleToggle(id: string) {
        const localColumns = [...listItems]

        if (id === 'all') {
            const all = localColumns?.filter(x => x.visible == false)?.length
            let copy: any[] = []

            if (all === 0)
                for (let i = 0; i < localColumns.length; i++)
                    copy[i] = { ...listItems[i], visible: false }
            else
                for (let i = 0; i < localColumns.length; i++)
                    copy[i] = { ...listItems[i], visible: true }

            setListItems(copy)
        } else {
            const index = localColumns.findIndex(column => column.id === id);
            localColumns[index] = { ...localColumns[index], visible: !(localColumns[index].visible) };
            setListItems(localColumns)
        }
    };

    return (
        <DragDropContext
            onDragEnd={(result: any) => handleOnDragEnd(result)}
        >
            <Droppable key={'any'} droppableId={'any'}>
                {(provided: any) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ width: width, padding: "5px 20px 5px 20px", borderRadius: "4px", backgroundColor: "#fff", overflow: "auto" }}
                    >
                        <DragDropItems
                            checkable={checkable}
                            handleToggle={handleToggle}
                            id={'all'}
                            text={title}
                            visible={listItems?.filter(x => x.visible == false)?.length == 0}
                        />
                        {
                            listItems.map(({ id, displayName, visible }: any, index: number) => (
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided: any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{ ...provided.draggableProps.style }}
                                        >
                                            <DragDropItems
                                                checkable={checkable}
                                                id={id}
                                                text={displayName}
                                                visible={visible}
                                                handleToggle={handleToggle}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DragDropList
