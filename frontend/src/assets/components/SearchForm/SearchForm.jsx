import "./SearchForm.css"

function SearchForm () {
    return (
        <div className="search-form">
            <form>
                <input className="search-bar" type="text" placeholder="Search boards..." />
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
