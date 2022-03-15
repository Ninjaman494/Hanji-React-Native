import { Favorite } from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import React, { ComponentProps, FC } from "react";
import { Button, Dialog, Text } from "react-native-paper";

export type DeleteFavoriteModalProps = Omit<
  ComponentProps<typeof Dialog>,
  "children"
> & {
  favorites: Favorite[];
  favToDelete: Favorite;
  onSubmit: () => void;
};

const DeleteFavoriteModal: FC<DeleteFavoriteModalProps> = ({
  favorites,
  favToDelete,
  onSubmit,
  onDismiss,
  ...rest
}) => {
  const { setFavorites } = useSetFavorites();

  const handleSubmit = async () => {
    await setFavorites(favorites.filter((el) => el !== favToDelete));
    onSubmit();
  };

  return (
    <Dialog
      onDismiss={onDismiss}
      style={[{ maxWidth: 500, width: "90%", alignSelf: "center" }, rest.style]}
      {...rest}
    >
      <Dialog.Title>Delete Favorite?</Dialog.Title>
      <Dialog.Content>
        <Text>Are you sure you want to delete this favorite?</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={handleSubmit}>Confirm</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DeleteFavoriteModal;
