"use client"

import * as React from "react"
import Link from 'next/link'
import {
  ChevronsUpDown,
  Command,
  FileText,
  Building2,
  LogOut,
  Mail,
  Plus,
  PlusCircle,
  Settings2,
  ShoppingBag,
  Clock,
  LayoutDashboard,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/auth'
import { signOut } from '@/app/(login)/actions'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// This represents the current active brand
const currentBrand = {
  id: "eva-wellness",
  name: "Eva Wellness",
  logo: Building2,
}

const data = {
  navMain: [
    {
      title: "Test",
      url: "/dashboard/test",
      icon: Command,
    },
    {
      title: "Create",
      url: "/dashboard/create",
      icon: PlusCircle,
    },
    {
      title: "Brand AI",
      url: "/dashboard/brand",
      icon: FileText,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: ShoppingBag,
    },
    {
      title: "History",
      url: "/dashboard/history",
      icon: Clock,
    },
  ],
}

export function DashboardSidebar() {
  const { setTheme, theme } = useTheme()
  const router = useRouter()
  const { user, setUser } = useUser()

  const handleSignOut = async () => {
    setUser(null)
    await signOut()
    router.push('/')
  }

  // Get user initials for avatar fallback
  const userInitials = React.useMemo(() => {
    if (!user?.name) return 'U'
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase()
  }, [user?.name])

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="transition-all duration-300 ease-in-out">
        <SidebarHeader className="flex items-center h-16">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex h-12 w-12 items-center pl-1">
                <Mail className="h-6 w-6 text-gray-500" />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      {item.icon && <item.icon className="h-5 w-5" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src="/avatars/default.png"
                        alt={user?.name || 'User avatar'}
                      />
                      <AvatarFallback className="rounded-lg">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name || 'User'}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="top"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Current Brand
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <currentBrand.logo className="size-4 shrink-0" />
                    </div>
                    <span>{currentBrand.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">
                      Add new brand
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="flex items-center">
                      <Settings2 className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    {theme === 'dark' ? (
                      <Sun className="mr-2 h-4 w-4" />
                    ) : (
                      <Moon className="mr-2 h-4 w-4" />
                    )}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail className="pt-4" />
        <SidebarTrigger className="absolute right-2 top-2 group-data-[collapsible=icon]:bottom-12 group-data-[collapsible=icon]:right-1/2 group-data-[collapsible=icon]:top-auto group-data-[collapsible=icon]:translate-x-1/2" />
      </Sidebar>
    </SidebarProvider>
  )
} 