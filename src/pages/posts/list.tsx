import { 
    List,
    TagField,
    TextField,
    DateField,
    Table,
    useTable,
} from "@pankod/refine-antd";
import { useMany } from "@pankod/refine-core";
import {ICategory, IPost} from "interfaces";

export const PostList: React.FC = () => {
    const {tableProps} = useTable<IPost>();

    const categoryIds = 
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title"/>
                    <Table.Column
                        dataIndex="status"
                        title="status"
                        render={(value) => <TagField value={value}/>} 
                    />
                    <Table.Column
                        dataIndex="createdAt"
                        title="createdAt"
                        render={(value) => <DateField format="LLL" value={value} />} 
                    />
                    <Table.Column
                        dataIndex={["category", "id"]}
                        title="category"
                        render={(value) => {
                            if (isLoading) {
                                return <TextField value="Loading..." />;
                            }

                            return (
                                <TextField
                                    value={
                                        categoriesData?.data.find((item) => item.id === value)?.title
                                    }
                                />
                            );
                        }}
                    />
            </Table>
        </List>
    );
};