import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import TinyMceSettings, { BasicSettings } from './TinyMce.settings';
import { GrTextWrap } from 'react-icons/gr';

export default {
  craft: {
    displayName: 'TinyMCE',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(TinyMceSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Tinymce',
    exposed: true,
    icon: GrTextWrap,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      accept: ['string'],
    },
  },
  defaultProps: {
    apiKey: '',
    style: {
      height: '400px',
    },
  },
} as T4DComponentConfig<ITinyMceProps>;

export interface ITinyMceProps extends webforms.ComponentProps {
  apiKey?: string;
}
