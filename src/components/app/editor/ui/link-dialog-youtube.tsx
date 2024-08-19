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
import { LinkYtContext } from "../context/link-yt-context";

interface Props {
  editor: Editor;
}

const FormSchema = z.object({
  url: z
    .string()
    .url()
    .refine((val) => {
      try {
        const url = new URL(val);
        return (
          (url.hostname === "www.youtube.com" &&
            url.pathname === "/watch" &&
            url.searchParams.has("v")) ||
          (url.hostname === "youtu.be" && url.pathname.length > 1)
        );
      } catch (e) {
        return false;
      }
    }, "The URL must be a valid YouTube video link"),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  newTab: z.boolean(),
});

export const LinkDialogYoutube: FC<Props> = ({ editor }) => {
  const { href, target } = editor.getAttributes("link");
  const { open, setOpen } = useContext(LinkYtContext);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: href || "",
      newTab: target === "_blank",
      width: 640,
      height: 480,
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
      .setYoutubeVideo({
        src: values.url,
        width: values.width,
        height: values.height,
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
        <ButtonToggle icon="Youtube" tooltip="Link" label="Create Link" />
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
                      <Input
                        placeholder="https://youtube.com/watch?v=1234567890"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
