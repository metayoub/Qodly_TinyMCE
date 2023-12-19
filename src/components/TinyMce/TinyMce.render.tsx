import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useCallback } from 'react';
import { ITinyMceProps } from './TinyMce.config';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useRef, useState } from 'react';
import { debounce } from 'lodash';

const Tinymce: FC<ITinyMceProps> = ({ apiKey, style, className, classNames = [] }) => {
  const { connect, emit } = useRenderer({
    omittedEvents: ['onchange'],
  });

  const {
    sources: { datasource: ds },
  } = useSources();

  const [value, setValue] = useState(() => ds.initialValue || '');

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<string>();
      setValue(v);
      // editorRef.current?.setContent(v, { format: "html" });
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  const editorRef = useRef<TinyMCEEditor | null>(null);
  const debouncedEmit = useCallback(debounce(emit, 300), []);
  const handleChange = async (value: string) => {
    if (ds) {
      ds.setValue<string>(null, value);
    } else {
      setValue(value);
    }

    debouncedEmit('onchange');
  };

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {apiKey && apiKey !== '' && (
        <Editor
          apiKey={apiKey}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue={ds.initialValue || ''}
          value={value}
          onEditorChange={() => {
            handleChange(editorRef!.current!.getContent());
          }}
          init={{
            height: '100%',
            width: '100%',
            resize: false,
            menubar: false,
            plugins: [
              'print',
              'paste',
              'advlist',
              'importcss',
              'directionality',
              'autolink',
              'lists',
              'link',
              'noneditable',
              'textpattern',
              'quickbars',
              'emoticons',
              'toc',
              'image',
              'imagetools',
              'charmap',
              'preview',
              'anchor',
              'hr',
              'pagebreak',
              'nonbreaking',
              'searchreplace',
              'visualblocks',
              'visualchars',
              'code',
              'codesample',
              'fullscreen',
              'insertdatetime',
              'media',
              'template',
              'table',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | bold italic underline strikethrough | fontfamily fontsize | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat  | charmap emoticons | fullscreen  preview save print | image media template link codesample | ltr rtl',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      )}
    </div>
  );
};

export default Tinymce;
