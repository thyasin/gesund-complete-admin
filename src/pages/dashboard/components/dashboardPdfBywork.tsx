import { useMany, useOne } from "@pankod/refine-core";
import React, { useState, useEffect } from "react";
import { Progress, Select, Spin } from "@pankod/refine-antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../style.scss";
import SemiCircleChart from "components/chart/SemiCircleChart";
import useDimension from "pages/download_pdf/hooks/useDimension";

export const DashboardPdfbyWork: React.FC = () => {

  const {isWidthSmall} = useDimension()

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
    "Biotechnology": 0,
    "Cloud Computing": 0,
    "Contract Research Organisation": 0,
    "Data Analytics Provider": 0,
    "Data Storage Solutions": 0,
    "Diagnostic Equipment / Services": 0,
    "Digital PCR (polymerase chain reaction)": 0,
    "Gene Sequencing Platforms / Services": 0,
    "Government (incl regulatory, economic development)": 0,
    "High Performance Computing/Data Management Health System": 0,
    "Informatics": 0,
    "Investor": 0,
    "Medical Device": 0,
    "Pharmaceutical": 0,
    "Professional Advisory / Legal / Consultancy": 0,
    "Research Institute": 0,
    "University or other Academia": 0,
    "Other": 0,
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

  return (
    
      <>{selectedPaperData ?
          <div className="semiPieChartContainer">
            <SemiCircleChart
            isWidthSmall={isWidthSmall}
            chartId="semipie"
            data={obj}
            totalDownload={Object.values(selectedPaperData).length}
          />
          </div> : <div className="spinnerDownloadPdf"><Spin indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />}/></div>}
      </>
     
  );
};
