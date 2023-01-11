import { DashboardPdfbyCountry } from "./components/dashboardPdfbyCountry";
import { DashboardPdfbyWork } from "./components/dashboardPdfBywork";
import PageVisit from "./components/pageVisit";
import "./style.scss";

export default function Dashboard() {
  return (
    <div className="MainDashboard">
      <div className="row">
        <div className="pdfDownloadInfoBox">
          <DashboardPdfbyWork />
        </div>
        <div className="visitStatsInfoBox">
          <PageVisit />
        </div>
      </div>
      <div className="visitStatsByCountry">
        <DashboardPdfbyCountry />
      </div>
    </div>
  );
}
