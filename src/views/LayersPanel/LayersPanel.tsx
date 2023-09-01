import { Stack, createStyles } from "@mantine/core";
import { Directory } from "../../components/Directory";
import { useMemo, useState } from "react";
import { Panel } from "../../components/Panel";
import { FileDrop } from "../../components/FileDrop";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  layersAtom,
  layersCountAtom,
  selectedAssetAtom,
  selectedAssetKeyAtom,
  selectedLayerAtom,
  selectedLayerKeyAtom,
} from "../../atoms";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.dark[5],
    borderRadius: theme.radius.md,
  },
  panelTitle: {
    marginBottom: theme.spacing.md,
  },
}));

export const LayersPanel = () => {
  const { classes, cx } = useStyles();

  const [layers, setLayers] = useRecoilState(layersAtom);
  const layersCount = useRecoilValue(layersCountAtom);
  const selectedLayer = useRecoilValue(selectedLayerAtom);
  const selectedAsset = useRecoilValue(selectedAssetAtom);
  const setAsset = useSetRecoilState(selectedAssetKeyAtom);
  const setLayer = useSetRecoilState(selectedLayerKeyAtom);

  const layersWithContext = useMemo(() => {
    return layers.map((layer, index) => ({
      key: `${layer.name}-${index}`,
      label: layer.name,
      open: selectedLayer?.name === layer.name,
      files: layer.assets.map((asset) => ({
        label: asset.name,
        file: asset.file,
        active:
          selectedAsset?.name === asset.name &&
          selectedLayer?.name === layer.name,
      })),
    }));
  }, [layers, selectedLayer, selectedAsset]);

  const onFileDrop = (files: File[]) => {
    const layerName = `Layer ${layersCount + 1}`;

    setLayers([
      ...layers,
      {
        name: layerName,
        index: layersCount + 1,
        previewImage: files[0],
        assets: files.map((file) => ({
          name: file.name,
          weighting: 100 / files.length,
          file,
          traits: [],
        })),
      },
    ]);
  };

  return (
    <Panel title="Layers">
      <Stack>
        {layersWithContext.map((layer) => (
          <Directory
            {...layer}
            onFileClick={(value) => {
              setAsset(value !== selectedAsset?.name ? value : undefined);
            }}
            onFolderClick={(value) => {
              setLayer(value !== selectedLayer?.name ? value : undefined);
              setAsset(undefined);
            }}
          />
        ))}

        <FileDrop onDrop={onFileDrop} />
      </Stack>
    </Panel>
  );
};
