import './App.css';
import InputField from './components/InputField';
import CardBlock from './components/CardBlock';

function App() {
  return (
    <div className='App'>
      <h1 style={{ margin: '0 0 20px' }}>KANBAN BOARD</h1>
      <InputField />
      <CardBlock />
    </div>
  );
}

export default App;
