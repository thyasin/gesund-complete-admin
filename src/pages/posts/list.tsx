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
import React, {useState}  from 'react'
import { Select } from "@pankod/refine-antd";


export const PDfDownload: React.FC = () => {

  const [selectedPaper,setSelectedPaper] = useState("")


    const paperNames = useMany({resource: "", ids:[]})
    const paperNamesData = paperNames.data
    let paperData = paperNamesData &&  Object.keys(paperNamesData)
    const selectDataForPapers = paperData?.map(i=>{
      return ({value:i,label:i})
    })

// console.log(selectDataForPapers)


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
// @ts-ignore
    const b = pdfDownloadFormData?.data
    // @ts-ignore
      b && Object.values(b)?.map(i=>obj[i.workfor].push(i))


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
              },
            },
            scales: {
              x: {
              display: false,
              }
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
                backgroundColor: 'rgba(0, 255, 167)',
            }
            ],
          };

          const objPie: any = {}
          b && console.log(Object.values(b))

          b && Object.values(b).map((i:any)=>{
            if (objPie[i.country]) objPie[i.country]=[...objPie[i.country],i.country]
            else objPie[i.country]=[i.country]
            })



          const dataPie = {
            labels: b && Object.keys(objPie),
            datasets: [
              {
                label: 'Country',
                data: b && Object.values(objPie).map((i:any)=>i.length),
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
        <div >
          <Select className="select_btn" options={selectDataForPapers} onChange={(e)=>setSelectedPaper(e)}/>
            <Bar className="bar_char" options={options} data={dataChart} />
            <div className="chart_gen" >
            <ul className="list">
              <li>
                <div className="chart_chi" >
                  <Pie className="pie_char" data={dataPie}/>
                </div>
              </li>
              <li>
                <div className="top" >
                  <span className="total" >Total : {b && (Object.values(b)).length}</span>  
                </div>
              </li>
            </ul>
            </div>
        </div>
    );
};