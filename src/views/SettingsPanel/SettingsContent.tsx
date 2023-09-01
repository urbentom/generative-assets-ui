import { useRecoilValue } from "recoil";
import { currentSettingsAtom } from "../../atoms";
import { AssetContent } from "./AssetContent";
import { LayerContent } from "./LayerContent";

export const SettingsContent = () => {
  const currentSettings = useRecoilValue(currentSettingsAtom);

  if (currentSettings?.type === "layer") {
    return <LayerContent />;
  } else if (currentSettings?.type === "asset") {
    return <AssetContent />;
  }

  return null;
};
