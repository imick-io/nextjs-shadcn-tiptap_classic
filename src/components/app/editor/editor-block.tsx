"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { ExtensionKit } from "./extension-kit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Separator } from "@/components/ui/separator";
import { ButtonToggle } from "../button-toggle";
import { TypographyStyle } from "./ui/typography-style";
import { useEffect } from "react";
import { FontFamily } from "./ui/font-family";
import { FontWeight } from "./ui/font-weight";
import { FontItalic } from "./ui/font-italic";
import { FontUnderline } from "./ui/font-underline";
import { FontSize } from "./ui/font-size";

export const EditorBlock = () => {
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
    <Card className="max-w-6xl mx-auto">
      <CardHeader className="sr-only">
        <CardTitle className="sr-only">Rich Text Editor</CardTitle>
        <CardDescription className="sr-only">
          Write your content
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-1 flex items-center gap-1 divide-x *:pl-1 first:pl-0">
          <TypographyStyle editor={editor} />
          <FontFamily editor={editor} />
          <FontSize editor={editor} />
          <div className="flex space-x-1">
            <FontWeight editor={editor} />
            <FontItalic editor={editor} />
            <FontUnderline editor={editor} />
          </div>
        </div>
        <Separator />

        <div className="p-4 max-w-none">
          <EditorContent
            editor={editor}
            className="focus-visible:outline-none focus-visible:ring-0"
          />
        </div>
      </CardContent>
    </Card>
  );
};
