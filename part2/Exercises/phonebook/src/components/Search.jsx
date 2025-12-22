const Search = ({ search, handleSearch }) => {
  return (
    <>
      Search: <input value={search} onChange={handleSearch}></input>
    </>
  );
};

export default Search;
