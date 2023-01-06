import { ArrowRightOutlined, RightOutlined } from '@ant-design/icons'
import { Link } from '@pankod/refine-react-router-v6'
import "./styles.scss"

export default function ViewAll({path}:{path:string}) {
  return (
    <Link to={path}>
    <div className='buttonMain'>
        <span className='text'>View All</span>
        <ArrowRightOutlined className='icon'/>
    </div>
    </Link>
  )
}
