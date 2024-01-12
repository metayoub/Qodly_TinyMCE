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
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...DEFAULT_SETTINGS,
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow'),
];

export default Settings;
