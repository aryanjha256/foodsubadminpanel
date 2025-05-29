import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useMany } from "@refinedev/core";
import { Select, Space, Table } from "antd";

export const UserList: React.FC = () => {
  const { tableProps, filters, setFilters } = useTable({
    syncWithLocation: true,
    filters: {
      initial: [
        {
          field: "status",
          operator: "eq",
          value: "active",
        },
        {
          field: "subscription",
          operator: "eq",
          value: "1",
        },
      ],
    },
  });

  const { data: subscriptions } = useMany({
    resource: "subscriptions",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.subscription)
        .filter(Boolean) ?? [],
  });

  return (
    <List>
      <div style={{ marginBottom: "1rem" }}>
        <Select
          value={filters[0]?.value}
          onChange={(value) =>
            setFilters([{ field: "status", operator: "eq", value: value }])
          }
          options={[
            { label: "All", value: "" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
        />
        <Select
          value={filters[1]?.value}
          onChange={(value) =>
            setFilters([
              { field: "subscription", operator: "eq", value: value },
            ])
          }
          options={[
            { label: "All", value: "" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
          ]}
        />
      </div>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column
          dataIndex="status"
          title={"Status"}
          render={(value: any) =>
            value === "active" ? (
              <i className="bx bx-check-circle " style={{ color: "green" }} />
            ) : (
              <i className="bx bx-x-circle " style={{ color: "red" }} />
            )
          }
        />
        <Table.Column
          dataIndex={["updatedAt"]}
          title={"Updated at"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["subscription"]}
          title={"Subscription"}
          render={(value: any) => {
            const subscription = subscriptions?.data?.find(
              (item: any) => item.id === value
            );
            return subscription?.name;
          }}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
