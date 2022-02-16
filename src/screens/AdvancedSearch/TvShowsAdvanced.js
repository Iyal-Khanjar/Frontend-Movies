import {SearchInput,AdvancedSearchSelect,FillterSearch, SearchInputButton,AdvancedSearchDiv} from './AdvancedSerch.styles'

export const TvShowsAdvanced = ({
  handleNameSearch,
  handleOnChange,
  fromYear,
  rating,
  voteCount,
  query,
  handleSubmit,
  
}) => {
  return (
    <AdvancedSearchDiv>
      <FillterSearch>
      <div>
            <SearchInput
              name="name-search"
              placeholder="Tv-Show Name (optinal)"
              onChange={handleNameSearch}
            >
            </SearchInput>
          </div>
        <div>
          <AdvancedSearchSelect
            name="from-year"
            defaultValue="DEFAULT"
            onChange={handleOnChange}
          >
            <option value="DEFAULT" disabled>
              Year
            </option>
            {fromYear && fromYear.map((year) => year)}
          </AdvancedSearchSelect>
        </div>
        {
          query===''? 
          <>
        <div>
          <AdvancedSearchSelect name="show-status" onChange={handleOnChange}>
            <option value="Status">Status</option>
            <option value="0">Returning Series</option>
            <option value="1">Planned</option>
            <option value="2">In Production:</option>
            <option value="3">Ended</option>
            <option value="4">Cancelled</option>
            <option value="5">Pilot</option>
          </AdvancedSearchSelect>
        </div>
        <div>
          <AdvancedSearchSelect name="show-type" onChange={handleOnChange}>
          <option value="Type">Show Type</option>
            <option value="0">Documentary</option>
            <option value="1">News</option>
            <option value="2">Miniseries:</option>
            <option value="3">Reality</option>
            <option value="4">Scripted</option>
            <option value="5">Talk Show</option>
            <option value="6">Video</option>
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

          </> : ''
        }

      </FillterSearch>

      <form onSubmit={handleSubmit}>
      
        <div>
          <SearchInputButton type="submit" value="Search" />
        </div>
      </form>
    </AdvancedSearchDiv>
  );
};
