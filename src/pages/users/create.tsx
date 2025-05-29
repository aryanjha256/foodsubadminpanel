import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: subscriptionSelectProps } = useSelect({
    resource: "subscriptions",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Email"}
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Subscription"}
          name={["subscription", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...subscriptionSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"active"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            defaultValue={"active"}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
