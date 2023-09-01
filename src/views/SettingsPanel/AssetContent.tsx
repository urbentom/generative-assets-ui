import {
  Box,
  Button,
  Stack,
  Text,
  TextInput,
  createStyles,
} from "@mantine/core";
import { useRecoilValue } from "recoil";
import {
  currentSettingsAtom,
  selectedAssetAtom,
  selectedLayerAtom,
} from "../../atoms";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/pro-regular-svg-icons";

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
  stack: {
    height: "95%",
  },
}));

export const AssetContent = () => {
  const currentSettings = useRecoilValue(currentSettingsAtom);
  const selectedAsset = useRecoilValue(selectedAssetAtom);
  const selectedLayer = useRecoilValue(selectedLayerAtom);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      name: selectedAsset?.name,
    },

    validate: {
      name: (value) => {
        return selectedLayer &&
          selectedAsset?.name !== value &&
          selectedLayer.assets.findIndex((asset) => asset.name === value) === -1
          ? null
          : "Name already exists";
      },
    },
  });

  const onSubmit = () => {
    form.onSubmit((values) => {
      console.log(values);
      notifications.show({
        title: "Asset saved",
        message: `Your Asset '${values.name}' was saved successfully!`,
        color: "green",
        icon: <FontAwesomeIcon icon={faCircleCheck} />,
      });
    })();
  };

  return (
    <Box className={classes.wrapper}>
      <Stack justify="space-between" className={classes.stack}>
        <Stack>
          <img
            className={classes.image}
            src={URL.createObjectURL(
              selectedAsset?.file ?? new File([], "fake")
            )}
          />
          <TextInput
            label={"Name"}
            withAsterisk
            {...form.getInputProps("name")}
          />
        </Stack>
        <Button onClick={onSubmit} disabled={!form.isDirty()}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};
