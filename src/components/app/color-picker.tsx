import { HexColorPicker } from "react-colorful";
import { Input } from "../ui/input";
import { FC, useCallback, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Icon, IconProps } from "./icon";
import { Label } from "../ui/label";

const PREDEFINED_COLORS = [
  {
    icon: "Undo2",
    label: "Undo Text Color",
    value: "hsl(var(--background))",
    isClear: true,
  },
  { label: "Primary", value: "hsl(var(--primary))" },
  {
    label: "Primary Foreground",
    value: "hsl(var(--primary-foreground))",
  },
  { label: "Secondary", value: "hsl(var(--secondary))" },
  {
    label: "Secondary Foreground",
    value: "hsl(var(--secondary-foreground))",
  },
  { label: "Muted", value: "hsl(var(--muted))" },
  {
    label: "Muted-foreground",
    value: "hsl(var(--muted-foreground))",
  },
  { label: "Accent", value: "hsl(var(--accent))" },
  {
    label: "Accent Foreground",
    value: "hsl(var(--accent-foreground))",
  },
  {
    label: "Destructive",
    value: "hsl(var(--destructive))",
  },
  {
    label: "Destructive Foreground",
    value: "hsl(var(--destructive-foreground))",
  },
] as {
  isClear?: boolean;
  label: string;
  value: string;
  icon?: IconProps["name"];
}[];

interface Props {
  color: string;
  onChange: (color: string) => void;
  onClear: () => void;
}

export const ColorPicker: FC<Props> = ({ color, onChange, onClear }) => {
  const [colorInputValue, setColorInputValue] = useState(color || "");

  const handleColorUpdate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setColorInputValue(event.target.value);
    },
    []
  );

  const handleColorChange = useCallback(() => {
    const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue);

    if (!isCorrectColor) {
      if (onChange) {
        onChange("");
      }

      return;
    }

    if (onChange) {
      onChange(colorInputValue);
    }
  }, [colorInputValue, onChange]);

  const onClickPredefinedColor = (val: string, isClear?: boolean) => {
    if (isClear) {
      onClear();
    } else {
      onChange(val);
    }
  };

  return (
    <div>
      <HexColorPicker className="!w-full" onChange={onChange} />

      <Label className="sr-only">HEX Color</Label>
      <Input
        value={colorInputValue}
        onChange={handleColorUpdate}
        onBlur={handleColorChange}
        placeholder="#000000"
        className="mt-2"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {PREDEFINED_COLORS.map((clr) => (
          <TooltipProvider key={clr.value}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  key={clr.value}
                  className="h-5 w-5 rounded border border-card-foreground/20 flex items-center justify-center transition-colors duration-300 hover:ring-1 ring-offset-1 ring-offset-background hover:ring-card-foreground/80"
                  style={{ backgroundColor: clr.value }}
                  onClick={() => onClickPredefinedColor(clr.value, clr.isClear)}
                >
                  <span className="sr-only">{clr.label}</span>
                  {clr.icon && <Icon name={clr.icon} className="h-3 w-3" />}
                </button>
              </TooltipTrigger>

              <TooltipContent>{clr.label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
