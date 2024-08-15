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
import { Button } from "../../ui/button";
import { Icon } from "../icon";
import { Separator } from "@/components/ui/separator";
import { ButtonToggle } from "../button-toggle";

export const EditorBlock = () => {
  const editor = useEditor({
    extensions: ExtensionKit(),
    autofocus: true,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autcapitalize: "off",
      },
    },
  });

  return (
    <Card>
      <CardHeader className="sr-only">
        <CardTitle className="sr-only">Rich Text Editor</CardTitle>
        <CardDescription className="sr-only">
          Write your content
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-1">
          <ButtonToggle
            label="Bolden the text"
            tooltip="Bold"
            shortcut={["Mod", "B"]}
            icon="Bold"
          />
        </div>
        <Separator />

        <div className="p-4">
          <EditorContent editor={editor} />
        </div>
      </CardContent>
    </Card>
  );
};
