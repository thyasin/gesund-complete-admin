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
import React, { useState, useEffect } from 'react'
import { Button, Modal, Select } from "@pankod/refine-antd";
import useDimension from "./hooks/useDimension";
import { DownloadOutlined } from "@ant-design/icons";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const PDfDownload: React.FC = () => {

  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await document.getElementById("pdf");
    //@ts-ignore
    pdf.html(data).then(() => {
      pdf.save("shipping_label.pdf");
    });
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [selectedPaper, setSelectedPaper] = useState("")
  const { isWidthSmall } = useDimension();
  const { currentTheme } = useThemeSwitcher();

  const paperNames = useMany({ resource: "", ids: [] })
  const paperNamesData = paperNames.data
  let paperData = paperNamesData && Object.keys(paperNamesData)
  const selectDataForPapers = paperData?.map(i => {
    return ({ value: i, label: i })
  })

  useEffect(() => {
    selectDataForPapers && setSelectedPaper(selectDataForPapers[0]?.value)
  }, [selectDataForPapers?.length])


  const obj = {
    "Al / Machine Learning": [],
    "Biotechnology": [],
    "Cloud Computing": [],
    "Contract Research Organisation": [],
    "Data Analytics Provider": [],
    "Data Storage Solutions": [],
    "Diagnostic Equipment / Services": [],
    "Digital PCR (polymerase chain reaction)": [],
    "Gene Sequencing Platforms / Services": [],
    "Government (incl regulatory, economic development)": [],
    "High Performance Computing/Data Management Health System": [],
    "Informatics": [],
    "Investor": [],
    "Medical Device": [],
    "Pharmaceutical": [],
    "Professional Advisory / Legal / Consultancy": [],
    "Research Institute": [],
    "University or other Academia": [],
    "Other": []
  }
  const pdfDownloadFormData = useOne({
    resource: selectedPaper,
    id: 1,

  })

  const selectedPaperData = pdfDownloadFormData?.data
  // @ts-ignore
  selectedPaperData && Object.values(selectedPaperData)?.map(i => obj[i.workfor].push(i))


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
        data: Object.values(obj).map(i => i.length),
        backgroundColor: "rgba(0, 255, 167)",
      }
    ],
  };

  const objPie: any = {}

  selectedPaperData && Object.values(selectedPaperData).map((i: any) => {
    if (objPie[i.country]) objPie[i.country] = [...objPie[i.country], i.country]
    else objPie[i.country] = [i.country]
  })


  const filteredPieData = Object.values(objPie).map((i: any) => {
    return ({ [i[0]]: i.length })
  })
  const sortedPieData = filteredPieData.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])



  const dataPie = {
    labels: selectedPaperData && sortedPieData.map(i => { return (Object.keys(i)) }).slice(0, 6),
    datasets: [
      {
        label: 'Country',
        data: selectedPaperData && sortedPieData.map(i => { return (Object.values(i)) }).slice(0, 6),
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
      <div>
        {selectDataForPapers && <Select className="select_btn" allowClear placeholder="Select a paper" defaultValue={selectDataForPapers[0]?.value} options={selectDataForPapers} onChange={(e) => setSelectedPaper(e)} />}            
        <Button type="primary" style={{backgroundColor:"darkGray",borderColor:"darkGray"}} onClick={showModal} icon={<DownloadOutlined />}>
          Export Report Pdf
        </Button>
      </div>

        <Bar className="bar_char" options={options} data={dataChart} />
      <div className="chart_gen" >
        <div className="chart_chi" >
          {selectedPaper && <Pie className="pie_char" data={dataPie} />}
        </div>
        <div className="top" >
          {selectedPaperData && <span className="total" ><DownloadOutlined /> Total Download : <b>{(Object.values(selectedPaperData)).length}</b></span>}
        </div>



      </div>


      <Modal visible={isModalOpen} okText="Download" onOk={()=>{createPDF();handleOk()}} onCancel={handleCancel} >
        <div style={{ backgroundColor: "white", padding: "8px", height: "50vh" }}>
          {selectedPaperData && Object.values(selectedPaperData)?.map(i => (
            <div id="pdf" key={i.email} style={{ color: "black" }}>
              {i.email} : {i.workfor},{i.jobtitle}
            </div>
          ))}


        </div>
      </Modal>
    </div>
  );
};