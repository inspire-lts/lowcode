import { Button, Collapse, Drawer } from 'antd';
import { useRef, useState } from 'react';
import { useComponetsStore } from '../../stores/components';

import { useComponentConfigStore } from '../../stores/component-config';
import FlowEvent from '../flow-event';


const ComponentEvent = () => {

  const { curComponent, curComponentId, updateComponentProps } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState('');

  const flowEventRef = useRef<any>();


  function save() {
    if (!curComponentId) return;

    const value = flowEventRef.current?.save();

    updateComponentProps(curComponentId, {
      [eventName]: value,
    });

    setOpen(false);
  }

  if (!curComponent) return null;

  return (
    <div className='px-[12px]'>
      {(componentConfig[curComponent.name]?.events || []).map((event: any) => {
        return (
          <Collapse key={event.name} defaultActiveKey={event.name}>
            <Collapse.Panel header={event.desc} key={event.name}>
              <div className='text-center'>
                <Button
                  onClick={() => {
                    setEventName(event.name);
                    setOpen(true);
                  }}
                  type='primary'
                >
                  设置事件流
                </Button>
              </div>
            </Collapse.Panel>
          </Collapse>
        )
      })}
      <Drawer
        title="设置事件流"
        width="100vw"
        open={open}
        zIndex={1005}
        onClose={() => { setOpen(false); }}
        extra={(
          <Button
            type='primary'
            onClick={save}
          >
            保存
          </Button>
        )}
        push={false}
        destroyOnClose
        styles={{ body: { padding: 0 } }}
      >
        <FlowEvent flowData={curComponent?.props?.[eventName]} ref={flowEventRef} />
      </Drawer>
    </div>
  )
}




export default ComponentEvent;