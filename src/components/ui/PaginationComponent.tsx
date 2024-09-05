import { ConfigProvider, Pagination } from 'antd'
import  { FC } from 'react'
import theme from '../../constants'
interface PaginationProps{
    currentPage: number,
    itemsPerPage: number,
    totalItems: number,
    onPageChange: (page: number, pageSize: number) => void,
  
}

const PaginationComponent:FC<PaginationProps> = ({currentPage,itemsPerPage,totalItems, onPageChange}) => {
  return (
    <ConfigProvider theme={theme}>
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={totalItems}
              onChange={onPageChange}
              showSizeChanger={false}
              disabled={totalItems === 0}
            />
          </ConfigProvider>
  )
}

export default PaginationComponent