import { useContextSelector } from "use-context-selector";
import { context } from "@/context";

export function useTheme() {
  const theme = useContextSelector(
    context,
    (context) => context.state.darkTheme
  );
  const changeTheme = useContextSelector(
    context,
    (context) => context.ChangeTheme
  );

  return {
    theme,
    changeTheme,
  };
}
