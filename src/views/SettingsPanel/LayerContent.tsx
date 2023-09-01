import { Box, Text } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { currentSettingsAtom } from "../../atoms";

export const LayerContent = () => {
  const currentSettings = useRecoilValue(currentSettingsAtom);

  return (
    <Box>
      <Text>Layer Settings: {currentSettings?.name}</Text>
    </Box>
  );
};
