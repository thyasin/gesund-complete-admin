import { useList } from "@pankod/refine-core";
import { Select, Spin } from "@pankod/refine-antd";

import { useState } from "react";
import "../style.scss"

import { LoadingOutlined } from "@ant-design/icons";
import { OptionsTimeRange } from "pages/visit_stats/optionsTimeRange";
import ViewAll from "components/button/ViewAll";

export default function PageVisit (){


 const [ selectedTimeRange,setSelectedTimeRange] = useState("7daysAgo")

  const a: any = useList({ resource: JSON.stringify({startDate:selectedTimeRange,metric:"eventCount"}) });
  const data = a?.data?.data;

  data?.rows?.sort((a:any,b:any)=>(b?.metricValues[0]?.value)-(a?.metricValues[0]?.value))

  const sum = data?.rows?.reduce(getSum,0)

  function getSum(total:number, num:any) {
    return total + +(num.metricValues[0]?.value);
  }

const dataPie = {}
data?.rows?.map((i: any) =>{
   (dataPie as any)[i.dimensionValues[0].value] = +(i.metricValues[0].value)}
  )

  const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

  return (
    <div className="pageVisitContainer">
      <div className="selectBoxContainer">
<span style={{fontSize:"16px"}}><b>User Traffic</b></span>
    <Select className="selectBox" placeholder="Select a filter" defaultValue={"7daysAgo"} options={OptionsTimeRange} onChange={(e)=>setSelectedTimeRange(e)}/>
      </div>

        <span style={{fontSize:"40px"}}>{sum}</span>
      {data ? <div style={{ display: "flex" }} className="pageVisitMain">
  
        <div className="pageVisitBoxWithButton">
            <div className="pageVisitTitle">
                <span>Top Countries</span>
                <span>Event</span>
            </div>
          <div className="pageVisitBox">
          {(data?.rows?.slice(0,5).map((i: any) =>
          (
            <div key={i.dimensionValues[0].value} className="pageVisitText"  >
              <span>{i.dimensionValues[0].value}</span>
              {i.metricValues[0].value}
            </div>
          )
            // [data.dimensionHeaders[0].name]: i.dimensionValues[0].value, [data.metricHeaders[0].name]: i.metricValues[0].value 
          ))}
         
        </div> 

          <ViewAll path="/visit-stats"/>
          
        </div>
          
        


      </div> : <div className="spinnerPageVisit"><Spin indicator={antIcon}/></div>}
    </div>

  )
}
