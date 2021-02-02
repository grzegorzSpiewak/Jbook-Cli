import './add-cell.css';
import { FunctionComponent } from 'react';
import { useActions } from 'hooks';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FunctionComponent<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  const addCode = () => insertCellAfter(prevCellId, 'code');
  const addText = () => insertCellAfter(prevCellId, 'text');

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-rounded is-primary is-small'
          onClick={addCode}
        >
          <span className='icon'>
            <i className='fas fa-plus'/>
          </span>
          <span>
            Add Code
          </span>
        </button>
        <button
          className='button is-rounded is-primary is-small'
          onClick={addText}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus'/>
          </span>
          <span>
            Add Text
          </span>
        </button>
      </div>
      <div className='divider'/>
    </div>
  );
};

export default AddCell;