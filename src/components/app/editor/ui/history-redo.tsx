import { Editor } from "@tiptap/core";
import { FC } from "react";
import { ButtonToggle } from "../../button-toggle";

interface Props {
  editor: Editor;
}

export const HistoryRedo: FC<Props> = ({ editor }) => {
  return (
    <ButtonToggle
      icon="Redo"
      label="Redo"
      tooltip="Redo"
      shortcut={["Mod", "Shift", "Z"]}
      disabled={!editor.can().redo()}
      onClick={() => editor.chain().focus().redo().run()}
    />
  );
};
