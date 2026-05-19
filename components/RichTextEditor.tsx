'use client'

import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const modules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
}

const formats = ['header', 'bold', 'italic', 'underline', 'list']

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  return (
    <div className="rich-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
      <style jsx global>{`
        .rich-editor .ql-container {
          border-radius: 0 0 0.5rem 0.5rem;
          border-color: #E8DDD0;
          font-size: 0.875rem;
          min-height: 150px;
        }
        .rich-editor .ql-toolbar {
          border-radius: 0.5rem 0.5rem 0 0;
          border-color: #E8DDD0;
          background: #FAF7F2;
        }
        .rich-editor .ql-editor {
          min-height: 150px;
        }
      `}</style>
    </div>
  )
}
