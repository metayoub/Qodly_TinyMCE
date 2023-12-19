import config, { ITinyMceParserProps } from './TinyMceParser.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './TinyMceParser.build';
import Render from './TinyMceParser.render';

const TinyMceParser: T4DComponent<ITinyMceParserProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

TinyMceParser.craft = config.craft;
TinyMceParser.info = config.info;
TinyMceParser.defaultProps = config.defaultProps;

export default TinyMceParser;
