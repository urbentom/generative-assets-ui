import {
  Box,
  Button,
  NumberInput,
  Stack,
  Text,
  TextInput,
  createStyles,
} from "@mantine/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { faCircleCheck, faX } from "@fortawesome/pro-regular-svg-icons";
import { notifications } from "@mantine/notifications";

import {
  currentSettingsAtom,
  layersAtom,
  selectedLayerAtom,
} from "../../atoms";
import { useForm } from "@mantine/form";
import { Layer } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100%",
  },
  wrapperStack: {
    height: "95%",
  },
}));

export const LayerContent = () => {
  const { classes } = useStyles();

  const selectedLayer = useRecoilValue(selectedLayerAtom);
  const [layers, setLayers] = useRecoilState(layersAtom);

  const form = useForm({
    initialValues: {
      name: selectedLayer?.name,
      index: selectedLayer?.index,
    },
    validate: {
      name: (value) => {
        return selectedLayer &&
          (selectedLayer.name === value ||
            layers.findIndex((layer) => layer.name === value) === -1)
          ? null
          : "Name already exists";
      },
      index: (value) => {
        return selectedLayer &&
          (selectedLayer.index === value ||
            layers.findIndex((layer) => layer.index === value) === -1)
          ? null
          : "Index already exists";
      },
    },
  });

  const onSubmit = () => {
    form.onSubmit((values) => {
      try {
        setLayers((layers) => {
          return layers.map((layer) => {
            if (layer.name === selectedLayer?.name) {
              return {
                ...layer,
                name: values.name,
                index: values.index,
              };
            }

            return layer;
          }) as Layer[];
        });
        notifications.show({
          title: "Layer saved",
          message: `Your Layer '${values.name}' was saved successfully!`,
          color: "green",
          icon: <FontAwesomeIcon icon={faCircleCheck} />,
        });
      } catch (error) {
        console.error(error);
        notifications.show({
          title: "Error",
          message: "An error occurred while saving your Layer.",
          color: "red",
          icon: <FontAwesomeIcon icon={faX} />,
        });
      }
    })();
  };

  return (
    <Box className={classes.wrapper}>
      <Stack className={classes.wrapperStack} justify="space-between">
        <Stack>
          <TextInput
            withAsterisk
            label="Name"
            {...form.getInputProps("name")}
          />
          <NumberInput
            withAsterisk
            label="Index"
            {...form.getInputProps("index")}
          />
        </Stack>
        <Button onClick={onSubmit} disabled={!form.isDirty()}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};
