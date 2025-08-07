import React from 'react';

function MovieDetailsModal({ movieDetails, onClose }) {
  if (!movieDetails) return null;

  return (
    // click outside closes modal
    <div 
        className="modal modal-open" 
        onClick={onClose}
    >
      <div
        className="modal-box bg-white text-black relative rounded-lg"
        //to stop close if clicked inside modal
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="btn btn-circle btn-ghost btn-sm absolute right-4 top-4 bg-indigo-300 hover:bg-indigo-400 text-black border-none"
          aria-label="Close modal"
        >
          ✕
        </button>
        {/*Modal specific loading, as loading in App.jsx didn't work due to loading spinner not appearing until modal pop up happened*/}
        {movieDetails.loading ? (
          <div className="text-center py-10">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="mt-4 text-gray-500">Loading movie details...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">{movieDetails.title}</h2>
            <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
            <p><strong>Runtime:</strong> {movieDetails.runtime} minutes</p>
            <p><strong>Synopsis:</strong> {movieDetails.overview}</p>
            <p><strong>Released:</strong> {movieDetails.status === "Released" ? "Yes" : "No"}</p>
            <p>
              <strong>Director:</strong>{' '}
              {movieDetails.credits.crew.find(person => person.job === 'Director')?.name || 'N/A'}
            </p>
            <p>
              <strong>Cast:</strong>{' '}
              {movieDetails.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieDetailsModal;
