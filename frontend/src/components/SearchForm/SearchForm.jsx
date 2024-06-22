import "./SearchForm.css"

function SearchForm ({searchQuery, handleSearchQuery,handleFilterClicked}) {
    const buttonClicked = (event) => {
        console.log("filter selected:", event.target.name)
        handleFilterClicked(event.target.name);
    }

    return (
        <div className="search-form">
            <form>
                <input className="search-bar" type="text" placeholder="Search boards..." value={searchQuery} onChange={(event) => handleSearchQuery(event.target.value)}/>
            </form>
            <div className="category-filters">
                <button name="All" onClick={buttonClicked}>All</button>
                <button name="Recent" onClick={buttonClicked}>Recent</button>
                <button name="Celebration" onClick={buttonClicked}>Celebration</button>
                <button name="Thank You" onClick={buttonClicked}>Thank You</button>
                <button name="Inspiration" onClick={buttonClicked}>Inspiration</button>
            </div>
        </div>
    )
}

export default SearchForm;
