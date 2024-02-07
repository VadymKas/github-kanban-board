import { Col } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import CardItem from '../CardItem';

const colStyle = {
  height: '83vh',
  backgroundColor: '#ECECEC',
  borderRadius: '15px',
  padding: '16px',
  overflow: 'auto',
  boxShadow: '0px 1px 10px 1px rgba(0, 0, 0, 0.3)',
};

const CardCol: React.FC<CardCol> = ({ id, issues }) => {
  return (
    <Col
      xs={24}
      md={12}
      lg={8}
      style={{ padding: '16px' }}>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <Col style={colStyle}>
              <h2 style={{ textAlign: 'center' }}>{id}</h2>
              {issues?.map((issue, index) => (
                <CardItem
                  key={issue.number}
                  {...issue}
                  index={index}
                />
              ))}
            </Col>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default CardCol;
