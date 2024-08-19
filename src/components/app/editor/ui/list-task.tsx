import { Editor } from "@tiptap/core";
import { FC } from "react";
import { ButtonToggle } from "../../button-toggle";

interface Props {
  editor: Editor;
}

export const ListTask: FC<Props> = ({ editor }) => {
  const isActive = editor.isActive("taskList");
  const actionHandler = () => {
    if (isActive) {
      editor.chain().focus().liftListItem("taskItem").run();
    } else {
      editor.chain().focus().toggleTaskList().run();
    }
  };

  return (
    <ButtonToggle
      icon="ListTodo"
      label="Task List"
      tooltip="Task list"
      onClick={actionHandler}
      active={isActive}
    />
  );
};
