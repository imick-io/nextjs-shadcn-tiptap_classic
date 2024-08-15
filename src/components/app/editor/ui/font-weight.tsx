import { Editor } from "@tiptap/core";
import { ButtonToggle } from "../../button-toggle";
import { FC } from "react";

interface Props {
  editor: Editor;
}

export const FontWeight: FC<Props> = ({ editor }) => {
  const isActive = editor.isActive("bold");
  const actionHandler = () => {
    if (isActive) {
      editor.chain().focus().unsetBold().run();
    } else {
      editor.chain().focus().toggleBold().run();
    }
  };

  return (
    <div>
      <ButtonToggle
        label="Bolden the text"
        tooltip="Bold"
        shortcut={["Mod", "B"]}
        icon="Bold"
        onClick={actionHandler}
        active={isActive}
      />
    </div>
  );
};
