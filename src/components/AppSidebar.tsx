import { SiGmail } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaSlack } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FaTelegramPlane } from "react-icons/fa";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Gmail Inbox",
    url: "/gmail",
    icon: SiGmail
  },
  {
    title: "Slack Channels",
    url: "/slack",
    icon: FaSlack
  },
  {
    title: "Telegram Chats",
    url: "/telegram",
    icon: FaTelegramPlane
  }
];

const AppSidebar = () => {

  const [tool,setTool] = useState(0);
  const navigate = useNavigate();

  return <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1 className="text-bold text-base my-10">Application</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item,key) => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Button variant={tool === key ? 'secondary' : 'ghost'} onClick={() => {
                      setTool(key);
                      navigate(item.url);
                    }} className={`text-md h-10 justify-baseline cursor-pointer`}>
                      <item.icon />
                      <span>
                        {item.title}
                      </span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}

export default AppSidebar