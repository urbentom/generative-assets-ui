import { Container, SimpleGrid, Stack, createStyles } from "@mantine/core";
import { LayersPanel } from "../LayersPanel";
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
  const { classes } = useStyles();

  return (
    <Container fluid={true}>
      <SimpleGrid cols={3} className={classes.grid}>
        <Stack className={classes.gridColumn}>
          <LayersPanel />
        </Stack>
        <Stack className={classes.gridColumn}>
          <Artwork />
        </Stack>
        <Stack className={classes.gridColumn}>
          <SettingsPanel />
        </Stack>
      </SimpleGrid>
    </Container>
  );
};
