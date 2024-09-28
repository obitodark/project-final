"use client"
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Box } from "../custom/Box";
import { Sidebar } from "../features/sidebar";
import { Button } from "../ui/button";
import { Title } from "../custom/Title";
import { DrawerSidebar } from "../features/drawer";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, openDrawer } from "@/store/Drawer";


interface Props {
  children: React.ReactNode;
}
export const SideBarLayout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const drawer = useSelector((state: any) => state.drawer.drawers);
  return (
    <aside className='flex gap-2'>
      <Box className="hidden lg:block">
        <Sidebar />
      </Box>

      <DrawerSidebar status={drawer.drawerSidebar} onClose={() => dispatch(closeDrawer("drawerSidebar"))} />
      <Box className=' bg-[#F1F1F1] p-3 w-full'>
        <Box className="w-full flex items-baseline">
          <Button variant="ghost" className="font-bold block lg:hidden" onClick={() => dispatch(openDrawer("drawerSidebar"))}>
            <HamburgerMenuIcon />
          </Button>
          <Title title="Panel" className="mt-0" />
        </Box>
        {children}
      </Box>
    </aside>
  )
}

