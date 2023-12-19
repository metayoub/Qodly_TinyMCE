import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { ITinyMceParserProps } from './TinyMceParser.config';
import './TinyMceParser.css';

const TinyMceParser: FC<ITinyMceParserProps> = ({ style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState(() => '');
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<string>();
      setValue(v);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  return (
    <span ref={connect} style={style} className={cn(className, classNames)}>
      {parse(value)}
    </span>
  );
};

export default TinyMceParser;
