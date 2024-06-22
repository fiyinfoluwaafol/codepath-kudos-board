import "./NewCardForm.css"
import { useState } from "react";

function NewCardForm ({closeModal, boardId, submitForm}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [gifSearch, setGifSearch] = useState('');
    const [gifUrl, setGifUrl] = useState('');
    const [author, setAuthor] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleGifSearchChange = (event) => {
        setGifSearch(event.target.value);
    };
    const handleGifUrlChange = (event) => {
        setGifUrl(event.target.value);
    };
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleSubmit = () => {
        const cardData = {
            title,
            description,
            gifUrl,
            author,
            boardId
        };
        submitForm(cardData);
    };
    async function fetchGIFUrls () {
        try{
        const apiKey = import.meta.env.VITE_API_KEY;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
          }
        };
        let endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifSearch}&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
        const response = await fetch(endpoint, options);
        if (!response.ok) {
          throw new Error('Failed to fetch data from API');
        }
        const data = await response.json();
        console.log(data);
        setGifUrl(data.data[0].images.original.url);
      }
      catch (error) {
        console.error(error);
      }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-bttn" onClick={closeModal}>&times;</button>
                <h2>Create a New Card</h2>
                <input name='title' type='text' placeholder="Enter card title" value={title} onChange={handleTitleChange}/>
                <input name='description' type="text" placeholder="Enter card description" value={description} onChange={handleDescriptionChange}/>
                <input name="gifSearch" type="text" placeholder="Search GIFs..." value={gifSearch} onChange={handleGifSearchChange}/>
                <button onClick={() => fetchGIFUrls()}>Search</button>
                <input name="gifUrl" type="text" placeholder="Enter GIF Url" value={gifUrl} onChange={handleGifUrlChange}/>
                <input name='author' type="text" placeholder="Enter owner (optional)" value={author} onChange={handleAuthorChange}/>
                <button onClick={handleSubmit}>Create Card</button>
            </div>
        </div>
    );
}

export default NewCardForm;
