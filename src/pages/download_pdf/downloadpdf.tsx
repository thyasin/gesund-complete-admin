import { useMany, useOne } from "@pankod/refine-core";
import React, { useState, useEffect } from "react";
import { Button, Progress, Select, Spin } from "@pankod/refine-antd";
import useDimension from "./hooks/useDimension";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { jsPDF } from "jspdf";
import DownloadPdfModal from "./components/DownloadPdfModal";
import autoTable from "jspdf-autotable";
import GeoChart from "components/chart/GeoChart";
import BarChart from "components/chart/BarChart";
import "./style.scss";
import SemiCircleChart from "components/chart/SemiCircleChart";
import GeoMapChart from "components/chart/GeoMapChart";
import ViewAll from "components/button/ViewAll";

interface IPdfDownloadProps {
  isDashboardSemiPieView?: boolean;
  isDashboardMapChartView?: boolean;
}

export const PDfDownload: React.FC = ({
  isDashboardSemiPieView,
  isDashboardMapChartView,
}: IPdfDownloadProps) => {
  const createPDF = async () => {
    const pdf = new jsPDF("landscape", "pt", "a4");
    autoTable(pdf, {
      html: "#table",
      headStyles: { fillColor: [173, 216, 230] },
      showHead: "everyPage",
      useCss: true,
      columnStyles: { 0: { halign: "center", fillColor: [0, 255, 0] } }, // Cells in first column centered and green
      margin: { top: 10 },
    });

    pdf.save("export_pdf_info.pdf");
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {isWidthSmall} = useDimension()
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [selectedPaper, setSelectedPaper] = useState("");
  // const { isWidthSmall } = useDimension();
  // const { currentTheme } = useThemeSwitcher();

  const paperNames = useMany({ resource: "", ids: [] });
  const paperNamesData = paperNames.data;
  let paperData = paperNamesData && Object.keys(paperNamesData);
  const selectDataForPapers = paperData?.map((i) => {
    return { value: i, label: i };
  });

  useEffect(() => {
    selectDataForPapers && setSelectedPaper(selectDataForPapers[0]?.value);
  }, [selectDataForPapers?.length]);

  const obj = {
    "Al / Machine Learning": 0,
    Biotechnology: 0,
    "Cloud Computing": 0,
    "Contract Research Organisation": 0,
    "Data Analytics Provider": 0,
    "Data Storage Solutions": 0,
    "Diagnostic Equipment / Services": 0,
    "Digital PCR (polymerase chain reaction)": 0,
    "Gene Sequencing Platforms / Services": 0,
    "Government (incl regulatory, economic development)": 0,
    "High Performance Computing/Data Management Health System": 0,
    Informatics: 0,
    Investor: 0,
    "Medical Device": 0,
    Pharmaceutical: 0,
    "Professional Advisory / Legal / Consultancy": 0,
    "Research Institute": 0,
    "University or other Academia": 0,
    Other: 0,
  };
  const pdfDownloadFormData = useOne({
    resource: selectedPaper,
    id: 1,
  });

  const selectedPaperData = pdfDownloadFormData?.data;

  selectedPaperData &&
    Object.values(selectedPaperData)?.map(
      (i) => ((obj as any)[i.workfor] = (obj as any)[i.workfor] + 1)
    );

  const geoChartData: any = {};

  selectedPaperData &&
    Object.values(selectedPaperData).map((i) => {
      if (geoChartData[i.country])
        geoChartData[i.country] = geoChartData[i.country] + 1;
      else geoChartData[i.country] = 1;
    });


  return (
    
      <>{selectedPaperData ?
      <div>
      {!(isDashboardMapChartView || isDashboardSemiPieView) ? <div>
        {selectDataForPapers && (
          <Select
            className="selectButton"
            allowClear
            placeholder="Select a paper"
            defaultValue={selectDataForPapers[0]?.value}
            options={selectDataForPapers}
            onChange={(e) => setSelectedPaper(e)}
          />
        )}
        <Button
          type="primary"
          className="pdfexpbtn"
          onClick={showModal}
          icon={<DownloadOutlined />}
        >
          Export Report Pdf
        </Button>
      </div> : null}
      {selectedPaperData &&
        (!isDashboardSemiPieView ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
        ) : (
          <div className="semiPieChartContainer">
            <SemiCircleChart
            isWidthSmall={isWidthSmall}
            chartId="semipie"
            data={obj}
            totalDownload={Object.values(selectedPaperData).length}
          />
          </div>
          
        ))}
      <div className="chartsGeneral">
        {!isDashboardSemiPieView ? (
          <div className="chartsChildren">
            {/* <GeoChart chartId="geochart" data={geoChartData} /> */}
            <div>
            <span className="mapTitle"><b>Users</b> by Country</span>
            <GeoMapChart isWidthSmall={isWidthSmall} chartId="geomapchart" data={geoChartData} />
            </div>
            <div className="pdfDownloadCountryBox">
              <div className="totalDownloadBox">
                <span className="totalDownloadBoxTitle">Total Download </span>
                {selectedPaperData && (
                  <span  className="totalDownloadBoxTitle">{Object.values(selectedPaperData).length}</span>
                )}
              </div>
              {Object.keys(geoChartData).sort((a,b)=>geoChartData[b] - geoChartData[a])
                .slice(0, 4)
                .map((i) => (
                  <div className="textWithProgressBar">
                    <div className="downloadbyCountry">
                    <span>{i}</span>
                    <span>{geoChartData[i]}</span>
                  </div>
                  {selectedPaperData && <Progress percent={(geoChartData[i] / Object.values(selectedPaperData).length)* 100} showInfo={false} strokeColor="#fff" />}
                  {/* <div className="progressBar">
                    {selectedPaperData && <div className="progress" style={{width:`${(geoChartData[i] / Object.values(selectedPaperData).length)* 100}%`}}/>}
                  </div> */}
                  </div>
                ))}
                <ViewAll path="/pdf-download"/>
            </div>
          </div>
        ) : null}
        {/* <div className="top" >
          {selectedPaperData && <span className="total" ><DownloadOutlined /> Total Download : <b>{(Object.values(selectedPaperData)).length}</b></span>}
        </div> */}
      </div>
      <DownloadPdfModal
        isModalOpen={isModalOpen}
        createPDF={createPDF}
        handleOk={handleOk}
        handleCancel={handleCancel}
        selectedPaperData={selectedPaperData}
      />
    </div> : <div className="spinnerDownloadPdf"><Spin indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />}/></div>}
      </>
     
  );
};
