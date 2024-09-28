"use client"
import React from 'react'
import { Box } from './Box'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import { useDispatch } from 'react-redux'
import { setPage } from '@/store/filter/filter'
import { useAppSelector } from '@/store'

interface Props {
  page?: number
}
export const PaginationBox = ({ page = 3 }: Props) => {
  const dispatch = useDispatch();
  const filters = useAppSelector((state) => state.filter);
  return (
    <Box className="mb-5 mt-8">
      <Pagination >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious  href="#"
              onClick={() => {
                if (filters.page !== undefined) {
                  dispatch(setPage(filters.page <= 0 ? filters.page : filters.page - 1));
                } else {

                  dispatch(setPage(0));
                }
              }}
            />
          </PaginationItem>
          {[... new Array(page)].map((_, index) => (
            <PaginationItem key={index} className="bg-gray-200 rounded ">
              <PaginationLink href={"#"}
                isActive={filters.page == index ? true : false}
                className={`${filters.page == index ? "border border-indigo-600" : "border-none"}`}
                onClick={() => dispatch(setPage(index))}>{index + 1}</PaginationLink >
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#"
              onClick={() => {
                if (filters.page !== undefined) {
                  dispatch(setPage(filters.page >= page - 1 ? filters.page : filters.page + 1));
                } else {
                  dispatch(setPage(page - 1));
                }
              }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Box>
  )
}

