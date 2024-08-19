import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BubbleMenu, Editor } from "@tiptap/react";
import { FC, useContext } from "react";
import { Icon } from "../../icon";
import { LinkContext } from "../context/link-context";

interface Props {
  editor: Editor;
}

export const LinkBubble: FC<Props> = ({ editor }) => {
  const { href } = editor.getAttributes("link");
  const { setOpen } = useContext(LinkContext);

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor, from, to }) =>
        from === to && editor.isActive("link")
      }
    >
      <Card>
        <CardContent className="p-2">
          <div className="flex space-x-2">
            <Button
              className="flex-1"
              onClick={() => setOpen(true)}
              variant="link"
            >
              {href || ""}
            </Button>

            <Button size="icon" variant="ghost" onClick={() => setOpen(true)}>
              <Icon name="Pencil" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor.commands.unsetLink()}
            >
              <Icon name="Trash" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </BubbleMenu>
  );
};
