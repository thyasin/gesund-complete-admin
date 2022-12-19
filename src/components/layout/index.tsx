import { useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import {
    AntdLayout,
    Switch,
} from "@pankod/refine-antd";
import { Tooltip } from "@pankod/refine-antd";
import { useGetIdentity, useLogout } from "@pankod/refine-core";

export const Header: React.FC = () => {
    const [isLightMode, setIsLightMode] = useState<boolean>();
    const { switcher, themes, currentTheme } = useThemeSwitcher();
    const { mutate: logout } = useLogout();
    const { data: identity } = useGetIdentity<{ avatar:string ,email:string ,id: number; name: string}>();

    function toggleTheme(isChecked: boolean) { // added
        setIsLightMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
    };
    return (
        <AntdLayout.Header className="ant-head" style={currentTheme === "light" ? {backgroundColor: "#dcdcdc", padding: "0 24px"} : {backgroundColor: "#424242", padding: "0 24px"}}
        >
            <div className="head-items">
            <img className="avatar_img" src={identity?.avatar} alt="" />
        {identity?.email}
        </div>
        <Tooltip title="logout">

        </Tooltip>
        
        
            <div className="main fade-in">
                <Switch
                    checkedChildren="🌜"
                    unCheckedChildren="🌞"
                    defaultChecked
                    checked={isLightMode}
                    onChange={toggleTheme}
                />
            </div>
        </AntdLayout.Header>
    );
};