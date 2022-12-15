import { useTitle, useMenu } from "@pankod/refine-core";
import { Menu } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import { FilePdfOutlined } from "@ant-design/icons";

const { Link } = routerProvider;

interface ISiderProps{
        isSiderCollapsed:boolean
    }

export const CustomSider = () => {
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();

    return (
        <>
            {Title && <Title collapsed={false} />}
            <Menu selectedKeys={[selectedKey]} mode="vertical">
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={<FilePdfOutlined />}>
                        <Link to={route ?? ""}>{label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </>
    );
};