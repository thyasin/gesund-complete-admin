import { PDfDownload } from "pages/download_pdf"
import { VisitStats } from "pages/visit_stats"
import PageVisit from "./components/pageVisit"
import "./style.scss"

export default function Dashboard() {
  return (
    <div className="MainDashboard">
      <div className="row">
        {/* @ts-ignore */}
        <div className="pdfDownloadInfoBox"><PDfDownload isDashboardSemiPieView={true}/></div>    
        <div className="visitStatsInfoBox">
          <PageVisit/>
          </div> 
      </div>
        
           
        <div className="visitStatsByCountry">
          {/* @ts-ignore */}
            <PDfDownload isDashboardMapChartView={true}/>
        </div>    
    </div>
  )
}
