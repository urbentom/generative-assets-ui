import { Box, Text } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { currentSettingsAtom } from "../../atoms";

export const AssetContent = () => {
  const currentSettings = useRecoilValue(currentSettingsAtom);

  return (
    <Box>
      <Text>Asset Settings: {currentSettings?.name}</Text>
    </Box>
  );
};
