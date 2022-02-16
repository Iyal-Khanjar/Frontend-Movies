import React from 'react'

import {SearchInput,FillterSearch, SearchInputButton,AdvancedSearchDiv} from './AdvancedSerch.styles'

export const ActorsAdvanced = ({handleSubmit,handleNameSearch}) => {
 

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
