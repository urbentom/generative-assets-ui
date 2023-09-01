import { atom, selector } from "recoil";
import { Layer } from "../types";

export const layersAtom = atom<Layer[]>({
  key: "layersAtom",
  default: [],
});

export const selectedLayerKeyAtom = atom<string>({
  key: "selectedLayerKeyAtom",
  default: "",
});

export const selectedLayerAtom = selector<Layer>({
  key: "selectedLayer",
  get: ({ get }) => {
    const layers = get(layersAtom);
    const selectedLayerKey = get(selectedLayerKeyAtom);

    return layers.find((layer) => layer.name === selectedLayerKey) || layers[0];
  },
});
