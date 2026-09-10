function SearchBar({
  searchCity,
  setSearchCity,
  handleSearch,
}) {
  return (
    <form className="search-box" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />

      <button type="submit">
        🔍 Search
      </button>
    </form>
  );
}

export default SearchBar;
