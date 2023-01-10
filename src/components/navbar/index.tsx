import { LogoutOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "@pankod/refine-antd";
import { useGetIdentity, useLogout } from "@pankod/refine-core";
import "./style.scss";

export default function Navbar() {
    const { mutate: logout } = useLogout();
    const { data: identity } = useGetIdentity<{ avatar:string ,email:string ,id: number; name: string}>();
  return (
    <div className="navbar" >
        <img className="avatarImage" src={identity?.avatar} alt="" />
        {identity?.email}
        <Tooltip title="logout">

      <Button className="logoutButton" onClick={() => logout()} icon={<LogoutOutlined/>}></Button>
        </Tooltip>
        
        
    </div>
  )
}
