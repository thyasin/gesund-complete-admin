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
import DownloadPdfModal from "./components/DownloadPdfModal";
import autoTable from 'jspdf-autotable'

export const PDfDownload: React.FC = () => {

  const createPDF = async () => {
    const pdf = new jsPDF("landscape", "pt", "a4");
    autoTable(pdf, { html: '#table', 
    // styles: { fillColor: [255, 0, 0] },
    headStyles: {fillColor: [173, 216, 230]},
    showHead: "everyPage",
    useCss: true,
    columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Cells in first column centered and green
    margin: { top: 10 }, })
    
    
    // const data = await document.getElementById("pdf");
    // //@ts-ignore
    // pdf.html(data).then(() => {
       pdf.save("export_pdf_info.pdf");
    // });
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
          'rgba(255,206,48,255)',
          'rgba(69,174,179,255)',
          'rgba(242,101,28,255)',
          'rgba(202,28,39,255)',
          'rgba(151,31,123,255)',
          'rgba(35,108,78,255)',
        ],
        borderColor: [
          'rgba(255,206,48,255)',
          'rgba(69,174,179,255)',
          'rgba(242,101,28,255)',
          'rgba(202,28,39,255)',
          'rgba(151,31,123,255)',
          'rgba(35,108,78,255)',
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
        <Button type="primary" className="pdfexpbtn" onClick={showModal} icon={<DownloadOutlined />}>
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


      <DownloadPdfModal isModalOpen={isModalOpen} createPDF={createPDF} handleOk={handleOk} handleCancel={handleCancel} selectedPaperData={selectedPaperData} />


    </div>
  );
};