import {AdvancedSearchSelect,FillterSearch, SearchInputButton,AdvancedSearchDiv} from './AdvancedSerch.styles'

export const MovieAdvanced = ({handleOnChange,fromYear,toYear,rating,voteCount,genres,handleSubmit,toYearInfo,ratingInfo,voteCountInfo,genresInfo,fromYearInfo}) => {
  
  return (
    <AdvancedSearchDiv>  
        <FillterSearch >
          <div>
            <AdvancedSearchSelect
              name="from-year"
              defaultValue="DEFAULT"
              onChange={handleOnChange}
            >
              <option value="DEFAULT" disabled>
                From Year
              </option>
              {fromYear && fromYear.map((year) => year)}
            </AdvancedSearchSelect>
          </div>

          <div>
            <AdvancedSearchSelect
              name="to-year"
              defaultValue="DEFAULT"
              onChange={handleOnChange}
            >
              <option value="DEFAULT" disabled>
                To Year
              </option>
              {toYear && toYear.map((year) => year)}
            </AdvancedSearchSelect>
          </div>

          <div>
            <AdvancedSearchSelect
              name="rating"
              defaultValue="DEFAULT"
              onChange={handleOnChange}
            >
              <option value="DEFAULT" disabled>
                Minimum Rating
              </option>
              {rating && rating.map((rating) => rating)}
            </AdvancedSearchSelect>
          </div>

          <div>
            <AdvancedSearchSelect
              name="vote-count"
              defaultValue="DEFAULT"
              onChange={handleOnChange}
            >
              <option value="DEFAULT" disabled>
                Minimum Votes
              </option>
              {voteCount && voteCount.map((vote) => vote)}
            </AdvancedSearchSelect>
          </div>

          <div>
            <AdvancedSearchSelect
              name="genresss"
              defaultValue="DEFAULT"
              onChange={handleOnChange}
            >
              <option value="DEFAULT" disabled>
                Genres
              </option>
              {genres && genres.map((genre) => genre)}
            </AdvancedSearchSelect>
          </div>
        </FillterSearch>

      <form onSubmit={handleSubmit}>
       
         
        <div>
          <SearchInputButton type="submit" value="Search" />
        </div>
      </form>
    </AdvancedSearchDiv>
  );
};
