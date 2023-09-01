export type Asset = {
  name: string;
  weighting: number;
  file: File;
  traits: AssetTrait[];
};

export type AssetTrait = {
  label: string;
  value: string;
};
