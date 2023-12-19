import cn from 'classnames';
import { useRef } from 'react';
import { ITinyMceProps } from './TinyMce.config';
import { useEnhancedNode } from '@ws-ui/webform-editor';
import { FC } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

const TinyMce: FC<ITinyMceProps> = ({ apiKey, style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const editorRef = useRef<TinyMCEEditor | null>(null);
  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {apiKey && apiKey !== '' ? (
        <Editor
          disabled={true}
          apiKey={apiKey}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: '100%',
            width: '100%',
            resize: false,
            menubar: false,
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
            ],
            toolbar:
              'undo redo | blocks | bold italic underline strikethrough | fontfamily fontsize | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat  | charmap emoticons | fullscreen  preview save print | image media template link codesample | ltr rtl',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      ) : (
        <div>Please set you API Key !!!</div>
      )}
    </div>
  );
};

export default TinyMce;
