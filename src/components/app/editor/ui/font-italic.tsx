import { Editor } from "@tiptap/core";
import { ButtonToggle } from "../../button-toggle";
import { FC } from "react";

interface Props {
  editor: Editor;
}

export const FontItalic: FC<Props> = ({ editor }) => {
  const isActive = editor.isActive("italic");
  const actionHandler = () => {
    if (isActive) {
      editor.chain().focus().unsetItalic().run();
    } else {
      editor.chain().focus().toggleItalic().run();
    }
  };

  return (
    <div>
      <ButtonToggle
        label="Bolden the text"
        tooltip="Italic"
        shortcut={["Mod", "I"]}
        icon="Italic"
        onClick={actionHandler}
        active={isActive}
      />
    </div>
  );
};
