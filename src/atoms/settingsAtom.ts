import { atom, selector } from "recoil";
import { Settings } from "../types";
import { selectedAssetAtom } from "./assetsAtom";
import { selectedLayerAtom } from "./layersAtom";

export const currentSettingsAtom = selector<Settings | undefined>({
  key: "currentSettingsAtom",
  get: ({ get }) => {
    const selectedAsset = get(selectedAssetAtom);
    const selectedLayer = get(selectedLayerAtom);

    if (selectedAsset) {
      return {
        name: selectedAsset.name,
        type: "asset",
      };
    } else if (selectedLayer) {
      return {
        name: selectedLayer.name,
        type: "layer",
      };
    }
    return undefined;
  },
});
