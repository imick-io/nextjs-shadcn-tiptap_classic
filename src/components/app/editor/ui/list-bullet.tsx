import { Editor } from "@tiptap/core";
import { FC } from "react";
import { ButtonToggle } from "../../button-toggle";

interface Props {
  editor: Editor;
}

export const ListBullet: FC<Props> = ({ editor }) => {
  const isActive = editor.isActive("bulletList");
  const actionHandler = () => {
    if (isActive) {
      editor.chain().focus().liftListItem("listItem").run();
    } else {
      editor.chain().focus().toggleBulletList().run();
    }
  };

  return (
    <ButtonToggle
      icon="List"
      label="Bullet List"
      tooltip="Bullet list"
      onClick={actionHandler}
      active={isActive}
    />
  );
};
