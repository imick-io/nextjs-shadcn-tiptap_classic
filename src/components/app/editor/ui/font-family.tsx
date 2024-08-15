import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Editor } from "@tiptap/core";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "../../icon";

const items = [
  {
    label: "Inter",
    value: "var(--font-sans)",
  },
  {
    label: "Comic Sans",
    value: "Comic Sans MS, Comic Sans",
  },
  {
    label: "Serif",
    value: "serif",
  },
  {
    label: "Monospace",
    value: "monospace",
  },
  {
    label: "Cursive",
    value: "cursive",
  },
] as {
  label: string;
  value: string;
  action?: (editor: Editor) => void;
}[];

interface FontFamilyProps {
  editor: Editor;
}

export const FontFamily: FC<FontFamilyProps> = ({ editor }) => {
  const currentFont =
    editor.getAttributes("textStyle")?.fontFamily || undefined;

  const fontFromList = items.find((item) => item.value === currentFont);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            {fontFromList?.label || items[0].label}
            <Icon name="ChevronDown" className="h-2 w-2 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {items.map((item) => (
              <DropdownMenuItem
                key={item.label}
                style={{ fontFamily: item.value }}
                onClick={() =>
                  editor.chain().focus().setFontFamily(item.value).run()
                }
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => editor.chain().focus().unsetFontFamily().run()}
          >
            Unset font family
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
