import { atom, selector } from "recoil";
import { Layer } from "../types";

export const layersAtom = atom<Layer[]>({
  key: "layersAtom",
  default: [],
});

export const selectedLayerKeyAtom = atom<string | undefined>({
  key: "selectedLayerKeyAtom",
  default: "",
});

export const selectedLayerAtom = selector<Layer | undefined>({
  key: "selectedLayer",
  get: ({ get }) => {
    const layers = get(layersAtom);
    const selectedLayerKey = get(selectedLayerKeyAtom);

    return layers.find((layer) => layer.name === selectedLayerKey);
  },
});
