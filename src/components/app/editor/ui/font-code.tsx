import { Editor } from "@tiptap/core";
import { ButtonToggle } from "../../button-toggle";
import { FC } from "react";

interface Props {
  editor: Editor;
}

export const FontCode: FC<Props> = ({ editor }) => {
  const isActive = editor.isActive("code");
  const actionHandler = () => {
    if (isActive) {
      editor.chain().focus().unsetCode().run();
    } else {
      editor.chain().focus().toggleCode().run();
    }
  };

  return (
    <div>
      <ButtonToggle
        label="Code the text"
        tooltip="Code"
        shortcut={["Mod", "E"]}
        icon="Code"
        onClick={actionHandler}
        active={isActive}
      />
    </div>
  );
};
