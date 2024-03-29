import { Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import calcDays from './utils';

const CardItem: React.FC<CardProps> = ({
  title,
  user,
  number,
  updated_at,
  comments,
  index,
}) => {
  return (
    <Draggable
      draggableId={String(number)}
      index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Card
            id={String(number)}
            className='card'
            title={title}
            bordered={false}
            style={{ width: '100%', margin: '16px 0' }}>
            <p className='ant-card-body-info'>
              #{number} opened {calcDays(updated_at)} days ago
            </p>
            <p className='ant-card-body-meta'>
              {user.type} | Comments: {comments}
            </p>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
