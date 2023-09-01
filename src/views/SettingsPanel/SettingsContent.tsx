import { useRecoilValue } from "recoil";
import { currentSettingsAtom } from "../../atoms";
import { AssetContent } from "./AssetContent";
import { LayerContent } from "./LayerContent";

export const SettingsContent = () => {
  const currentSettings = useRecoilValue(currentSettingsAtom);

  if (currentSettings?.type === "layer") {
    return <LayerContent key={currentSettings.name} />;
  } else if (currentSettings?.type === "asset") {
    return <AssetContent key={currentSettings.name} />;
  }

  return null;
};
