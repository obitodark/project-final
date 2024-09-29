"use client"
import { useDispatch } from "react-redux";
import { InputText } from "../../custom/InputText";
import { setName, setPriceOrder } from "@/store/filter/filter";
import { IoIosSearch } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { Button } from "../../ui/button";
import { DrawerFilter } from "../drawer/DrawerFilter";
import { useBoolean } from "@/hook/useBoolean";
import { SelectCustom } from "../../custom/SelectCustom";
import { SelectItem } from "../../ui/select";


export const SearchFilter = () => {
  const dispatch = useDispatch();
  const [isOpen, isClose, state] = useBoolean()

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };

  const handleComboBoxChange = (value: string) => {
    const orderValue = value === "mayor a menor" ? "desc" : "asc";
    dispatch(setPriceOrder(orderValue));

  };
  return (

    <div className={` border-b  pb-3 `}>
      <DrawerFilter status={state} onClose={isClose} />
      <div className="flex flex-col sm:flex-row px-5 gap-2 sm:gap-6 md:gap-10 lg:gap-16 xl:gap-32  sm:justify-between items-center">
        <div className="flex gap-3 w-full">
          <InputText
            icon={<IoIosSearch className="text-gray-800" size={18} />}
            placeholder="Busqueda..."
            className="flex  gap-1 rounded-md w-full"
            onChange={handleNameChange}
          />
        </div>
        <div className="flex gap-3 w-full">
          <div className=" w-full  ">
            <div>
              <SelectCustom placeHolder="Orden" onValueChange={handleComboBoxChange}>
                {["mayor a menor", "menor a mayor"].map(item => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectCustom>
            </div>
          </div>
          <Button className=" lg:hidden p-5 " onClick={() => isOpen()}>
            <VscSettings size={22} className="text-center" />
          </Button>
        </div>
      </div>
    </div>
  )
}
