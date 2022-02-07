
export const MovieAdvanced = ({handleOnChange,fromYear,toYear,rating,voteCount,genres,handleSubmit,toYearInfo,ratingInfo,voteCountInfo,genresInfo,fromYearInfo}) => {
  
  return (
    <div className="advancedSearch">
          
        <div className="fillterSearch">
          <div>
            <select
              name="from-year"
              defaultValue="DEFAULT"
              onChange={handleOnChange}
            >
              <option value="DEFAULT" disabled>
                From Year
              </option>
              {fromYear && fromYear.map((year) => year)}
            </select>
          </div>

          <div>
            <select
              name="to-year"
              defaultValue="DEFAULT"
              onChange={handleOnChange}
            >
              <option value="DEFAULT" disabled>
                To Year
              </option>
              {toYear && toYear.map((year) => year)}
            </select>
          </div>

          <div>
            <select
              name="rating"
              defaultValue="DEFAULT"
              onChange={handleOnChange}
            >
              <option value="DEFAULT" disabled>
                Minimum Rating
              </option>
              {rating && rating.map((rating) => rating)}
            </select>
          </div>

          <div>
            <select
              name="vote-count"
              defaultValue="DEFAULT"
              onChange={handleOnChange}
            >
              <option value="DEFAULT" disabled>
                Minimum Votes
              </option>
              {voteCount && voteCount.map((vote) => vote)}
            </select>
          </div>

          <div>
            <select
              name="genresss"
              defaultValue="DEFAULT"
              onChange={handleOnChange}
            >
              <option value="DEFAULT" disabled>
                Genres
              </option>
              {genres && genres.map((genre) => genre)}
            </select>
          </div>
        </div>

      <form onSubmit={handleSubmit}>
       
         
        <div>
          <input type="submit" value="Search" />
        </div>
      </form>
    </div>
  );
};
