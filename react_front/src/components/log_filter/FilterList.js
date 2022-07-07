import React from 'react'
import Filter from "./Filter"

const FilterList = ({filterBlocks, filters, deleteFilter, filterSelect, checkbox, andor}) => {
  return (
    <div>
        {filterBlocks.map(filter => {
            return <Filter key = {filter.id} filter={filter} filters={filters} deleteFilter = {deleteFilter}
             filterSelect = {filterSelect} andor = {andor}
            checkbox = {checkbox}/>
      })}
    </div>
  )
}

export default FilterList