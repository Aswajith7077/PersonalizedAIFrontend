import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Gmail from "@/components/Gmail";
import Slack from "@/components/Slack";
import Telegram from "@/components/Telegram";
import { Routes,Route,BrowserRouter } from "react-router-dom";
import Summary from "@/components/slack/Summary";
import DailyDigest from "@/components/slack/DailyDigest";
import Channels from "@/components/slack/Channels";

const Dashboard = () => {
    document.body.classList.add("dark");
  return <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <Routes>
          <Route path="/gmail" element={<Gmail />} />
          <Route path="/slack" element={<Slack />}>
            <Route path="summary" element={<Summary />} />
            <Route path="channel" element={<Channels />} />
            <Route path="daily_digest" element={<DailyDigest />} />
          </Route>
          <Route path="/telegram" element={<Telegram />} />
        </Routes>
      </SidebarProvider>
    </BrowserRouter>;
};

export default Dashboard;
