import { Box, Text } from "@mantine/core";

export const DefaultContent = () => {
  return (
    <Box>
      <Text>Hey 👋🏼, Welcome to the Generative Assets Tool!</Text>
      <Text>
        I built this tool to help creators generate all the image and json
        assets for a generative collections following the{" "}
        <a target="_blank" href="https://developers.metaplex.com">
          Metaplex
        </a>{" "}
        standard in a friendly UI.
      </Text>
    </Box>
  );
};
