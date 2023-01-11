import { useList } from "@pankod/refine-core";
import { Progress, Select, Spin } from "@pankod/refine-antd";
import { Options } from "./options";
import { useState } from "react";
import "./style.scss"
import { OptionsTimeRange } from "./optionsTimeRange";
import { LoadingOutlined } from "@ant-design/icons";
import GeoMapChart from "components/chart/GeoMapChart";
import useDimension from "pages/download_pdf/hooks/useDimension";

export const VisitStats: React.FC = () =>{
  const isWidthSmall = useDimension()

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
    <div className="visitStatsMain">
      <div className="visitStatsPageTitle" >
      <span className="pageTitle" >Visit Stats</span>
<div className="filterBox">
  <Select placeholder="Select a filter" style={{marginRight:"6px"}} defaultValue={"7daysAgo"} options={OptionsTimeRange} onChange={(e)=>setSelectedTimeRange(e)}/>
    <Select placeholder="Select a filter" defaultValue={"eventCount"} options={Options} onChange={(e)=>setSelectedFilter(e)}/>
</div>
    
      </div>

      {data ? <div style={{ display: "flex" }} className="mainVisitBox">
        <div className="visitPieBox">
        <div className="mapTitle">
                  <b>Users</b> by Country
                </div>
        <GeoMapChart
                  isWidthSmall={isWidthSmall}
                  chartId="geomapchartPdf"
                  data={dataPie}
                />
        </div>
        <div className="rightColBox">
          <div className="visitTextBox">
          <div className="visitSumBox">
                  <span className="totalDownloadBoxTitle">Total Page Views </span> <span>{sum}</span></div>
            
          {(data?.rows?.map((i: any) =>
          (            <div key={i.dimensionValues[0].value}>
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <span >{i.dimensionValues[0].value}</span>
                        <span>{i.metricValues[0].value}</span>
                      </div>                  
                        <Progress
                          percent={(i.metricValues[0].value / sum) * 100}
                          showInfo={false}
                          strokeColor="#fff"
                        />
                    </div>)
          ))}
         
        </div> 
        </div>
        


      </div> : <div className="spinner"><Spin indicator={antIcon}/></div>}
    </div>

  )
}
