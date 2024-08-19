import { createContext } from "react";

interface LinkYtContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const LinkYtContext = createContext<LinkYtContextProps>({
  open: false,
  setOpen: () => {},
});
