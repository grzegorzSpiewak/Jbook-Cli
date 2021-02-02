import './action-bar.css';
import { FunctionComponent } from 'react';
import { useActions } from 'hooks';

interface ActionBarPros {
  id: string;
}

const ActionBar: FunctionComponent<ActionBarPros> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  const moveCellUp = () => moveCell(id, 'up');
  const moveCellDown = () => moveCell(id, 'down');
  const delCell = () => deleteCell(id);

  return (
    <div className='action-bar'>
      <button 
        className='button is-primary is-small'
        onClick={moveCellUp}
      >
        <span className='icon'>
          <i className='fas fa-arrow-up'/>
        </span>
      </button>
      <button
        className='button is-primary is-small'
        onClick={moveCellDown}
      >
        <span className='icon'>
          <i className='fas fa-arrow-down'/>
        </span>
      </button>
      <button
        className='button is-primary is-small'
        onClick={delCell}
      >
        <span className='icon'>
          <i className='fas fa-times'/>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;