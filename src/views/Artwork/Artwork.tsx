import { Box, createStyles } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { layersAtom } from "../../atoms";
import { Asset } from "../../types";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  box: {
    height: 500,
    width: 500,
    backgroundColor: theme.colors.dark[4],
    borderRadius: theme.radius.md,
    position: "relative",
  },
  img: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    position: "absolute",
  },
}));

export const Artwork = () => {
  const { classes, cx } = useStyles();

  const layers = useRecoilValue(layersAtom);

  const randomlySelectedAssets: Asset[] = layers.map((layer) => {
    return layer.assets[Math.floor(Math.random() * layer.assets.length)];
  });

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.box}>
        {randomlySelectedAssets.map((asset) => (
          <img className={classes.img} src={URL.createObjectURL(asset.file)} />
        ))}
      </Box>
    </Box>
  );
};
