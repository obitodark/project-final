import React from 'react'
import { Box } from './Box'
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
interface Props {
  value?:0|1|2|3|4|5;
  className?: string;
}
export const IconStart = ({ value = 0, className }: Props) => {
  return (
    <Box className={`flex ${className}`}>
      {[...new Array(value)].map((_, index) => (
        <span key={index}>
          <MdOutlineStar className='text-indigo-600' />
        </span>
      ))}
      {[...new Array(5 - value)].map((_, index) => (
        <span key={index}>
          <MdOutlineStarBorder className='text-gray-500' />
        </span>
      ))}
    </Box>
  )
}
