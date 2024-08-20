import { Editor } from "@tiptap/core";
import { FC } from "react";
import { ButtonToggle } from "../../button-toggle";

interface Props {
  editor: Editor;
}

export const HistoryUndo: FC<Props> = ({ editor }) => {
  return (
    <ButtonToggle
      icon="Undo"
      label="Undo"
      tooltip="Undo"
      shortcut={["Mod", "Z"]}
      disabled={!editor.can().undo()}
      onClick={() => editor.chain().focus().undo().run()}
    />
  );
};
