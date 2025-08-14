import { App } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_USER, GET_USERS } from "../../entities/user/gql";

export function useDeleteUser() {
  const { modal, notification } = App.useApp();
  const [mutate] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  return (id: string) => {
    modal.confirm({
      title: "Delete user?",
      content: "This action cannot be undone.",
      okButtonProps: { danger: true },
      onOk: async () => {
        await mutate({ variables: { id } });
        notification.success({ message: "User deleted" });
      },
    });
  };
}
