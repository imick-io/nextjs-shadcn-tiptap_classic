import { FC } from "react";
import { Button } from "../ui/button";
import { Icon, IconProps } from "./icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Shortcut } from "./shortcut";

interface ButtonToggleProps {
  tooltip: string;
  label: string;
  shortcut?: string[];
  icon: IconProps["name"];
  active?: boolean;
}

export const ButtonToggle: FC<ButtonToggleProps> = ({
  tooltip,
  shortcut,
  active = false,
  icon,
  label,
}) => {
  let content = (
    <Button variant={active ? "secondary" : "ghost"} size="sm">
      <Icon name={icon} />
      <span className="sr-only">{label}</span>
    </Button>
  );

  if (tooltip) {
    content = (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>

          <TooltipContent className="flex items-center space-x-2">
            <span>{tooltip}</span>
            <Shortcut shortcut={shortcut} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};
