import * as React from "react"
import {
  IconDashboard,
  IconFileText,
  IconUsers,
  IconSettings,
  IconInnerShadowTop,
  IconFileCheck,
  IconMessageCircle,
  IconMessagePlus,
  IconChevronDown,
} from "@tabler/icons-react"
import { Link, useLocation } from "react-router-dom"

import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { chatStore } from "@/pages/chat/chat-store"
import { authService } from "@/lib/auth"

const data = {
  user: {
    name: "Admin User",
    email: "admin@syntra.com",
    avatar: "/avatars/admin.jpg",
  },
  sections: [
    {
      label: "Dashboard",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: IconDashboard,
        },
      ],
    },
  ],
  documentSections: [
    {
      label: "Document Management",
      items: [
        {
          title: "Document",
          url: "/admin/document",
          icon: IconFileText,
        },
        {
          title: "Process Document",
          url: "/admin/document/process",
          icon: IconFileCheck,
        },
      ],
    },
  ],
  userSections: [
    {
      label: "User Management",
      items: [
        {
          title: "User",
          url: "/admin/user",
          icon: IconUsers,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const [chatHistory, setChatHistory] = React.useState(chatStore.getAllChats())
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(true)
  
  // Get current user role
  const currentUser = authService.getCurrentUser()
  const isAdmin = currentUser?.role === "admin"

  // Refresh chat history when location changes
  React.useEffect(() => {
    setChatHistory(chatStore.getAllChats())
  }, [location.pathname])

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Syntra AI</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Dashboard Section - Admin Only */}
        {isAdmin && data.sections.map((section) => (
          <React.Fragment key={section.label}>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase text-muted-foreground">
                {section.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={item.title}
                        isActive={location.pathname === item.url}
                      >
                        <Link to={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
          </React.Fragment>
        ))}

       
        {/* Document Management Section - Admin Only */}
        {isAdmin && data.documentSections.map((section) => (
          <React.Fragment key={section.label}>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase text-muted-foreground">
                {section.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={item.title}
                        isActive={location.pathname === item.url}
                      >
                        <Link to={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
          </React.Fragment>
        ))}

        {/* User Management Section - Admin Only */}
        {isAdmin && data.userSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-xs font-semibold uppercase text-muted-foreground">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={item.title}
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
         {/* Chat Section with Collapsible History */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase text-muted-foreground">
            Chat
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* New Chat */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="New Chat"
                  isActive={location.pathname === "/chat/new"}
                >
                  <Link to="/chat/new">
                    <IconMessagePlus />
                    <span>New Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Chat History - Collapsible */}
              <Collapsible
                open={isHistoryOpen}
                onOpenChange={setIsHistoryOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      tooltip="Chat History"
                      isActive={location.pathname.startsWith("/chat/") && location.pathname !== "/chat/new"}
                    >
                      <IconMessageCircle />
                      <span>Chat History</span>
                      <IconChevronDown className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {chatHistory.length === 0 ? (
                        <SidebarMenuSubItem>
                          <div className="px-2 py-1.5 text-xs text-muted-foreground">
                            No chat history
                          </div>
                        </SidebarMenuSubItem>
                      ) : (
                        chatHistory.slice(0, 10).map((chat) => (
                          <SidebarMenuSubItem key={chat.id}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={location.pathname === `/chat/${chat.id}`}
                            >
                              <Link to={`/chat/${chat.id}`}>
                                <span className="truncate">{chat.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />


        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
