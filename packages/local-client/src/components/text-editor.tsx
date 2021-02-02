import './text-editor.css';
import { Cell } from 'state';
import { FunctionComponent, useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useActions } from 'hooks';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: FunctionComponent<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current && 
        event.target && 
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });
    
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  const onClick = () => setEditing(true);

  if (editing) {
    return (
      <div className='text-editor' ref={ref}>
        <MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || '')}/>
      </div>
    );
  }
  return (
    <div className='text-editor card' onClick={onClick}>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'edit'}/> 
      </div>
    </div>
  );
};

export default TextEditor;