import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';
import {
  MdOutlineAutoMode,
  MdAlignVerticalBottom,
  MdOutlineAlignVerticalTop,
} from 'react-icons/md';
const commonSettings: TSetting[] = [
  {
    key: 'apiKey',
    label: 'APIKey',
    type: ESetting.TEXT_FIELD,
    defaultValue: '',
  },
  {
    key: 'toolbarLocation',
    label: 'Toolbar Location',
    type: ESetting.RADIOGROUP,
    defaultValue: 'top',
    options: [
      { value: 'top', icon: MdOutlineAlignVerticalTop },
      { value: 'bottom', icon: MdAlignVerticalBottom },
      { value: 'auto', icon: MdOutlineAutoMode },
    ],
  },
  {
    key: 'resize',
    label: 'Resize',
    type: ESetting.CHECKBOX,
    defaultValue: false,
  },
  {
    key: 'menubar',
    label: 'Menubar',
    type: ESetting.CHECKBOX,
    defaultValue: false,
  },
  {
    key: 'inline',
    label: 'Inline',
    type: ESetting.CHECKBOX,
    defaultValue: false,
  },
  {
    key: 'readonly',
    label: 'Readonly',
    type: ESetting.CHECKBOX,
    defaultValue: false,
  },
  {
    key: 'browserSpellcheck',
    label: 'Browser Spellcheck',
    type: ESetting.CHECKBOX,
    defaultValue: false,
  },
  {
    key: 'statusbar',
    label: 'Status Bar',
    type: ESetting.CHECKBOX,
    defaultValue: false,
  },
  {
    key: 'liteVersion',
    label: 'Lite Version',
    type: ESetting.CHECKBOX,
    defaultValue: false,
  },
  {
    key: 'dark',
    label: 'Dark Mode',
    type: ESetting.CHECKBOX,
    defaultValue: false,
  },
  {
    key: 'button',
    label: 'add Button',
    type: ESetting.CHECKBOX,
    defaultValue: false,
  },
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...load(DEFAULT_SETTINGS).filter(
    'appearance',
    'style.overflow',
    'color',
    'background',
    'font',
    'borders',
    'borderRadius',
  ),
];

console.log('BASIC_SETTINGS: ', BASIC_SETTINGS);

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter(
    'style.color',
    'style.backgroundColor',
    'style.overflow',
    'style.fontFamily',
    'style.fontWeight',
    'style.fontSize',
    'style.textAlign',
    'style.textTransform',
    'border',
    'borderRadius',
    'display',
  ),
];

export default Settings;
