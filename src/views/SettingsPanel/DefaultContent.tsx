import { Box, Text, Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  text: {
    marginBottom: theme.spacing.sm,
  },
  title: {
    marginTop: theme.spacing.xl,
  },
}));

export const DefaultContent = () => {
  const { classes } = useStyles();

  return (
    <Box>
      <Text className={classes.text}>
        Hey 👋🏼, Welcome to the Generative Assets Tool!
      </Text>
      <Text className={classes.text}>
        I built this tool to help creators generate all the image and json
        assets for a generative collections following the{" "}
        <a target="_blank" href="https://developers.metaplex.com">
          Metaplex
        </a>{" "}
        standard in a friendly UI.
      </Text>
      <Title className={classes.title} order={3}>
        How to use this tool?
      </Title>
      <Text className={classes.text}>
        Start by organizing your assets into folders for each layer. A layer
        should consist of elements of the same type, for example hats, or hands.
      </Text>
      <Text className={classes.text}>
        Drag each layer folder on the left "Layers" panel, you should then be
        able to see all your layers and the assets inside of them.
      </Text>
    </Box>
  );
};
