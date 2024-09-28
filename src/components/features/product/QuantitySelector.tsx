"use client"

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onReduce?: (newCount: number) => void;
  onAdd?: (newCount: number) => void;
}

export const QuantitySelector = ({ quantity, onAdd, onReduce }: Props) => {
  const [count, setCount] = useState(quantity)

  const handlerAdd = (value: number) => {
    const newCount = count + value;
    if (newCount > 8) return
    setCount(newCount)
    onAdd && onAdd(newCount)
  }
  const handlerReduce = (value: number) => {
    const newCount = count + value;
    if (newCount < 1) return
    setCount(newCount)
    onReduce && onReduce(newCount)
  }

  return (
    <div className="flex">
      <button onClick={() => handlerReduce(-1)}>
        <IoRemoveCircleOutline size={25} />
      </button>
      <span className="rounded-md w-18 px-5 mx-3 text-center bg-gray-200">
        {count}
      </span>
      <button onClick={() => handlerAdd(+1)}>
        <IoAddCircleOutline size={25} />
      </button>
    </div>
  )
}
