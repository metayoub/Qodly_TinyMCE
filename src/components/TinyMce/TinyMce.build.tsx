import cn from 'classnames';
import { useRef, useState, useEffect } from 'react';
import { ITinyMceProps } from './TinyMce.config';
import { useEnhancedNode } from '@ws-ui/webform-editor';
import { FC } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

const TinyMce: FC<ITinyMceProps> = ({
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
  datasource,
  liteVersion,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const init = {
    toolbar_location: toolbarLocation,
    height: style?.height || '100%',
    skin: dark ? 'oxide-dark' : 'oxide',
    content_css: dark ? 'dark' : '',
    width: style?.width || '100%',
    resize: resize,
    menubar: menubar,
    inline: inline,
    readonly: readonly,
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

  // rendering when changing
  const [key, setKey] = useState(0);
  useEffect(() => {
    // Increment the key to remount the component
    setKey((prevKey) => prevKey + 1);
  }, [
    toolbarLocation,
    resize,
    readonly,
    menubar,
    inline,
    browserSpellcheck,
    statusbar,
    style,
    dark,
    liteVersion,
    button,
  ]);

  const editorRef = useRef<TinyMCEEditor | null>(null);
  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {apiKey && apiKey !== '' && datasource ? (
        <Editor
          disabled={readonly}
          apiKey={apiKey}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue="<p><em>Hello</em>, <span style='text-decoration: underline;'><strong>World!</strong></span></p>" // make it dynamic as a place holder
          init={init}
          key={key}
        />
      ) : (
        <div>
          <p>{!apiKey && 'Please set you API Key !!!'}</p>
          <p>{!datasource && 'Missing DataSource !!!'}</p>
        </div>
      )}
    </div>
  );
};

export default TinyMce;
