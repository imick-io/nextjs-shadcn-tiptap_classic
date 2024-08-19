"use client";

import { Editor } from "@tiptap/react";
import { FC, useCallback, useContext, useEffect } from "react";
import { ButtonToggle } from "../../button-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icon } from "../../icon";
import { LinkContext } from "../context/link-context";

interface Props {
  editor: Editor;
}

const FormSchema = z.object({
  url: z.string().url(),
  newTab: z.boolean(),
});

export const LinkDialog: FC<Props> = ({ editor }) => {
  const { href, target } = editor.getAttributes("link");
  const { open, setOpen } = useContext(LinkContext);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: href || "",
      newTab: target === "_blank",
    },
  });

  const setFormValues = useCallback(() => {
    form.setValue("url", href || "");
    form.setValue("newTab", target === "_blank");
  }, [form, href, target]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: values.url,
        target: values.newTab ? "_blank" : undefined,
      })
      .run();

    // Reset the form
    form.reset();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setFormValues();
    }
  }, [open, setFormValues]);

  const removeLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonToggle icon="Link" tooltip="Link" label="Create Link" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Link</DialogTitle>
          <DialogDescription className="sr-only">
            Create a link to another website or page.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-4">
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newTab"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        id="new-tab"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel htmlFor="new-tab">Open in new Tab</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button type="button" variant="ghost" onClick={removeLink}>
                <span className="sr-only">Delete Link</span>
                <Icon name="Trash2" className="text-destructive" />
              </Button>
              <Button type="submit">Apply</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
