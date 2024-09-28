import { DrawerCuston } from "../../custom"
import { ListFilter } from "../filter/ListFilter"

interface Props {
  status: boolean;
  onClose: () => void;
}
export const DrawerFilter = ({ status, onClose }: Props) => {
  return (
    <DrawerCuston status={status} onClose={onClose} direction="right" >
      <ListFilter />
    </DrawerCuston>
  )
}

