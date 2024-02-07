import { useEffect, useState } from 'react';
import { Row } from 'antd';
import { useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { issues } from '../../redux/slices/issueSlice';
import CardCol from '../CardCol';

const CardBlock = () => {
  const allIssues = useSelector(issues);
  const [boardData, setBoardData] = useState<CardCol[]>();

  useEffect(() => {
    setBoardData(issueCols);
  }, [allIssues]);

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
  };

  const issueCols: CardCol[] = [
    {
      id: 'ToDo',
      issues: allIssues?.filter(
        (issue: FetchProps) =>
          issue.state === 'open' && !issue.assignees.length,
      ),
    },
    {
      id: 'InProgress',
      issues: allIssues?.filter(
        (issue: FetchProps) => issue.state === 'open' && issue.assignees.length,
      ),
    },
    {
      id: 'Done',
      issues: allIssues?.filter(
        (issue: FetchProps) => issue.state === 'closed',
      ),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          {boardData?.map((col) => (
            <CardCol
              key={col.id}
              {...col}
            />
          ))}
        </Row>
      </DragDropContext>
    </div>
  );
};

export default CardBlock;
