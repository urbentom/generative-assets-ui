import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  createStyles,
} from "@mantine/core";
import { LayersPanel } from "../LayersPanel";
import { SettingsPanel } from "../SettingsPanel";
import { Artwork } from "../Artwork/Artwork";
import { useSetRecoilState } from "recoil";
import { layersAtom } from "../../atoms";

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
  const setLayers = useSetRecoilState(layersAtom);

  setLayers([
    {
      name: "Head",
      index: 1,
      previewImage: undefined,
      assets: [
        {
          name: "Blue Hat",
          weighting: 1,
          file: new File([], "blue-hat.png"),
        },
      ],
    },
    {
      name: "Body",
      index: 2,
      previewImage: undefined,
      assets: [
        {
          name: "Blue Stripped Top",
          weighting: 1,
          file: new File([], "blue-hat.png"),
        },
        {
          name: "Green Top",
          weighting: 1,
          file: new File([], "blue-hat.png"),
        },
      ],
    },
    {
      name: "Background",
      index: 3,
      previewImage: undefined,
      assets: [
        {
          name: "Stary Night",
          weighting: 1,
          file: new File([], "blue-hat.png"),
        },
        {
          name: "Foggy Background",
          weighting: 1,
          file: new File([], "blue-hat.png"),
        },
      ],
    },
  ]);

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
