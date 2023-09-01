import { MantineProvider } from "@mantine/core";
import { Main } from "./views/Main";

export default function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        primaryColor: "indigo",
      }}
    >
      <Main />
    </MantineProvider>
  );
}
