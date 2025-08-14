import { Select } from "antd";
import { ROLE_OPTIONS } from "../config/constants";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../entities/user/gql";
import type { User } from "../../entities/user/types";
import { useUserStore } from "../../entities/user/model/userStore";

export function RoleCell({ data }: { data: User }) {
  const [updateUser] = useMutation(UPDATE_USER);
  const upsertUser = useUserStore((s) => s.upsertUser);

  return (
    <Select
      size="small"
      options={ROLE_OPTIONS as any}
      value={data.role}
      style={{ minWidth: 120 }}
      onChange={(role) => {
        updateUser({
          variables: { id: data.id, input: { ...data, role } },
          optimisticResponse: {
            updateUser: { ...data, role, __typename: "User" },
          },
          onCompleted: ({ updateUser }) => upsertUser(updateUser),
        });
      }}
    />
  );
}
