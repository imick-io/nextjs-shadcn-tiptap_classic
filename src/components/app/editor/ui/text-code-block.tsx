import { Editor } from "@tiptap/core";
import { ButtonToggle } from "../../button-toggle";
import { FC } from "react";

interface Props {
  editor: Editor;
}

export const TextCodeBlock: FC<Props> = ({ editor }) => {
  const isActive = editor.isActive("subscript");
  const actionHandler = () => {
    if (isActive) {
      editor.chain().focus().toggleCodeBlock().run();
    } else {
      editor.chain().focus().setCodeBlock().run();
    }
  };

  return (
    <div>
      <ButtonToggle
        label="Code Block"
        tooltip="Code Block"
        shortcut={["Mod", "Alt", "C"]}
        icon="FileCode"
        onClick={actionHandler}
        active={isActive}
      />
    </div>
  );
};
