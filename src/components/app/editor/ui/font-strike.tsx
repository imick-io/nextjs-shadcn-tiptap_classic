import { Editor } from "@tiptap/core";
import { ButtonToggle } from "../../button-toggle";
import { FC } from "react";

interface Props {
  editor: Editor;
}

export const FontStrike: FC<Props> = ({ editor }) => {
  const isActive = editor.isActive("strike");
  const actionHandler = () => {
    if (isActive) {
      editor.chain().focus().unsetStrike().run();
    } else {
      editor.chain().focus().toggleStrike().run();
    }
  };

  return (
    <div>
      <ButtonToggle
        label="Strikethrough the text"
        tooltip="Strikethrough"
        shortcut={["Mod", "S"]}
        icon="Strikethrough"
        onClick={actionHandler}
        active={isActive}
      />
    </div>
  );
};
