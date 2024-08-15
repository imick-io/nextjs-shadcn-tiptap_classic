import { FC, forwardRef } from "react";
import { Button, ButtonProps } from "../ui/button";
import { Icon, IconProps } from "./icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Shortcut } from "./shortcut";

interface ButtonToggleProps extends ButtonProps {
  tooltip?: string;
  label: string;
  shortcut?: string[];
  icon: IconProps["name"];
  active?: boolean;
  withChevron?: boolean;
}

export const ButtonToggle = forwardRef<HTMLButtonElement, ButtonToggleProps>(
  (
    {
      tooltip,
      shortcut,
      active = false,
      icon,
      label,
      withChevron = false,
      ...props
    },
    ref
  ) => {
    let content = (
      <Button
        ref={ref}
        variant={active ? "secondary" : "ghost"}
        size="sm"
        {...props}
      >
        <Icon name={icon} />
        <span className="sr-only">{label}</span>
        {withChevron && <Icon name="ChevronDown" className="h-2 w-2 ml-2" />}
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
  }
);

ButtonToggle.displayName = "ButtonToggle";
