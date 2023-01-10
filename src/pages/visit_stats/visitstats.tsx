import { useList } from "@pankod/refine-core";
import { Select, Spin } from "@pankod/refine-antd";
import { Options } from "./options";
import { useState } from "react";
import "./style.scss"
import { OptionsTimeRange } from "./optionsTimeRange";
import GeoChart from "components/chart/GeoChart";
import { LoadingOutlined } from "@ant-design/icons";
import GeoMapChart from "components/chart/GeoMapChart";

export const VisitStats: React.FC = () =>{


  const [ selectedFilter,setSelectedFilter] = useState("eventCount")
  const [ selectedTimeRange,setSelectedTimeRange] = useState("7daysAgo")

  const a: any = useList({ resource: JSON.stringify({startDate:selectedTimeRange,metric:selectedFilter}) });
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
    <div>
      <div style={{display:"flex", justifyContent:"flex-end"}}>

    <Select placeholder="Select a filter" style={{marginRight:"6px"}} defaultValue={"7daysAgo"} options={OptionsTimeRange} onChange={(e)=>setSelectedTimeRange(e)}/>
    <Select placeholder="Select a filter" defaultValue={"eventCount"} options={Options} onChange={(e)=>setSelectedFilter(e)}/>
      </div>
      {data ? <div style={{ display: "flex" }} className="mainVisitBox">
        <div className="visitPieBox">
        <GeoChart data={dataPie} chartId="geochartvisit" />
        {/* <GeoMapChart chartId="geomapchart"/> */}
        </div>
        <div className="rightColBox">
          <div className="visitTextBox">
          {(data?.rows?.map((i: any) =>
          (
            <div key={i.dimensionValues[0].value} style={{ display: "flex", justifyContent: "space-between", width: "100%" }} >
              <span>{i.dimensionValues[0].value} :</span>
              {i.metricValues[0].value}
            </div>
          )
            // [data.dimensionHeaders[0].name]: i.dimensionValues[0].value, [data.metricHeaders[0].name]: i.metricValues[0].value 
          ))}
         
        </div> 
        <div className="totalTextBox" >

        Total {selectedFilter === "eventCount" ? "Page Views" : " Unique Visitors"} : <span>{sum}</span>
        </div>
        </div>
        


      </div> : <div className="spinner"><Spin indicator={antIcon}/></div>}
    </div>

  )
}
