"use client";

import "./style.css";
import "./code-block-theme.css";

import { useEditor, EditorContent } from "@tiptap/react";
import { ExtensionKit } from "./extension-kit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { TextStyle } from "./ui/text-style";
import { useEffect, useState } from "react";
import { FontFamily } from "./ui/font-family";
import { FontWeight } from "./ui/font-weight";
import { FontItalic } from "./ui/font-italic";
import { FontUnderline } from "./ui/font-underline";
import { FontSize } from "./ui/font-size";
import { ListBullet } from "./ui/list-bullet";
import { ListOrdered } from "./ui/list-ordered";
import { ListTask } from "./ui/list-task";
import { FontColor } from "./ui/font-color";
import { FontHighlighter } from "./ui/font-highlight";
import { FontStrike } from "./ui/font-strike";
import { TextAlign } from "./ui/text-align";
import { FontSubscript } from "./ui/font-subscript";
import { FontSuperscript } from "./ui/font-superscript";
import { FontCode } from "./ui/font-code";
import { TextCodeBlock } from "./ui/text-code-block";
import { LinkBubble } from "./ui/link-bubble";
import { LinkDialog } from "./ui/link-dialog";
import { LinkContext } from "./context/link-context";
import { LinkDialogYoutube } from "./ui/link-dialog-youtube";
import { HistoryUndo } from "./ui/history-undo";
import { HistoryRedo } from "./ui/history-redo";
import { LinkDialogImage } from "./ui/link-dialog-image";

export const EditorBlock = () => {
  const [linkOpen, setLinkOpen] = useState(false);

  const editor = useEditor({
    extensions: ExtensionKit(),
    autofocus: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autcapitalize: "off",
        class: "prose focus:outline-none max-w-none",
      },
    },
  });

  useEffect(() => {
    // Fill the editor on unmount
    return () => {
      editor && editor.destroy();
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <LinkContext.Provider value={{ open: linkOpen, setOpen: setLinkOpen }}>
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="sr-only">
          <CardTitle className="sr-only">Rich Text Editor</CardTitle>
          <CardDescription className="sr-only">
            Write your content
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-1 flex items-center gap-1 border-b divide-x *:pl-1 first:pl-0">
            <TextStyle editor={editor} />
            <FontFamily editor={editor} />
            <FontSize editor={editor} />

            <div className="flex space-x-1">
              <FontWeight editor={editor} />
              <FontItalic editor={editor} />
              <FontUnderline editor={editor} />
              <FontStrike editor={editor} />
              <FontCode editor={editor} />
              <FontColor editor={editor} />
              <FontHighlighter editor={editor} />
              <FontSubscript editor={editor} />
              <FontSuperscript editor={editor} />
            </div>

            <div className="flex space-x-1">
              <ListBullet editor={editor} />
              <ListOrdered editor={editor} />
              <ListTask editor={editor} />
            </div>

            <div className="flex space-x-1">
              <TextAlign editor={editor} />
              <TextCodeBlock editor={editor} />
              <LinkDialog editor={editor} />
              <LinkDialogImage editor={editor} />
              <LinkDialogYoutube editor={editor} />
            </div>

            <div className="flex space-x-1">
              <HistoryUndo editor={editor} />
              <HistoryRedo editor={editor} />
            </div>
          </div>

          <div className="p-4 max-w-none">
            <EditorContent
              editor={editor}
              className="focus-visible:outline-none focus-visible:ring-0"
            />
          </div>

          <LinkBubble editor={editor} />
        </CardContent>
      </Card>
    </LinkContext.Provider>
  );
};
