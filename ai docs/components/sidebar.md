shadCN Sidebar
A composable, them-eable and customizable sidebar component.
A sidebar that collapses to icons.
Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of
moving parts.
I don't like building sidebars. So I built 30+ of them. All kinds of configurations. Then I extracted the core components into

sidebar.tsx.

We now have a solid foundation to build on top of. Composable. Themeable. Customizable.
Browse the Blocks Library.
## Installation

### CLI
Run the following command to install sidebar.tsx

```
npx shadcn@latest add sidebar
```

Add the following colors to your CSS file
The command above should install the colors for you. If not, copy and paste the following in your CSS file.
We'll go over the colors later in the theming section.
```app/globals.css
@layer base {
:root {
--sidebar-background: 0 0% 98%;
--sidebar-foreground: 240 5.3% 26.1%;
--sidebar-primary: 240 5.9% 10%;
--sidebar-primary-foreground: 0 0% 98%;
--sidebar-accent: 240 4.8% 95.9%;
--sidebar-accent-foreground: 240 5.9% 10%;
--sidebar-border: 220 13% 91%;
--sidebar-ring: 217.2 91.2% 59.8%;
}
.dark {
--sidebar-background: 240 5.9% 10%;
--sidebar-foreground: 240 4.8% 95.9%;
--sidebar-primary: 224.3 76.3% 48%;
--sidebar-primary-foreground: 0 0% 100%;
--sidebar-accent: 240 3.7% 15.9%;
--sidebar-accent-foreground: 240 4.8% 95.9%;
--sidebar-border: 240 3.7% 15.9%;
--sidebar-ring: 217.2 91.2% 59.8%;
}
}
```

## Structure
A Sidebar component is composed of the following parts:
SidebarProvider - Handles collapsible state.
Sidebar - The sidebar container.
SidebarHeader and SidebarFooter - Sticky at the top and bottom of the sidebar.
SidebarContent - Scrollable content.
SidebarGroup - Section within the SidebarContent.
SidebarTrigger - Trigger for the Sidebar.
Sidebar Structure
Usage
```app/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
export default function Layout({ children }: { children: React.ReactNode }) {
return (
<SidebarProvider>
<AppSidebar />
<main>
<SidebarTrigger />
{children}
</main>
</SidebarProvider>
)
}
```

```components/app-sidebar.tsx
import {
Sidebar,
SidebarContent,
SidebarFooter,
SidebarGroup,
SidebarHeader,
} from "@/components/ui/sidebar"
export function AppSidebar() {
return (
<Sidebar>
<SidebarHeader />
<SidebarContent>
<SidebarGroup />
<SidebarGroup />
</SidebarContent>
<SidebarFooter />
</Sidebar>
)
}
```

## Your First Sidebar
Let's start with the most basic sidebar. A collapsible sidebar with a menu.
Add a SidebarProvider and SidebarTrigger at the root of your application.
```app/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
export default function Layout({ children }: { children: React.ReactNode }) {
return (
<SidebarProvider>
<AppSidebar />
<main>
<SidebarTrigger />
{children}
</main>
</SidebarProvider>
)
}
```

Create a new sidebar component at components/app-sidebar.tsx.

```components/app-sidebar.tsx
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
export function AppSidebar() {
return (
<Sidebar>
<SidebarContent />
</Sidebar>
)
}
```

Now, let's add a SidebarMenu to the sidebar.
We'll use the SidebarMenu component in a SidebarGroup.

```components/app-sidebar.tsx
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
Sidebar,
SidebarContent,
SidebarGroup,
SidebarGroupContent,
SidebarGroupLabel,
SidebarMenu,
SidebarMenuButton,
SidebarMenuItem,
3
} from "@/components/ui/sidebar"
// Menu items.
const items = [
{
title: "Home",
url: "#",
icon: Home,
},
{
title: "Inbox",
url: "#",
icon: Inbox,
},
{
title: "Calendar",
url: "#",
icon: Calendar,
},
{
title: "Search",
url: "#",
icon: Search,
},
{
title: "Settings",
url: "#",
icon: Settings,
},
]
export function AppSidebar() {
return (
<Sidebar>
<SidebarContent>
<SidebarGroup>
<SidebarGroupLabel>Application</SidebarGroupLabel>
<SidebarGroupContent>
<SidebarMenu>
{items.map((item) => (
<SidebarMenuItem key={item.title}>
<SidebarMenuButton asChild>
<a href={item.url}>
<item.icon />
<span>{item.title}</span>
</a>
</SidebarMenuButton>
</SidebarMenuItem>
))}
4
</SidebarMenu>
</SidebarGroupContent>
</SidebarGroup>
</SidebarContent>
</Sidebar>
)
}
```

