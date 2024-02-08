import { useEffect, useState } from 'react';
import { Row } from 'antd';
import { useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { state } from '../../redux/slices/issueSlice';
import CardCol from '../CardCol';
import getIssueCols from './utils';

const CardBlock: React.FC = () => {
  const { issues: allIssues, url } = useSelector(state);
  const [boardData, setBoardData] = useState<CardCol[]>();

  useEffect(() => {
    const localData = localStorage.getItem(url);

    if (!localData) {
      setBoardData(issueCols);
    } else {
      setBoardData(JSON.parse(localData));
    }
  }, [allIssues]);

  const issueCols: CardCol[] = getIssueCols(allIssues);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedElem = document.getElementById(draggableId);
    if (!draggedElem) return;
    draggedElem.style.boxShadow = '';

    let startColumn = boardData?.find((col) => col.id === source.droppableId);
    let endColumn = boardData?.find(
      (col) => col.id === destination.droppableId,
    );
    const startIssues = startColumn?.issues;
    const endIssues = endColumn?.issues;
    const issue = startIssues?.find((issue) => issue.number === +draggableId);
    startIssues?.splice(source.index, 1);
    endIssues?.splice(destination.index, 0, issue as CardProps);

    const updatedStartColumn = {
      ...(startColumn as CardCol),
      issues: startIssues as CardProps[],
    };

    const updatedEndColumn = {
      ...(endColumn as CardCol),
      issues: endIssues as CardProps[],
    };

    startColumn = updatedStartColumn;
    endColumn = updatedEndColumn;

    setBoardData(boardData);
    localStorage.setItem(url, JSON.stringify(boardData));
  };

  const onDragStart = (result: any) => {
    const { draggableId } = result;

    const draggedElem = document.getElementById(draggableId);
    if (!draggedElem) return;
    draggedElem.style.boxShadow = '0px 1px 10px 1px #1677ff';
  };

  return (
    <div
      className='cardBlock'
      style={{ width: '100%' }}>
      <Row>
        <DragDropContext
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}>
          {boardData?.map((col) => (
            <CardCol
              key={col.id}
              {...col}
            />
          ))}
        </DragDropContext>
      </Row>
    </div>
  );
};

export default CardBlock;
