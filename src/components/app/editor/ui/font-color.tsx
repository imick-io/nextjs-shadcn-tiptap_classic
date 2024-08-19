import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonToggle } from "../../button-toggle";
import { Editor } from "@tiptap/core";
import { FC, memo, useCallback } from "react";
import { ColorPicker } from "../../color-picker";

interface Props {
  editor: Editor;
}

const MemoColorPicker = memo(ColorPicker);

export const FontColor: FC<Props> = ({ editor }) => {
  const currentColor = editor.getAttributes("textStyle").color || undefined;

  const onChangeHandler = useCallback(
    (val: string) => editor.chain().setColor(val).run(),
    [editor]
  );

  const onClearHandler = useCallback(
    () => editor.chain().focus().unsetColor().run(),
    [editor]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonToggle
          tooltip="Text Color"
          label="Text Color"
          icon="Palette"
          style={{ color: currentColor }}
        />
      </PopoverTrigger>

      <PopoverContent className="w-56">
        <MemoColorPicker
          color={currentColor}
          onClear={onClearHandler}
          onChange={onChangeHandler}
        />
      </PopoverContent>
    </Popover>
  );
};