You've created your first sidebar.
Your first sidebar.

## Components
The components in sidebar.tsx are built to be composable i.e you build your sidebar by putting the provided components
together. They also compose well with other shadcn/ui components such as DropdownMenu, Collapsible or Dialog etc.
If you need to change the code in sidebar.tsx, you are encouraged to do so. The code is yours. Use sidebar.tsx as a starting
point and build your own.
In the next sections, we'll go over each component and how to use them.
SidebarProvider
The SidebarProvider component is used to provide the sidebar context to the Sidebar component. You should always wrap
your application in a SidebarProvider component.
Props
Name Type Description
defaultOpen boolean Default open state of the sidebar.
open boolean Open state of the sidebar (controlled).
onOpenChange (open: boolean) => void Sets open state of the sidebar (controlled).
Width
If you have a single sidebar in your application, you can use the SIDEBAR_WIDTH and SIDEBAR_WIDTH_
MOBILE variables
in sidebar.tsx to set the width of the sidebar.
```components/ui/sidebar.tsx
const SIDEBAR
WIDTH = "16rem"
_
const SIDEBAR
WIDTH
MOBILE = "18rem"
_
```
For multiple sidebars in your application, you can use the style prop to set the width of the sidebar.
To set the width of the sidebar, you can use the --sidebar-width and --sidebar-width-mobile CSS variables in the style prop.
```components/ui/sidebar.tsx
<SidebarProvider
style={{
"--sidebar-width": "20rem",
"--sidebar-width-mobile": "20rem",
}}
```
This will handle the width of the sidebar but also the layout spacing.
5
Keyboard Shortcut
The SIDEBAR_KEYBOARD_SHORTCUT variable is used to set the keyboard shortcut used to open and close the sidebar.
To trigger the sidebar, you use the cmd+b keyboard shortcut on Mac and ctrl+b on Windows.
You can change the keyboard shortcut by updating the SIDEBAR_KEYBOARD_SHORTCUT variable.
```components/ui/sidebar.tsx
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
```
Persisted State
The SidebarProvider supports persisting the sidebar state across page reloads and server-side rendering. It uses cookies to
store the current state of the sidebar. When the sidebar state changes, a default cookie named sidebar:state is set with the cur-
rent open/closed state. This cookie is then read on subsequent page loads to restore the sidebar state.
To persist sidebar state in Next.js, set up your SidebarProvider in app/layout.tsx like this:

```app/layout.tsx
import { cookies } from "next/headers"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
export async function Layout({ children }: { children: React.ReactNode }) {
const cookieStore = await cookies()
const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
return (
<SidebarProvider defaultOpen={defaultOpen}>
<AppSidebar />
<main>
<SidebarTrigger />
{children}
</main>
</SidebarProvider>
)
}
```
You can change the name of the cookie by updating the SIDEBAR
COOKIE
NAME variable in sidebar.tsx.
_
```components/ui/sidebar.tsx
const SIDEBAR_COOKIE
_
NAME = "sidebar:state"
```

## Sidebar
The main Sidebar component used to render a collapsible sidebar.
```components/ui/sidebar.tsx
export function AppSidebar() {
return
}
```

Props
Property Type Description
6
side left or right The side of the sidebar.
variant sidebar, floating, or inset The variant of the sidebar.
collapsible offcanvas, icon, or none Collapsible state of the sidebar.
side
Use the side prop to change the side of the sidebar.
Available options are left and right.
import { Sidebar } from "@/components/ui/sidebar"
export function AppSidebar() {
return
}
```
variant
Use the variant prop to change the variant of the sidebar.
Available options are sidebar, floating and inset.
import { Sidebar } from "@/components/ui/sidebar"
export function AppSidebar() {
return
}
```
Note: If you use the inset variant, remember to wrap your main content in a SidebarInset component.

