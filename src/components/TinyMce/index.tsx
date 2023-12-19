import config, { ITinyMceProps } from './TinyMce.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './TinyMce.build';
import Render from './TinyMce.render';

const TinyMce: T4DComponent<ITinyMceProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

TinyMce.craft = config.craft;
TinyMce.info = config.info;
TinyMce.defaultProps = config.defaultProps;

export default TinyMce;
