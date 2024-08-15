const isMac =
  typeof window !== "undefined"
    ? (navigator as any).userAgentData?.platform
        ?.toUpperCase()
        .indexOf("MAC") >= 0 ||
      navigator.userAgent.toUpperCase().indexOf("MAC") >= 0
    : false;

export const ShortcutKey = ({
  children,
}: {
  children: string;
}): JSX.Element => {
  if (children === "Mod") {
    return <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>; // ⌃
  }
  if (children === "Shift") {
    return <kbd>⇧</kbd>;
  }
  if (children === "Alt") {
    return <kbd>{isMac ? "⌥" : "Alt"}</kbd>;
  }
  return <kbd>{children}</kbd>;
};

export const Shortcut = ({ shortcut }: { shortcut?: string[] }) => {
  if (!shortcut || !Array.isArray(shortcut)) {
    return null;
  }

  return (
    <span>
      {shortcut.map((shortcutKey) => (
        <ShortcutKey key={shortcutKey}>{shortcutKey}</ShortcutKey>
      ))}
    </span>
  );
};
