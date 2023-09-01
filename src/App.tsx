import { MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";
import { Main } from "./views/Main";

export default function App() {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
}
