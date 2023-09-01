import { useState } from "react";
import { Asset, Layer } from "../types";
import mergeImages, { ImageSource } from "merge-images";
import { Buffer } from "buffer";
import { randomizeAssets } from "../utils/randomizeAssets";
import { zipGeneratedAssets } from "../utils/zipGeneratedAssets";
import { downloadFile } from "../utils/downloadFile";

const generateArtwork = async (
  assets: Asset[],
  height: number,
  width: number
) => {
  const bufferAssets = assets.map((asset) =>
    Buffer.from(URL.createObjectURL(asset.file))
  );

  return await mergeImages(bufferAssets, { height, width });
};

type GenerateJsonArgs = {
  name: string;
  description: string;
  assets: Asset[];
  index: number;
};

export type GeneratedJson = {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  properties: {
    files: {
      uri: string;
      type: string;
    }[];
    category: string;
  };
};

export type GeneratedAsset = {
  artwork: string;
  json: GeneratedJson;
};

const generateJson = ({
  name,
  description,
  assets,
  index,
}: GenerateJsonArgs) => {
  return {
    name,
    description,
    image: `${index}.png`,
    attributes: assets
      .map((asset) => {
        return asset.traits.map((trait) => {
          return {
            trait_type: trait.label,
            value: trait.value,
          };
        });
      })
      .flat(),
    properties: {
      files: [{ uri: `${index}.png`, type: "image/png" }],
      category: "image",
    },
  };
};

export const useGenerateAssets = () => {
  const [loading, setLoading] = useState(false);

  const generateAssets = async (layers: Layer[], numberOfNfts: number) => {
    try {
      setLoading(true);

      const assetCombinations = randomizeAssets(layers, numberOfNfts);

      const generatedAssets = await Promise.all(
        assetCombinations.map(async (assets, index) => {
          const [artwork, json] = await Promise.all([
            generateArtwork(assets, 400, 400),
            generateJson({
              name: "Cool Collection",
              description: "A collection of cool things",
              assets,
              index,
            }),
          ]);

          return { artwork, json };
        })
      );

      const zipped = await zipGeneratedAssets(generatedAssets);

      await downloadFile(zipped, "application/zip", "assets.zip");
    } catch (e) {
      console.log("Error generating artwork", e);
    } finally {
      setLoading(false);
    }
  };

  return { generateAssets, loading };
};
