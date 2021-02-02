import './cell-list-item.css';
import { FunctionComponent } from 'react';
import { Cell } from 'state';
import CodeCell from 'components/code-cell';
import TextEditor from 'components/text-editor';
import ActionBar from 'components/action-bar';
 

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: FunctionComponent<CellListItemProps> = ({ cell }) => {
  const { type } = cell;
  const child: JSX.Element = type === 'code' ? 
    <>
      <div className='action-bar-wrapper'>
        <ActionBar id={cell.id} />
      </div>
      <CodeCell cell={cell}/>
    </>
  : 
    <>
      <div>
        <TextEditor cell={cell}/>
        <ActionBar id={cell.id} />
      </div>
    </>;

  return (
    <div className='cell-list-item'>
      { child }
    </div>
  );
};

export default CellListItem;