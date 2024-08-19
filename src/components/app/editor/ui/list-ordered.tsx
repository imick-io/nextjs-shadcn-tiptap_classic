import { Editor } from "@tiptap/core";
import { FC } from "react";
import { ButtonToggle } from "../../button-toggle";

interface Props {
  editor: Editor;
}

export const ListOrdered: FC<Props> = ({ editor }) => {
  const isActive = editor.isActive("orderedList");
  const actionHandler = () => {
    if (isActive) {
      editor.chain().focus().liftListItem("listItem").run();
    } else {
      editor.chain().focus().toggleOrderedList().run();
    }
  };

  return (
    <ButtonToggle
      icon="ListOrdered"
      label="Numbered List"
      tooltip="Numbered list"
      onClick={actionHandler}
      active={isActive}
    />
  );
};
