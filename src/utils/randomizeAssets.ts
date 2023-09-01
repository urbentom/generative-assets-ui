import ts from "typescript";
import { Asset, Layer } from "../types";

export type AssetCombination = {
  [key: string]: Asset;
};

type AssetWeightingType = {
  [key: string]: string;
};

type AssetWeightingByLayerType = {
  [key: string]: AssetWeightingType;
};

export const randomizeAssets = (layers: Layer[], numberOfAssets: number) => {
  // First we need to get all the assets and their weightings into an object by their layer
  const assetWeightingByLayer: AssetWeightingByLayerType = {};
  layers.forEach((layer) => {
    const layerWeighting = {};
    layer.assets.forEach(({ name, weighting }) => {
      Object.assign(layerWeighting, {
        [name]: weighting,
      });
    });
    Object.assign(assetWeightingByLayer, {
      [layer.name]: layerWeighting,
    });
  });

  const assetCombinations = Array.from(Array(numberOfAssets).keys()).map(() => {
    const combinedAssets = layers.map((layer) => {
      const assetsWithWeightings = assetWeightingByLayer[layer.name];

      const rnd = Math.random() * 100000;

      const percent = rnd / 1000;
      let result: string | null = null,
        acc = 0;

      Object.keys(assetsWithWeightings).forEach((key) => {
        // @ts-ignore
        if (result === null && percent > 100 - assetsWithWeightings[key] - acc)
          result = key;
        // @ts-ignore
        acc += parseFloat(assetsWithWeightings[key]);
      });

      const asset = layer.assets.find(({ name }) => name === result);
      if (!asset) {
        throw new Error(`Could not find asset with name ${result}`);
      }

      return asset;
    });

    return combinedAssets;
  });

  return assetCombinations;
};
