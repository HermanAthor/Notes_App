"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

const Tiptap = ({ receipe, onChange }) => {
  const editor = useEditor({
    extensions: [
      Image.configure({
        inline: true,
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
          HTMLAttributes: {
            class: "list-disc",
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
          HTMLAttributes: {
            class: "list-decimal",
          },
        },
      }),
    ],
    content: receipe,
    editorProps: {
      attributes: {
        class:
          "rounded-none border min-h-[350px] border-input dark:bg-black dark:text-gray-400 bg-white text-black p-5 text-xl",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });
  return (
    <div className="flex flex-col justify-stretch min-h-[150px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
