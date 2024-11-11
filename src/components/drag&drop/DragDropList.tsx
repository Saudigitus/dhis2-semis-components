import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import DragDropItems from './DragDropItems.js';
import styles from './DragDropItems.module.css'

interface DragDropListProps {
    listItems: any[]
    handleUpdateListOrder?: (list: any[]) => void
    handleToggle: (id: string) => void
    width?: string
    checkable?: boolean
    reordable?: boolean
    title: string
    style?: any
    setListItems: any
}

function DragDropList(props: DragDropListProps) {
    const { listItems, handleToggle, checkable = true, width, reordable = true, title, style, setListItems } = props;
    const [list, setList] = useState(listItems)

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(list);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);

        setList(reorderedItems);
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
                        style={{ width: width, ...style, padding: "5px 20px 5px 20px" }}
                    >
                        <DragDropItems
                            checkable={checkable}
                            handleToggle={handleToggle}
                            id={'all'}
                            reordable={reordable}
                            text={title}
                            visible={true}
                        />
                        
                        {
                            list.map(({ id, header, visible }, index) => (
                                <Draggable false key={id} draggableId={id} index={index}>
                                    {(provided: any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <DragDropItems
                                                checkable={checkable}
                                                handleToggle={handleToggle}
                                                id={id}
                                                reordable={reordable}
                                                text={header}
                                                visible={visible}
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
