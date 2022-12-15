import { LogoutOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "@pankod/refine-antd";
import { useGetIdentity, useLogout } from "@pankod/refine-core";


export default function Navbar() {
    const { mutate: logout } = useLogout();
    const { data: identity } = useGetIdentity<{ avatar:string ,email:string ,id: number; name: string}>();
  return (
    <div className="navbar" >
        <img className="avatar_img" src={identity?.avatar} alt="" />
        {identity?.email}
        <Tooltip title="logout">

      <Button className="logbtn" onClick={() => logout()} icon={<LogoutOutlined/>}></Button>
        </Tooltip>
        
        
    </div>
  )
}