```<main>{children}</main>```
collapsible
Use the collapsible prop to make the sidebar collapsible.
Available options are offcanvas, icon and none.
```components/ui/sidebar.tsx
export function AppSidebar() {
return
}
```
Prop Description
offcanvas A collapsible sidebar that slides in from the left or right.
icon A sidebar that collapses to icons.
none A non-collapsible sidebar.
useSidebar
The useSidebar hook is used to control the sidebar.
7
import { useSidebar } from "@/components/ui/sidebar"
export function AppSidebar() {
const {
state,
open,
setOpen,
openMobile,
setOpenMobile,
isMobile,
toggleSidebar,
} = useSidebar()
}
```
Property Type Description
state expanded or collapsed The current state of the sidebar.
open boolean Whether the sidebar is open.
setOpen (open: boolean) => void Sets the open state of the sidebar.
openMobile boolean Whether the sidebar is open on mobile.
setOpenMobile (open: boolean) => void Sets the open state of the sidebar on mobile.
isMobile boolean Whether the sidebar is on mobile.
toggleSidebar () => void Toggles the sidebar. Desktop and mobile.
SidebarHeader
Use the SidebarHeader component to add a sticky header to the sidebar.
The following example adds a to the SidebarHeader.
A sidebar header with a dropdown menu.
components/app-sidebar.tsx
<SidebarMenu>
<SidebarMenuItem>
<DropdownMenu>
<DropdownMenuTrigger asChild>
<SidebarMenuButton>
Select Workspace
<ChevronDown className="ml-auto" />
</SidebarMenuButton>
</DropdownMenuTrigger>
<DropdownMenuContent className="w-[--radix-popper-anchor-width]">
<DropdownMenuItem>
<span>Acme Inc</span>
</DropdownMenuItem>
<DropdownMenuItem>
<span>Acme Corp.</span>
</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
</SidebarMenuItem>
</SidebarMenu>
8
Copy
SidebarFooter
Use the SidebarFooter component to add a sticky footer to the sidebar.
The following example adds a to the SidebarFooter.
A sidebar footer with a dropdown menu.
components/app-sidebar.tsx
export function AppSidebar() {
return (
<SidebarProvider>
<Sidebar>
<SidebarHeader />
<SidebarContent />
<SidebarFooter>
<SidebarMenu>
<SidebarMenuItem>
<DropdownMenu>
<DropdownMenuTrigger asChild>
<SidebarMenuButton>
<User2 /> Username
<ChevronUp className="ml-auto" />
</SidebarMenuButton>
</DropdownMenuTrigger>
<DropdownMenuContent
side="top"
className="w-[--radix-popper-anchor-width]"
>
<DropdownMenuItem>
<span>Account</span>
</DropdownMenuItem>
<DropdownMenuItem>
<span>Billing</span>
</DropdownMenuItem>
<DropdownMenuItem>
<span>Sign out</span>
</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
</SidebarMenuItem>
</SidebarMenu>
</SidebarFooter>
</Sidebar>
</SidebarProvider>
)
}
Copy
SidebarContent
The SidebarContent component is used to wrap the content of the sidebar. This is where you add your SidebarGroup com-
ponents. It is scrollable.
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
export function AppSidebar() {
return (
9
<Sidebar>
<SidebarContent>
<SidebarGroup />
<SidebarGroup />
</SidebarContent>
</Sidebar>
)
}
Copy
SidebarGroup
Use the SidebarGroup component to create a section within the sidebar.
A SidebarGroup has a SidebarGroupLabel, a SidebarGroupContent and an optional SidebarGroupAction.
A sidebar group.
import { Sidebar, SidebarContent, SidebarGroup } from "@/components/ui/sidebar"
export function AppSidebar() {
return (
<Sidebar>
<SidebarContent>
<SidebarGroup>
<SidebarGroupLabel>Application</SidebarGroupLabel>
<SidebarGroupAction>
<Plus /> <span className="sr-only">Add Project</span>
</SidebarGroupAction>
<SidebarGroupContent></SidebarGroupContent>
</SidebarGroup>
</SidebarContent>
</Sidebar>
)
}
Copy
Collapsible SidebarGroup
To make a SidebarGroup collapsible, wrap it in a Collapsible.
A collapsible sidebar group.
export function AppSidebar() {
return (
<Collapsible defaultOpen className="group/collapsible">
<SidebarGroup>
<SidebarGroupLabel asChild>
<CollapsibleTrigger>
Help
<ChevronDown className="ml-auto transition-transform group-data-[state=open]/
collapsible:rotate-180" />
</CollapsibleTrigger>
</SidebarGroupLabel>
<CollapsibleContent>
<SidebarGroupContent />
</CollapsibleContent>
</SidebarGroup>
</Collapsible>
)
10
}
Copy
Note: We wrap the CollapsibleTrigger in a SidebarGroupLabel to render a button.
SidebarGroupAction
Use the SidebarGroupAction component to add an action button to the SidebarGroup.
export function AppSidebar() {
return (
<SidebarGroup>
<SidebarGroupLabel asChild>Projects</SidebarGroupLabel>
<SidebarGroupAction title="Add Project">
<Plus /> <span className="sr-only">Add Project</span>
</SidebarGroupAction>
<SidebarGroupContent />
</SidebarGroup>
)
}
Copy
A sidebar group with an action button.
SidebarMenu
The SidebarMenu component is used for building a menu within a SidebarGroup.
A SidebarMenu component is composed of SidebarMenuItem, SidebarMenuButton, and components.
Sidebar Menu
Here's an example of a SidebarMenu component rendering a list of projects.
A sidebar menu with a list of projects.
<SidebarGroup>
<SidebarGroupLabel>Projects</SidebarGroupLabel>
<SidebarGroupContent>
<SidebarMenu>
{projects.map((project) => (
<SidebarMenuItem key={project.name}>
<SidebarMenuButton asChild>
<a href={project.url}>
<project.icon />
<span>{project.name}</span>
</a>
</SidebarMenuButton>
</SidebarMenuItem>
))}
</SidebarMenu>
</SidebarGroupContent>
</SidebarGroup>
Copy
SidebarMenuButton
The SidebarMenuButton component is used to render a menu button within a SidebarMenuItem.
11
Link or Anchor
By default, the SidebarMenuButton renders a button but you can use the asChild prop to render a different component such
as a Link or an a tag.
Home
Copy
Icon and Label
You can render an icon and a truncated label inside the button. Remember to wrap the label in a .
<Home />
<span>Home</span>
Copy
isActive
Use the isActive prop to mark a menu item as active.
Home
Copy
SidebarMenuAction
The SidebarMenuAction component is used to render a menu action within a SidebarMenuItem.
This button works independently of the SidebarMenuButton i.e you can have the as a clickable link and the as a button.
<a href="#">
<Home />
<span>Home</span>
</a>
<Plus /> <span className="sr-only">Add Project</span>
Copy
DropdownMenu
Here's an example of a SidebarMenuAction component rendering a DropdownMenu.
A sidebar menu action with a dropdown menu.
12
<a href="#">
<Home />
<span>Home</span>
</a>
<DropdownMenuTrigger asChild>
<SidebarMenuAction>
<MoreHorizontal />
</SidebarMenuAction>
</DropdownMenuTrigger>
<DropdownMenuContent side="right" align="start">
<DropdownMenuItem>
<span>Edit Project</span>
</DropdownMenuItem>
<DropdownMenuItem>
<span>Delete Project</span>
</DropdownMenuItem>
</DropdownMenuContent>
Copy
SidebarMenuSub
The SidebarMenuSub component is used to render a submenu within a SidebarMenu.
Use and to render a submenu item.
A sidebar menu with a submenu.
<SidebarMenuSubItem>
<SidebarMenuSubButton />
</SidebarMenuSubItem>
<SidebarMenuSubItem>
<SidebarMenuSubButton />
</SidebarMenuSubItem>
Copy
Collapsible SidebarMenu
To make a SidebarMenu component collapsible, wrap it and the SidebarMenuSub components in a Collapsible.
A collapsible sidebar menu.
<SidebarMenuItem>
<CollapsibleTrigger asChild>
<SidebarMenuButton />
13
</CollapsibleTrigger>
<CollapsibleContent>
<SidebarMenuSub>
<SidebarMenuSubItem />
</SidebarMenuSub>
</CollapsibleContent>
</SidebarMenuItem>
Copy
SidebarMenuBadge
The SidebarMenuBadge component is used to render a badge within a SidebarMenuItem.
A sidebar menu with a badge.
24
Copy
SidebarMenuSkeleton
The SidebarMenuSkeleton component is used to render a skeleton for a SidebarMenu. You can use this to show a loading
state when using React Server Components, SWR or react-query.
function NavProjectsSkeleton() {
return (
<SidebarMenu>
{Array.from({ length: 5 }).map((_, index) => (
<SidebarMenuItem key={index}>
<SidebarMenuSkeleton />
</SidebarMenuItem>
))}
</SidebarMenu>
)
}
Copy
SidebarSeparator
The SidebarSeparator component is used to render a separator within a Sidebar.
<SidebarGroup />
<SidebarSeparator />
<SidebarGroup />
Copy
14
SidebarTrigger
Use the SidebarTrigger component to render a button that toggles the sidebar.
The SidebarTrigger component must be used within a SidebarProvider.
<SidebarTrigger />
Copy
Custom Trigger
To create a custom trigger, you can use the useSidebar hook.
import { useSidebar } from "@/components/ui/sidebar"
export function CustomTrigger() {
const { toggleSidebar } = useSidebar()
return Toggle Sidebar
}
Copy
SidebarRail
The SidebarRail component is used to render a rail within a Sidebar. This rail can be used to toggle the sidebar.
<SidebarGroup />
Copy
Data Fetching
React Server Components
Here's an example of a SidebarMenu component rendering a list of projects using React Server Components.
A sidebar menu using React Server Components.
Skeleton to show loading state.
function NavProjectsSkeleton() {
return (
<SidebarMenu>
{Array.from({ length: 5 }).map((_, index) => (
<SidebarMenuItem key={index}>
<SidebarMenuSkeleton showIcon />
</SidebarMenuItem>
))}
15
</SidebarMenu>
)
}
Copy
Server component fetching data.
async function NavProjects() {
const projects = await fetchProjects()
return (
<SidebarMenu>
{projects.map((project) => (
<SidebarMenuItem key={project.name}>
<SidebarMenuButton asChild>
<a href={project.url}>
<project.icon />
<span>{project.name}</span>
</a>
</SidebarMenuButton>
</SidebarMenuItem>
))}
</SidebarMenu>
)
}
Copy
Usage with React Suspense.
function AppSidebar() {
return (
<Sidebar>
<SidebarContent>
<SidebarGroup>
<SidebarGroupLabel>Projects</SidebarGroupLabel>
<SidebarGroupContent>
<React.Suspense fallback={<NavProjectsSkeleton />}>
<NavProjects />
</React.Suspense>
</SidebarGroupContent>
</SidebarGroup>
</SidebarContent>
</Sidebar>
)
}
Copy
SWR and React Query
You can use the same approach with SWR or react-query.
SWR
function NavProjects() {
const { data, isLoading } = useSWR("/api/projects", fetcher)
if (isLoading) {
return (
16
<SidebarMenu>
{Array.from({ length: 5 }).map((_, index) => (
<SidebarMenuItem key={index}>
<SidebarMenuSkeleton showIcon />
</SidebarMenuItem>
))}
</SidebarMenu>
)
if (!data) {
return ...
}
}
return (
<SidebarMenu>
{data.map((project) => (
<SidebarMenuItem key={project.name}>
<SidebarMenuButton asChild>
<a href={project.url}>
<project.icon />
<span>{project.name}</span>
</a>
</SidebarMenuButton>
</SidebarMenuItem>
))}
</SidebarMenu>
)
}
```
React Query
function NavProjects() {
const { data, isLoading } = useQuery()
if (isLoading) {
return (
<SidebarMenu>
{Array.from({ length: 5 }).map((_, index) => (
<SidebarMenuItem key={index}>
<SidebarMenuSkeleton showIcon />
</SidebarMenuItem>
))}
</SidebarMenu>
)
if (!data) {
return ...
}
}
return (
<SidebarMenu>
{data.map((project) => (
17
<SidebarMenuItem key={project.name}>
<SidebarMenuButton asChild>
<a href={project.url}>
<project.icon />
<span>{project.name}</span>
</a>
</SidebarMenuButton>
</SidebarMenuItem>
))}
</SidebarMenu>
)
}
```
Controlled Sidebar
Use the open and onOpenChange props to control the sidebar.
A controlled sidebar.
export function AppSidebar() {
const [open, setOpen] = React.useState(false)
return (
<SidebarProvider open={open} onOpenChange={setOpen}>
<Sidebar />
</SidebarProvider>
)
}
```

