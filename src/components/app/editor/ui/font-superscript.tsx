import { Editor } from "@tiptap/core";
import { ButtonToggle } from "../../button-toggle";
import { FC } from "react";

interface Props {
  editor: Editor;
}

export const FontSuperscript: FC<Props> = ({ editor }) => {
  const isActive = editor.isActive("superscript");
  const actionHandler = () => {
    if (isActive) {
      editor.chain().focus().unsetSuperscript().run();
    } else {
      editor.chain().focus().toggleSuperscript().run();
    }
  };

  return (
    <div>
      <ButtonToggle
        label="Superscript the text"
        tooltip="Superscript"
        shortcut={["Mod", "."]}
        icon="Superscript"
        onClick={actionHandler}
        active={isActive}
      />
    </div>
  );
};
