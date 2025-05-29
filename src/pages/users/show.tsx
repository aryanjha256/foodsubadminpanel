import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const UserShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: subscriptionData, isLoading: subscriptionIsLoading } = useOne({
    resource: "subscriptions",
    id: record?.subscription || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{"Email"}</Title>
      <TextField value={record?.email} />
      <Title level={5}>{"Subscription"}</Title>
      <TextField
        value={
          subscriptionIsLoading ? (
            <>Loading...</>
          ) : (
            <>{subscriptionData?.data?.name}</>
          )
        }
      />
      <Title level={5}>{"Status"}</Title>
      <TextField value={record?.status} />
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
