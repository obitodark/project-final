import React from 'react'
import { DrawerCuston } from '../../custom';
import { Sidebar } from '../sidebar';
interface Props {
  status: boolean;
  onClose: () => void;
}
export const DrawerSidebar = ({ status, onClose }: Props) => {
  return (
    <DrawerCuston direction='left' status={status} onClose={onClose}>
      <Sidebar />
    </DrawerCuston>
  )
}

