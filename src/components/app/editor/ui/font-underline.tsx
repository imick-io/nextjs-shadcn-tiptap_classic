import { Editor } from "@tiptap/core";
import { ButtonToggle } from "../../button-toggle";
import { FC } from "react";

interface Props {
  editor: Editor;
}

export const FontUnderline: FC<Props> = ({ editor }) => {
  const isActive = editor.isActive("underline");
  const actionHandler = () => {
    if (isActive) {
      editor.chain().focus().unsetUnderline().run();
    } else {
      editor.chain().focus().toggleUnderline().run();
    }
  };

  return (
    <div>
      <ButtonToggle
        label="Underline the text"
        tooltip="Underline"
        shortcut={["Mod", "U"]}
        icon="Underline"
        onClick={actionHandler}
        active={isActive}
      />
    </div>
  );
};
