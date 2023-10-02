import React, { useContext, useEffect } from 'react';
import AllContext from '../src/context/context';
import './BookmarkButton.css';

function BookmarkButton({ movie }) {
  const { bookmarks, setBookmarks } = useContext(AllContext);

  // Check if the movie is already in the bookmarks by comparing the movie titles
  const isBookmarked = bookmarks.some(bookmark => bookmark.title === movie.title);

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      // Remove the movie from bookmarks by filtering out the selected movie object
      setBookmarks(bookmarks.filter(bookmark => bookmark.title !== movie.title));
    } else {
      // Add the entire movie object to bookmarks
      setBookmarks([...bookmarks, movie]);
    }
  };

  return (
    <button 
      className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`} 
      onClick={handleBookmarkClick}
    >
      {isBookmarked ? 'Unbookmark' : 'Bookmark'}
    </button>
  );
}

export default BookmarkButton;
