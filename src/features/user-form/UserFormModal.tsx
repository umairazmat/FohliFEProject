import { Modal, Form, Input, Select, Radio, App } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_USER, UPDATE_USER, GET_USERS } from "../../entities/user/gql";
import { ROLE_OPTIONS } from "../../shared/config/constants";
import { useUserStore } from "../../entities/user/model/userStore";

type Values = {
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "banned";
};

export function UserFormModal() {
  const [form] = Form.useForm<Values>();
  const { formOpen, editingUser, closeForm } = useUserStore();
  const { notification } = App.useApp(); // ✅ Use App context

  const [addUser, { loading: adding }] = useMutation(ADD_USER, {
    refetchQueries: [GET_USERS],
  });
  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USERS],
  });

  const isEdit = !!editingUser;

  return (
    <Modal
      title={isEdit ? "Edit User" : "Add User"}
      open={formOpen}
      okText="Save"
      cancelText="Cancel"
      confirmLoading={adding || updating}
      onCancel={() => {
        form.resetFields();
        closeForm();
      }}
      onOk={() => {
        form.validateFields().then(async (values) => {
          if (isEdit) {
            await updateUser({
              variables: {
                id: editingUser!.id,
                input: { ...editingUser!, ...values },
              },
            });
            notification.success({ message: "User updated" }); // ✅ No warning
          } else {
            await addUser({
              variables: {
                input: { ...values, createdAt: new Date().toISOString() },
              },
            });
            notification.success({ message: "User added" }); // ✅ No warning
          }
          form.resetFields();
          closeForm();
        });
      }}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={
          isEdit
            ? {
                name: editingUser!.name,
                email: editingUser!.email,
                role: editingUser!.role,
                status: editingUser!.status === "banned" ? "banned" : "active",
              }
            : { role: "user", status: "active" }
        }
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Full name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select options={ROLE_OPTIONS as any} />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value="active">Active</Radio.Button>
            <Radio.Button value="banned">Banned</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}
