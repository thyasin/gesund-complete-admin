import { useMany, useOne } from "@pankod/refine-core";
import React, { useState, useEffect } from "react";
import { Button, Progress, Select, Spin } from "@pankod/refine-antd";
import useDimension from "./hooks/useDimension";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { jsPDF } from "jspdf";
import DownloadPdfModal from "./components/DownloadPdfModal";
import autoTable from "jspdf-autotable";
import "./style.scss";
import GeoMapChart from "components/chart/GeoMapChart";
import ViewAll from "components/button/ViewAll";

export const PDfDownload: React.FC = () => {
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
  const { isWidthSmall } = useDimension();
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

  const pdfDownloadFormData = useOne({
    resource: selectedPaper,
    id: 1,
  });

  const selectedPaperData = pdfDownloadFormData?.data;

  const geoChartData: any = {};

  selectedPaperData &&
    Object.values(selectedPaperData).map((i) => {
      if (geoChartData[i.country])
        geoChartData[i.country] = geoChartData[i.country] + 1;
      else geoChartData[i.country] = 1;
    });

  return (
    <>
      {selectedPaperData ? (
        <div className="pdfDownladMain">
          <div>
            {selectDataForPapers && (
              <Select
                className="selectButton"
                placeholder="Select a paper"
                defaultValue={selectDataForPapers[0]?.value}
                options={selectDataForPapers}
                onChange={(e) => setSelectedPaper(e)}
              />
            )}
            <div>
              <span className="pageTitle" >Pdf Downloads</span>
              <Button
              type="primary"
              className="pdfexpbtn"
              onClick={showModal}
              icon={<DownloadOutlined />}
            >
              Export Report Pdf
            </Button>
            </div>
            
          </div>
          {selectedPaperData && (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></div>
          )}
          <div className="chartsGeneral">
            <div className="chartsChildren">
              <div>
                <span className="mapTitle">
                  <b>Users</b> by Country
                </span>
                <GeoMapChart
                  isWidthSmall={isWidthSmall}
                  chartId="geomapchart"
                  data={geoChartData}
                />
              </div>
              <div className="pdfDownloadCountryBox">
                <div className="totalDownloadBox">
                  <span className="totalDownloadBoxTitle">Total Download </span>
                  {selectedPaperData && (
                    <span className="totalDownloadBoxTitle">
                      {Object.values(selectedPaperData).length}
                    </span>
                  )}
                </div>
                {Object.keys(geoChartData)
                  .sort((a, b) => geoChartData[b] - geoChartData[a])
                  .map((i) => (
                    <div className="textWithProgressBar">
                      <div className="downloadbyCountry">
                        <span>{i}</span>
                        <span>{geoChartData[i]}</span>
                      </div>
                      {selectedPaperData && (
                        <Progress
                          percent={
                            (geoChartData[i] /
                              Object.values(selectedPaperData).length) *
                            100
                          }
                          showInfo={false}
                          strokeColor="#fff"
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <DownloadPdfModal
            isModalOpen={isModalOpen}
            createPDF={createPDF}
            handleOk={handleOk}
            handleCancel={handleCancel}
            selectedPaperData={selectedPaperData}
          />
        </div>
      ) : (
        <div className="spinnerDownloadPdf">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />} />
        </div>
      )}
    </>
  );
};
