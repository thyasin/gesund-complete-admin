import { useMany, useOne } from "@pankod/refine-core";
import React, { useState, useEffect } from "react";
import { Progress, Select, Spin } from "@pankod/refine-antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../style.scss";
import GeoMapChart from "components/chart/GeoMapChart";
import ViewAll from "components/button/ViewAll";
import useDimension from "pages/download_pdf/hooks/useDimension";


export const DashboardPdfbyCountry: React.FC = () => {
  const {isWidthSmall} = useDimension()

  const [selectedPaper, setSelectedPaper] = useState("");

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
      <>{selectedPaperData ?
      <div>
      {selectedPaperData &&
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>}
      <div className="chartsGeneralDashboard">
          <div className="chartsChildren">
            <div>
            <span className="mapTitle"><b>Users</b> by Country</span>
            <GeoMapChart isWidthSmall={isWidthSmall} chartId="geomapchartdashboard" data={geoChartData} />
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
                  </div>
                ))}
                <ViewAll path="/pdf-download"/>
            </div>
          </div>
      </div>
    </div> : <div className="spinnerDownloadPdf"><Spin indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />}/></div>}
      </>
     
  );
};
