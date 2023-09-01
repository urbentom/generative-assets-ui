import { atom, selector } from "recoil";
import { Asset } from "../types";
import { selectedLayerAtom } from "./layersAtom";

export const selectedAssetKeyAtom = atom<string | undefined>({
  key: "selectedAssetKeyAtom",
  default: undefined,
});

export const selectedAssetAtom = selector<Asset | undefined>({
  key: "selectedAssetAtom",
  get: ({ get }) => {
    const selectedLayer = get(selectedLayerAtom);
    const selectedAssetKey = get(selectedAssetKeyAtom);

    const selectedAsset = selectedLayer.assets.find(
      (asset) => asset.name === selectedAssetKey
    );

    return selectedAsset;
  },
});
