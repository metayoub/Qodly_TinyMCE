import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';

import { ITinyMceParserProps } from './TinyMceParser.config';

const TinyMceParser: FC<ITinyMceParserProps> = ({
  style,
  datasource,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  return (
    <span ref={connect} style={style} className={cn(className, classNames)}>
      {datasource ? datasource : ' Your Fav TinyMCE Parser !!!}'}
    </span>
  );
};

export default TinyMceParser;
