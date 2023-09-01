import { atom, selector } from "recoil";
import { Layer } from "../types";

export const layersAtom = atom<Layer[]>({
  key: "layers",
  default: [],
});

export const selectedLayerKeyAtom = atom<string | undefined>({
  key: "selectedLayerKey",
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

export const layersCountAtom = selector<number>({
  key: "layersCount",
  get: ({ get }) => {
    const layers = get(layersAtom);

    return layers.length;
  },
});