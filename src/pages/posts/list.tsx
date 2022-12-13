import { 
    List,
    TagField,
    TextField,
    DateField,
    Table,
    useTable,
} from "@pankod/refine-antd";
import { useMany, useOne } from "@pankod/refine-core";
import {ICategory, IPost} from "interfaces";
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


import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"


export const PostList: React.FC = () => {
    const [chartData, setChartData] = useState<any>();


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
          "High Performance Computing/Data Management Hospital or other Healthcare or Health System":[],
          "Informatics":[],
          "Investor":[],
          "Medical Device":[],
          "Pharmaceutical":[],
          "Professional Advisory / Legal / Consultancy":[],
          "Research Institute":[],
          "University or other Academia":[],
          "Other":[]
}


    

    const a = useOne({
        resource: "categories",
        id: 1,
    })

    const b = a?.data
    // @ts-ignore
      b && Object.values(Object.values(b)[0])?.map(i=>obj[i.workfor].push(i))
console.log(obj)

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
                text: 'Chart.js Bar Chart',
              },
            },
          };
          
          const labels = ["Al / Machine Learning",
          "Biotechnology",
          "Cloud Computing",
          "Contract Research Organisation",
          "Data Analytics Provider",
          "Data Storage Solutions",
          "Diagnostic Equipment / Services",
          "Digital PCR (polymerase chain reaction)",
          "Gene Sequencing Platforms / Services",
          "Government (incl regulatory, economic development)",
          "High Performance Computing/Data Management Hospital or other Healthcare or Health System",
          "Informatics",
          "Investor",
          "Medical Device",
          "Pharmaceutical",
          "Professional Advisory / Legal / Consultancy",
          "Research Institute",
          "University or other Academia",
          "Other"];
          
          const data = {
            labels,
            datasets: [
              {
                label: 'work For',
                data: Object.values(obj).map(i=>i.length),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              }
            ],
          };

          const objPie: any = {}
          b && console.log(Object.values(Object.values(b)[0]))

          b && Object.values(Object.values(b)[0]).map((i:any)=>{
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
              },
            ],
          };

    return (
        // <div>
        //     {
        //         // @ts-ignore
        //         Object.values(Object.values(b)[0]).map((i:any)=>(
        //             <div>
        //                 {i.workfor}
        //                 {i.country}
        //             </div>
        //         ))
        //     }
        // </div>

        <div>
            {/* @ts-ignore */}
            <Bar options={options} data={data} />
            <Pie data={dataPie}/>
    </div>
    );
};