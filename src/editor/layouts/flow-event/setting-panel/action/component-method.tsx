import { Form, Select, TreeSelect } from 'antd';
import { useMemo } from 'react';
import { useComponentConfigStore } from '../../../../stores/component-config';
import { useComponetsStore } from '../../../../stores/components';
import { getComponentById } from '../../../../utils/utils';

const FormItem = Form.Item;

const ComponentMethodSetting = ({ values }: { values: any }) => {

  const { components } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const component = useMemo(() => {
    if (values?.config?.componentId) {
      return getComponentById(values?.config?.componentId, components);
    }
  }, [values?.config?.componentId])

  return (
    <>
      <FormItem label="组件" name={['config', 'componentId']}>
        <TreeSelect
          style={{ width: 240 }}
          treeData={components}
          fieldNames={{
            label: 'name',
            value: 'id',
          }}
        />
      </FormItem>
      {(componentConfig[component?.name || '']?.methods) && (
        <FormItem label="方法" name={['config', 'method']}>
          <Select
            style={{ width: 240 }}
            options={componentConfig[component?.name || ''].methods.map(
              (method: any) => ({ label: method.desc, value: method.name })
            )}
          />
        </FormItem>
      )}
    </>
  )
}

export default ComponentMethodSetting;