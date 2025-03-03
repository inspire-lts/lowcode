import {Context} from '../../interface';
import ButtonDev from './dev';
import ButtonProd from './prod';

export default (ctx: Context) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      ctx.registerComponent('Button', {
        name: 'Button',
        desc: '按钮',
        defaultProps: {
          text: {type: 'static', value: '按钮'},
        },
        dev: ButtonDev,
        prod: ButtonProd,
        setter: [
          {
            name: 'type',
            label: '按钮类型',
            type: 'select',
            options: [
              {label: '主按钮', value: 'primary'},
              {label: '次按钮', value: 'default'},
            ],
          },
          {
            name: 'text',
            label: '文本',
            type: 'input',
          },
        ],
        methods: [
          {
            name: 'startLoading',
            desc: '开始loading',
          },
          {
            name: 'endLoading',
            desc: '结束loading',
          },
        ],
        events: [
          {
            name: 'onClick',
            desc: '点击事件',
          },
        ],
        order: 2,
      });
      resolve({});
    }, 1000);
  });
};