## Theming
We use the following CSS variables to theme the sidebar.
```@layer base {
:root {
--sidebar-background: 0 0% 98%;
--sidebar-foreground: 240 5.3% 26.1%;
--sidebar-primary: 240 5.9% 10%;
--sidebar-primary-foreground: 0 0% 98%;
--sidebar-accent: 240 4.8% 95.9%;
--sidebar-accent-foreground: 240 5.9% 10%;
--sidebar-border: 220 13% 91%;
--sidebar-ring: 217.2 91.2% 59.8%;
}
.dark {
--sidebar-background: 240 5.9% 10%;
--sidebar-foreground: 240 4.8% 95.9%;
--sidebar-primary: 0 0% 98%;
--sidebar-primary-foreground: 240 5.9% 10%;
--sidebar-accent: 240 3.7% 15.9%;
--sidebar-accent-foreground: 240 4.8% 95.9%;
--sidebar-border: 240 3.7% 15.9%;
--sidebar-ring: 217.2 91.2% 59.8%;
}
18
}

```
We intentionally use different variables for the sidebar and the rest of the application to make it easy to have a sidebar that is
styled differently from the rest of the application. Think a sidebar with a darker shade from the main application.
Styling
Here are some tips for styling the sidebar based on different states.
Styling an element based on the sidebar collapsible state. The following will hide the SidebarGroup when the sidebar is in
icon mode.

```<SidebarGroup className="group-data-[collapsible=icon]:hidden" />```

menu button is active.
Styling a menu action based on the menu button active state. The following will force the menu action to be visible when the