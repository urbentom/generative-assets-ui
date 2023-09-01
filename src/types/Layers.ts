import { Asset } from "./assets";

export type Layer = {
  name: string;
  index: number;
  previewImage: File | undefined;
  assets: Asset[];
};
