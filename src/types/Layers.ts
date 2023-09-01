import { Asset } from "./Assets";

export type Layer = {
  name: string;
  index: number;
  previewImage: File | undefined;
  assets: Asset[];
};
