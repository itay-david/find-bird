import React, { useState } from 'react';
import { ref, get } from 'firebase/database';
import database from './firebaseConfig';

function SearchPage() {
  const [parrotCode, setParrotCode] = useState('');
  const [parrotInfo, setParrotInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    const parrotRef = ref(database, `parrots/${parrotCode}`);
    const snapshot = await get(parrotRef);
    if (snapshot.exists()) {
      setParrotInfo(snapshot.val());
    } else {
      setParrotInfo(null);
      alert('תוכי לא נמצא');
    }
    setIsLoading(false);
  };

  return (
    <div className="page">
      <h1>חיפוש מידע על תוכי</h1>
      
      <div className="search-container">
        <input
          type="text"
          value={parrotCode}
          onChange={(e) => setParrotCode(e.target.value)}
          placeholder="הכנס קוד תוכי"
        />
        <button onClick={handleSearch} className={isLoading ? 'loading' : ''}>
          <i className="material-icons">search</i>
        </button>
      </div>

      {parrotInfo && (
        <div className="parrot-info">
          <div className="info-header">
            <i className="material-icons">pets</i>
            <h2>{parrotInfo.name}</h2>
          </div>
          <div className="info-body">
            <div className="info-item">
              <i className="material-icons">home</i>
              <p>{parrotInfo.address}</p>
            </div>
            <div className="info-item">
              <i className="material-icons">phone</i>
              <p>{parrotInfo.phone}</p>
            </div>
            <div className="info-item">
              <i className="material-icons">person</i>
              <p>{parrotInfo.ownerName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;