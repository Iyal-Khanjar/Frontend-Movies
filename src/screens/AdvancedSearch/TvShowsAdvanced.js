export const TvShowsAdvanced = ({
  handleOnChange,
  showStatus,
  fromYear,
  rating,
  voteCount,
  genres,
  handleSubmit,
  ratingInfo,
  voteCountInfo,
  fromYearInfo,
  showType
}) => {
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
              Year
            </option>
            {fromYear && fromYear.map((year) => year)}
          </select>
        </div>
        <div>
          <select name="show-status" onChange={handleOnChange}>
            <option value="Status">Status</option>
            <option value="0">Returning Series</option>
            <option value="1">Planned</option>
            <option value="2">In Production:</option>
            <option value="3">Ended</option>
            <option value="4">Cancelled</option>
            <option value="5">Pilot</option>
          </select>
        </div>
        <div>
          <select name="show-type" onChange={handleOnChange}>
          <option value="Type">Show Type</option>
            <option value="0">Documentary</option>
            <option value="1">News</option>
            <option value="2">Miniseries:</option>
            <option value="3">Reality</option>
            <option value="4">Scripted</option>
            <option value="5">Talk Show</option>
            <option value="6">Video</option>
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

      </div>

      <form onSubmit={handleSubmit}>
      
        <div>
          <input type="submit" value="Search" />
        </div>
      </form>
    </div>
  );
};
