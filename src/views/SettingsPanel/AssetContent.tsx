import {
  Box,
  Button,
  Group,
  NumberInput,
  Stack,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { layersAtom, selectedAssetAtom, selectedLayerAtom } from "../../atoms";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faX } from "@fortawesome/pro-regular-svg-icons";
import { Layer } from "../../types";

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100%",
    position: "relative",
  },
  image: {
    height: "auth",
    width: "100%",
    borderRadius: theme.radius.md,
  },
  wrapperStack: {
    height: "95%",
  },
  traitStack: {
    marginTop: theme.spacing.sm,
  },
}));

export const AssetContent = () => {
  const selectedAsset = useRecoilValue(selectedAssetAtom);
  const selectedLayer = useRecoilValue(selectedLayerAtom);
  const setLayers = useSetRecoilState(layersAtom);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      name: selectedAsset?.name,
      weighting: selectedAsset?.weighting,
      traits: selectedAsset?.traits ?? [],
    },

    validate: {
      name: (value) => {
        return selectedLayer &&
          (selectedAsset?.name === value ||
            selectedLayer.assets.findIndex((asset) => asset.name === value) ===
              -1)
          ? null
          : "Name already exists";
      },
    },
  });

  const onSubmit = () => {
    form.onSubmit((values) => {
      try {
        setLayers((layers) => {
          if (!selectedLayer || !selectedAsset) {
            throw Error("No selected layer or asset");
          }
          if (!values.name || !values.weighting || !values.traits) {
            throw Error("Missing required fields");
          }

          return layers.map((layer) => {
            if (layer.name !== selectedLayer.name) {
              return layer;
            }

            return {
              ...layer,
              assets: layer.assets.map((asset) => {
                if (asset.name !== selectedAsset.name) {
                  return asset;
                }

                return {
                  ...asset,
                  name: values.name,
                  weighting: values.weighting,
                  traits: values.traits,
                };
              }),
            };
          }) as Layer[];
        });

        notifications.show({
          title: "Asset saved",
          message: `Your Asset '${values.name}' was saved successfully!`,
          color: "green",
          icon: <FontAwesomeIcon icon={faCircleCheck} />,
        });
      } catch (error) {
        console.log(error);
        notifications.show({
          title: "Error",
          message: "An error occurred while saving your asset.",
          color: "red",
          icon: <FontAwesomeIcon icon={faX} />,
        });
      }
    })();
  };

  const onAddTrait = () => {
    form.insertListItem("traits", { label: "", value: "" });
  };

  return (
    <Box className={classes.wrapper}>
      <Stack justify="space-between" className={classes.wrapperStack}>
        <Stack>
          <img
            className={classes.image}
            src={URL.createObjectURL(
              selectedAsset?.file ?? new File([], "fake")
            )}
          />
          <Title order={4}>Basic Details</Title>
          <TextInput
            label={"Name"}
            withAsterisk
            {...form.getInputProps("name")}
          />
          <NumberInput
            label={"Weighting"}
            {...form.getInputProps("weighting")}
          />
          <Stack className={classes.traitStack}>
            <Title order={4}>Traits</Title>
            <Group>
              {form.values.traits.map((trait, index) => (
                <Group>
                  <TextInput
                    label={"Label"}
                    withAsterisk
                    {...form.getInputProps(`traits.${index}.label`)}
                  />
                  <TextInput
                    label={"Value"}
                    withAsterisk
                    {...form.getInputProps(`traits.${index}.value`)}
                  />
                </Group>
              ))}
            </Group>
            <Button onClick={onAddTrait}>Add trait</Button>
          </Stack>
        </Stack>
        <Button onClick={onSubmit} disabled={!form.isDirty()}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};
