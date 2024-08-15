import { Editor } from "@tiptap/core";
import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "../../icon";
import resolverConfig from "tailwindcss/resolveConfig";

import config from "@/../tailwind.config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const resolvedConfig = resolverConfig(config);
const fontSize = resolvedConfig.theme.fontSize;

interface Props {
  editor: Editor;
}

export const FontSize: FC<Props> = ({ editor }) => {
  const currentSize = editor.getAttributes("textStyle")?.fontSize;
  const currentSizeEntries = Object.entries(fontSize);
  const selectedSize =
    currentSizeEntries.find((item) => item[1][0] === currentSize)?.[0] ||
    "base";

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <span className="sr-only">Your current font size it</span>
            {selectedSize}
            <Icon name="ChevronDown" className="h-2 w-2 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {currentSizeEntries.map(([key, value]) => (
            <DropdownMenuItem
              style={{
                fontSize: value[0],
                ...value[1],
              }}
              onClick={() => {
                editor.chain().focus().setFontSize(value[0]).run();
              }}
            >
              {key}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
