import React,{useState,useEffect} from 'react'

import {SearchInput,AdvancedSearchSelect,FillterSearch, SearchInputButton,AdvancedSearchDiv} from './AdvancedSerch.styles'

export const ActorsAdvanced = ({handleSubmit,handleNameSearch}) => {
    const [topActors, setTopActors] = useState([])

  return (
    <AdvancedSearchDiv>
      <FillterSearch>
      <div>
            <SearchInput
              name="name-search"
              placeholder="Actor/s"
              onChange={handleNameSearch}
            >
            </SearchInput>
          </div>
      

      </FillterSearch>

      <form onSubmit={handleSubmit}>
      
        <div>
          <SearchInputButton type="submit" value="Search" />
        </div>
      </form>
    </AdvancedSearchDiv>
  )
}
