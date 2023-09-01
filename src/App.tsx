import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
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
        <Notifications />
        <Main />
      </MantineProvider>
    </RecoilRoot>
  );
}
