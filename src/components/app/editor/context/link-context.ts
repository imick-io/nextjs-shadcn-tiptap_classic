import { createContext } from "react";

interface LinkContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const LinkContext = createContext<LinkContextProps>({
  open: false,
  setOpen: () => {},
});
