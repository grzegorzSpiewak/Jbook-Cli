import './resizable.css';
import { FunctionComponent, useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: FunctionComponent<ResizableProps> = ({ direction, children }): JSX.Element => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const listener = (): void => {
      if (timer) {
        clearTimeout(timer);
      }
      
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      resizeHandles: ['e'],
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
      width,
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      minConstraints: [Infinity, innerHeight * 0.05],
      maxConstraints: [Infinity, innerHeight * 0.9],
    };
  }
  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;