import { Edit, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select } from "antd";

export const UserEdit = () => {
  const { formProps, saveButtonProps, queryResult, formLoading } = useForm({});

  const userData = queryResult?.data?.data;

  const { selectProps: subscriptionSelectProps } = useSelect({
    resource: "subscriptions",
    defaultValue: userData?.subscription,
    queryOptions: {
      enabled: !!userData?.subscription,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
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
          initialValue={formProps?.initialValues?.subscription?.id}
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
          initialValue={formProps?.initialValues?.status}
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
            defaultValue={formProps?.initialValues?.status}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
