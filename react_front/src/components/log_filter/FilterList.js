import React from 'react'
import Filter from "./Filter"

const FilterList = ({filterBlocks, filters, deleteFilter, filterSelect, checkbox, andor, regex}) => {
  return (
    <div>
        {filterBlocks.map(filter => {
            return <Filter key = {filter.id} filter={filter} filters={filters} deleteFilter = {deleteFilter}
             filterSelect = {filterSelect} andor = {andor}
            checkbox = {checkbox} regex = {regex}/>
      })}
    </div>
  )
}

export default FilterList