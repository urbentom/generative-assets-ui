import { Stack, createStyles } from "@mantine/core";
import { Directory } from "../../components/Directory";
import { useMemo, useState } from "react";
import { Panel } from "../../components/Panel";
import { FileDrop } from "../../components/FileDrop";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  layersAtom,
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

  const layers = useRecoilValue(layersAtom);
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
        active:
          selectedAsset?.name === asset.name &&
          selectedLayer?.name === layer.name,
      })),
    }));
  }, [layers, selectedLayer, selectedAsset]);

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

        <FileDrop onDrop={() => {}} />
      </Stack>
    </Panel>
  );
};
