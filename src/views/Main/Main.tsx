import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  createStyles,
} from "@mantine/core";
import { AssetsPanel } from "../AssetsPanel";
import { SettingsPanel } from "../SettingsPanel";
import { Artwork } from "../Artwork/Artwork";

const useStyles = createStyles((theme) => ({
  grid: {
    gridTemplateColumns: "1fr 2fr 1fr",
  },
  gridColumn: {
    height: "100vh",
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
}));

export const Main = () => {
  const { classes, cx } = useStyles();
  return (
    <Container fluid={true}>
      <SimpleGrid cols={3} className={cx(classes["grid"])}>
        <Stack className={cx(classes["gridColumn"])}>
          <AssetsPanel />
        </Stack>
        <Stack className={cx(classes["gridColumn"])}>
          <Artwork />
        </Stack>
        <Stack className={cx(classes["gridColumn"])}>
          <SettingsPanel />
        </Stack>
      </SimpleGrid>
    </Container>
  );
};
