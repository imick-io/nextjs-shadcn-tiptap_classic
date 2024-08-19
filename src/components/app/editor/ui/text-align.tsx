import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Editor } from "@tiptap/core";
import { FC } from "react";
import { ButtonToggle } from "../../button-toggle";
import { IconProps } from "../../icon";

interface Props {
  editor: Editor;
}

const aligns = {
  left: "AlignLeft",
  center: "AlignCenter",
  right: "AlignRight",
  justify: "AlignJustify",
} as { [key: string]: IconProps["name"] };

export const TextAlign: FC<Props> = ({ editor }) => {
  const currentAlign = Object.keys(aligns).find((alignment) =>
    editor.isActive({ textAlign: alignment })
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonToggle
          icon={aligns?.[currentAlign || ""] || "AlignLeft"}
          tooltip="Align text"
          label="Align Text"
        />
      </PopoverTrigger>

      <PopoverContent className="w-auto py-1 px-1">
        <div className="flex">
          <ButtonToggle
            icon="AlignLeft"
            label="Left Align"
            tooltip="Left Align"
            shortcut={["Mod", "Shift", "L"]}
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          />
          <ButtonToggle
            icon="AlignCenter"
            label="Center Align"
            tooltip="Center Align"
            shortcut={["Mod", "Shift", "E"]}
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          />
          <ButtonToggle
            icon="AlignRight"
            label="Right Align"
            tooltip="Right Align"
            shortcut={["Mod", "Shift", "R"]}
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          />
          <ButtonToggle
            icon="AlignJustify"
            label="Justify Align"
            tooltip="Justify Align"
            shortcut={["Mod", "Shift", "J"]}
            active={editor.isActive({ textAlign: "justify" })}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          />
          <ButtonToggle
            icon="Undo2"
            label="Undo Align"
            tooltip="Undo Align"
            onClick={() => editor.chain().focus().unsetTextAlign().run()}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
