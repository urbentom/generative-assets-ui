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
  const { classes, cx } = useStyles();
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
      name: "Layer 2",
      index: 2,
      previewImage: undefined,
      assets: [],
    },
    {
      name: "Layer 3",
      index: 3,
      previewImage: undefined,
      assets: [],
    },
  ]);

  return (
    <Container fluid={true}>
      <SimpleGrid cols={3} className={cx(classes["grid"])}>
        <Stack className={cx(classes["gridColumn"])}>
          <LayersPanel />
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
