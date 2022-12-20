import { useMany, useOne } from "@pankod/refine-core";
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
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import React, {useEffect, useState}  from 'react'
import { Select } from "@pankod/refine-antd";
import useDimension from "./hooks/useDimension";
import { DownloadOutlined } from "@ant-design/icons";
import { useThemeSwitcher } from "react-css-theme-switcher";


export const PDfDownload: React.FC = () => {






  const [selectedPaper,setSelectedPaper] = useState("")
const {isWidthSmall} = useDimension();
const { currentTheme } = useThemeSwitcher();

    const paperNames = useMany({resource: "", ids:[]})
    const paperNamesData = paperNames.data
    let paperData = paperNamesData &&  Object.keys(paperNamesData)
    const selectDataForPapers = paperData?.map(i=>{
      return ({value:i,label:i})
    })

    useEffect(()=>{
      selectDataForPapers && setSelectedPaper(selectDataForPapers[0]?.value)
    },[selectDataForPapers?.length])

const obj = {
          "Al / Machine Learning":[],
          "Biotechnology":[],
          "Cloud Computing":[],
          "Contract Research Organisation":[],
          "Data Analytics Provider":[],
          "Data Storage Solutions":[],
          "Diagnostic Equipment / Services":[],
          "Digital PCR (polymerase chain reaction)":[],
          "Gene Sequencing Platforms / Services":[],
          "Government (incl regulatory, economic development)":[],
          "High Performance Computing/Data Management Health System":[],
          "Informatics":[],
          "Investor":[],
          "Medical Device":[],
          "Pharmaceutical":[],
          "Professional Advisory / Legal / Consultancy":[],
          "Research Institute":[],
          "University or other Academia":[],
          "Other":[]
}
const pdfDownloadFormData = useOne({
  resource: selectedPaper,
  id: 1,

    })

    const selectedPaperData = pdfDownloadFormData?.data
    // @ts-ignore
    selectedPaperData && Object.values(selectedPaperData)?.map(i=>obj[i.workfor].push(i))


          ChartJS.register(
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
            Legend,
            ArcElement
          );
          
          const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: true,
                text: selectedPaper,
                color: "#696969",
              },
            },
            scales: {
              x: {
              display: !isWidthSmall,
              ticks: {
                color: currentTheme === "light" ? "black" : "gray"
              },
              grid: {
                color: currentTheme === "light" ? "lightgray" : "gray"
              },
            },
              y: {
               ticks: {
                color: currentTheme === "light" ? "black" : "gray"
                },
                grid: {
                  color: currentTheme === "light" ? "lightgray" : "gray"
                },
              },            
              },
          };
          

          const labels = [
          "Al / Machine Learning",
          "Biotechnology",
          "Cloud Computing",
          "Contract Research Organisation",
          "Data Analytics Provider",
          "Data Storage Solutions",
          "Diagnostic Equipment / Services",
          "Digital PCR (polymerase chain reaction)",
          "Gene Sequencing Platforms / Services",
          "Government (incl regulatory, economic development)",
          "High Performance Computing/Data Management Health System",
          "Informatics",
          "Investor",
          "Medical Device",
          "Pharmaceutical",
          "Professional Advisory / Legal / Consultancy",
          "Research Institute",
          "University or other Academia",
          "Other"
        ];
          
          const dataChart = {
            labels,
            datasets: [
              {
                label: 'work For',
                data: Object.values(obj).map(i=>i.length),
                backgroundColor: "rgba(0, 255, 167)",
            }
            ],
          };

          const objPie: any = {}

          selectedPaperData && Object.values(selectedPaperData).map((i:any)=>{
            if (objPie[i.country]) objPie[i.country]=[...objPie[i.country],i.country]
            else objPie[i.country]=[i.country]
            })

            
            const filteredPieData = Object.values(objPie).map((i:any)=>{
              return ({[i[0]] : i.length })
            })
          const sortedPieData = filteredPieData.sort((a,b)=>Object.values(b)[0]-Object.values(a)[0])



          const dataPie = {
            labels: selectedPaperData && sortedPieData.map(i=>{return(Object.keys(i))}).slice(0,6),
            datasets: [
              {
                label: 'Country',
                data: selectedPaperData && sortedPieData.map(i=>{return(Object.values(i))}).slice(0,6),
                backgroundColor: [
                  'rgba(242,190,105,255)',
                  'rgba(245,208,196,255)',
                  'rgba(244,209,195,255)',
                  'rgba(172,183,187,255)',
                  'rgba(198,215,210,255)',
                  'rgba(96,150,150,255)',
                ],
                borderColor: [
                  'rgba(242,190,105,255)',
                  'rgba(245,208,196,255)',
                  'rgba(244,209,195,255)',
                  'rgba(172,183,187,255)',
                  'rgba(198,215,210,255)',
                  'rgba(96,150,150,255)',
                ],
                borderWidth: 1,
                radius: "70%",
                },
            ],
            align: "center",
          };

    return (
        <div> 
          {selectDataForPapers && <Select className="select_btn" allowClear placeholder="Select a paper" defaultValue={selectDataForPapers[0]?.value} options={selectDataForPapers} onChange={(e)=>setSelectedPaper(e)}/> }
            <Bar className="bar_char" options={options} data={dataChart} />
            <div className="chart_gen" >
            <div className="chart_chi" >
            {selectedPaper && <Pie className="pie_char" data={dataPie}/>}
            </div>
            <div className="top" >
            {selectedPaperData && <span className="total" ><DownloadOutlined/> Total Download : <b>{(Object.values(selectedPaperData)).length}</b></span>}  
            </div>
            </div>
        </div>
    );
};