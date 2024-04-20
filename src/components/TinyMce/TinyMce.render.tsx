import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useCallback } from 'react';
import { ITinyMceProps } from './TinyMce.config';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useRef, useState } from 'react';
import { CgDanger } from 'react-icons/cg';
import { debounce } from 'lodash';

const Tinymce: FC<ITinyMceProps> = ({
  apiKey,
  toolbarLocation,
  style,
  resize,
  menubar,
  inline,
  readonly,
  browserSpellcheck,
  statusbar,
  dark,
  button,
  liteVersion,
  className,
  classNames = [],
}) => {
  const { connect, emit } = useRenderer({
    omittedEvents: ['onchange'],
  });

  const {
    sources: { datasource: ds },
  } = useSources();

  const [value, setValue] = useState<string>(() => ds?.initialValue || '');

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

  const init = {
    toolbar_location: toolbarLocation,
    skin: dark ? 'oxide-dark' : 'oxide',
    content_css: dark ? 'dark' : '',
    height: style?.height || '100%',
    width: style?.width || '100%',
    resize: resize,
    menubar: menubar,
    inline: inline,
    disabled: readonly,
    browser_spellcheck: browserSpellcheck,
    statusbar: statusbar,
    autoresize_bottom_margin: 0, // make it dynamic
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'code',
      'emoticons',
      resize ? 'autoresize' : '',
    ],
    setup: function (editor: any) {
      button &&
        editor.ui.registry.addButton('mySendButton', {
          tooltip: 'Send Message',
          text: 'Send',
          onAction: function () {
            // bind it to an action
            alert(editor.getContent());
            editor.resetContent();
          },
        });
    },
    // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    toolbar: liteVersion
      ? 'bold italic strikethrough link numlist bullist blockquote emoticons image | mySendButton'
      : 'undo redo | blocks | bold italic underline strikethrough | fontfamily fontsize | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat  | charmap emoticons | fullscreen  preview save print | image media template link codesample | ltr rtl', // Customize last message
  };

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {apiKey && apiKey !== '' && ds ? (
        <Editor
          apiKey={apiKey}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue={ds?.initialValue || ''}
          value={value}
          onEditorChange={() => {
            handleChange(editorRef!.current!.getContent());
          }}
          init={init}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-purple-400 py-4 text-white">
          <CgDanger className="mb-1 h-8 w-8" />
          <p>{!apiKey && 'Missing the APIKey'}</p>
          <p>{!value && 'Missing datasource'}</p>
        </div>
      )}
    </div>
  );
};

export default Tinymce;
