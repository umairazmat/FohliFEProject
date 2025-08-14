import { Button, Space } from "antd";
import { useUserStore } from "../../entities/user/model/userStore";
import type { User } from "../../entities/user/types";

export function ActionCell({
  data,
  onDelete,
}: {
  data: User;
  onDelete: (id: string) => void;
}) {
  const openForEdit = useUserStore((s) => s.openForEdit);
  return (
    <Space>
      <Button size="small" onClick={() => openForEdit(data)}>
        Edit
      </Button>
      <Button size="small" danger onClick={() => onDelete(data.id)}>
        Delete
      </Button>
    </Space>
  );
}
