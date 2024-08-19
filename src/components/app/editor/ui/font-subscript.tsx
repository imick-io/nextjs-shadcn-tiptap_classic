import { Editor } from "@tiptap/core";
import { ButtonToggle } from "../../button-toggle";
import { FC } from "react";

interface Props {
  editor: Editor;
}

export const FontSubscript: FC<Props> = ({ editor }) => {
  const isActive = editor.isActive("subscript");
  const actionHandler = () => {
    if (isActive) {
      editor.chain().focus().unsetSubscript().run();
    } else {
      editor.chain().focus().toggleSubscript().run();
    }
  };

  return (
    <div>
      <ButtonToggle
        label="Subscript the text"
        tooltip="Subscript"
        shortcut={["Mod", ","]}
        icon="Subscript"
        onClick={actionHandler}
        active={isActive}
      />
    </div>
  );
};
