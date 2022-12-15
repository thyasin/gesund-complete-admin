import { LogoutOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "@pankod/refine-antd";
import { useGetIdentity, useLogout } from "@pankod/refine-core";


export default function Navbar() {
    const { mutate: logout } = useLogout();
    const { data: identity } = useGetIdentity<{ avatar:string ,email:string ,id: number; name: string}>();
  return (
    <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
        <img src={identity?.avatar} alt="" width="4%" style={{borderRadius:"100%",padding:"5px"}}/>
        {identity?.email}
        <Tooltip title="logout">

      <Button onClick={() => logout()} style={{backgroundColor:"transparent",border:"none"}} icon={<LogoutOutlined/>}></Button>
        </Tooltip>
        
        
    </div>
  )
}
