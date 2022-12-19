import { useList } from "@pankod/refine-core";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Select } from "@pankod/refine-antd";
import { Options } from "./options";
import { useState } from "react";
import "./style.css"
import { OptionsTimeRange } from "./optionsTimeRange";

export default function VisitStats() {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const [ selectedFilter,setSelectedFilter] = useState("eventCount")
  const [ selectedTimeRange,setSelectedTimeRange] = useState("yesterday")

  const a: any = useList({ resource: JSON.stringify({startDate:selectedTimeRange,metric:selectedFilter}) });
  const data = a?.data?.data;

  data?.rows?.sort((a:any,b:any)=>(b?.metricValues[0]?.value)-(a?.metricValues[0]?.value))

  const sum = data?.rows?.reduce(getSum,0)

  function getSum(total:number, num:any) {
    return total + +(num.metricValues[0]?.value);
  }


  const dataPie = {
    labels: data?.rows?.map((i: any) => i.dimensionValues[0].value).slice(0,6),
    datasets: [
      {
        label: 'Country',
        data: data?.rows?.map((i: any) => i.metricValues[0].value).slice(0,6),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        radius: "70%",
      },
    ],
    align: "center",
  };




  return (
    <div>
      <div style={{display:"flex", justifyContent:"flex-end"}}>

    <Select placeholder="Select a filter" style={{marginRight:"6px"}} defaultValue={"yesterday"} options={OptionsTimeRange} onChange={(e)=>setSelectedTimeRange(e)}/>
    <Select placeholder="Select a filter" defaultValue={"eventCount"} options={Options} onChange={(e)=>setSelectedFilter(e)}/>
      </div>
      {data ? <div style={{ display: "flex" }} className="mainVisitBox">
        <div className="visitPieBox">

          <Pie data={dataPie} className="visitPieChart" style={{ width: "100%", height: "auto" }} />
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

        Total {selectedFilter} : <span>{sum}</span>
        </div>
        </div>
        


      </div> : null}
    </div>

  )
}
