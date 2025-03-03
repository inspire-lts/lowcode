import { Space as AntdSpace } from 'antd';
import type { SpaceSize } from 'antd/es/space';
import React from "react";
import { useDrop } from 'react-dnd';
import { ItemType } from '../../item-type';

interface Props {
  // 当前组件的子节点
  children: any;
  // 当前组件的id
  id: number;
  // 当前组件的尺寸
  size: SpaceSize;
  direction: 'horizontal' | 'vertical';
}

const Space: React.FC<Props> = ({ children, id, size, direction }) => {

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: [ItemType.Space, ItemType.Button, ItemType.Table, ItemType.SearchForm],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return;
      }

      return {
        id,
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  if (!children?.length) {
    return (
      <AntdSpace
        data-component-id={id}
        ref={drop}
        className='p-[16px]'
        style={{ border: canDrop ? '1px solid #ccc' : 'none', width: direction === 'vertical' ? '100%' : '' }}
      >
        暂无内容
      </AntdSpace>
    )
  }

  return (
    <AntdSpace 
      direction={direction}
      size={size}
      data-component-id={id}
      ref={drop}
      className='p-[16px]'
      style={{ border: canDrop ? '1px solid #ccc' : 'none', width: direction === 'vertical' ? '100%' : '' }}
    >
      {children}
    </AntdSpace>
  )
}

export default Space;