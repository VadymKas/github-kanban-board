import { Col, Flex } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import CardItem from '../CardItem';

const colStyle = {
  height: '76.5vh',  
  backgroundColor: '#ECECEC',
  borderRadius: '15px',
  padding: '16px',
  overflow: 'auto',
  boxShadow: '0px 1px 10px 1px rgba(0, 0, 0, 0.3)',
};

const CardCol: React.FC<CardCol> = ({ name, id, issues }) => {
  return (
    <Col
      xs={24}
      md={12}
      lg={8}
      style={{ padding: '16px' }}>
      <Flex style={colStyle} vertical align='center'>
        <h2>{name}</h2>
        <Droppable droppableId={id}>
          {(provided) => (
            <div style={{flex: 1, width: '100%'}}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {issues?.map((issue, index) => (
                <CardItem
                  key={issue.number}
                  {...issue}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Flex>
    </Col>
  );
};

export default CardCol;
