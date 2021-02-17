import './cell-list.css';
import { FunctionComponent, Fragment, useEffect } from 'react';
import { useTypedSelector, useActions } from 'hooks';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

const CellList: FunctionComponent = () => {
  const cells = useTypedSelector(({ cells: { order, data }}) => order.map(id =>  data[id]));
  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem 
        cell={cell}
      />
      <AddCell 
        prevCellId={cell.id} 
      />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell
        prevCellId={null}
        forceVisible={cells.length === 0}
      />
      {renderedCells}
    </div>
  );
};

export default CellList;