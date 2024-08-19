import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonToggle } from "../../button-toggle";
import { Shortcut } from "../../shortcut";
import { Icon, IconProps } from "../../icon";
import { Editor } from "@tiptap/core";
import { FC } from "react";

const items = [
  {
    icon: "Pilcrow",
    label: "Paragraph",
    shortcutLastKey: "0",
    action: (editor) => editor.commands.setParagraph(),
  },
  {
    icon: "Heading1",
    label: "Heading 1",
    shortcutLastKey: "1",
    action: (editor) => editor.commands.setHeading({ level: 1 }),
  },
  {
    icon: "Heading2",
    label: "Heading 2",
    shortcutLastKey: "2",
    action: (editor) => editor.commands.setHeading({ level: 2 }),
  },
  {
    icon: "Heading3",
    label: "Heading 3",
    shortcutLastKey: "3",
    action: (editor) => editor.commands.setHeading({ level: 3 }),
  },
  {
    icon: "Heading4",
    label: "Heading 4",
    shortcutLastKey: "4",
    action: (editor) => editor.commands.setHeading({ level: 4 }),
  },
  {
    icon: "Heading5",
    label: "Heading 5",
    shortcutLastKey: "5",
    action: (editor) => editor.commands.setHeading({ level: 5 }),
  },
  {
    icon: "Heading6",
    label: "Heading 6",
    shortcutLastKey: "6",
    action: (editor) => editor.commands.setHeading({ level: 6 }),
  },
] as {
  icon: IconProps["name"];
  label: string;
  shortcutLastKey: string;
  action?: (editor: Editor) => void;
}[];

interface TextStyleProps {
  editor: Editor;
}

export const TextStyle: FC<TextStyleProps> = ({ editor }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtonToggle
            icon="Pilcrow"
            label="Font Style"
            tooltip="Font Style"
            withChevron
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {items.map((item) => (
            <DropdownMenuItem
              key={item.label}
              onClick={item.action?.bind(null, editor)}
            >
              <Icon name={item.icon} className="mr-2" />
              <span>{item.label}</span>
              <DropdownMenuShortcut>
                <Shortcut shortcut={["Mod", "Alt", item.shortcutLastKey]} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
