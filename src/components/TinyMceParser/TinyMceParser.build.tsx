import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';

import { ITinyMceParserProps } from './TinyMceParser.config';

const TinyMceParser: FC<ITinyMceParserProps> = ({ style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  return (
    <span ref={connect} style={style} className={cn(className, classNames)}>
      Your Fav TinyMCE Parser !!!
    </span>
  );
};

export default TinyMceParser;
