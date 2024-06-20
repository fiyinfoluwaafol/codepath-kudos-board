import "./SearchForm.css"

function SearchForm ({searchQuery, handleSearchQuery}) {
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        handleSearchQuery(inputValue);
        // console.log(searchQuery);
    }
    return (
        <div className="search-form">
            <form>
                <input className="search-bar" type="text" placeholder="Search boards..." value={searchQuery} onChange={handleInputChange}/>
            </form>
            <div className="category-filters">
                <button>All</button>
                <button>Recent</button>
                <button>Celebration</button>
                <button>Thank You</button>
                <button>Inspiration</button>
            </div>
        </div>
    )
}

export default SearchForm;
