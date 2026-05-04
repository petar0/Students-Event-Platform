function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('mk-MK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}
function formatTime(timeStr) {
    return timeStr.slice(0, 5);
}
function getInitials(title) {
    return title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
export default function EventCard({ item, navigate }) {
    const isHackathon = item.itemType === 'hackathon';
    const handleViewMore = () => {
        if (isHackathon) {
            navigate({ name: 'hackathon-detail', id: item.id });
        }
        else {
            navigate({ name: 'event-detail', id: item.id });
        }
    };
    return (<article className="card event-card">
      <div className={`card-accent-bar ${isHackathon ? 'hackathon' : 'event'}`}/>

      <div className="card-body">
        <span className={`card-type-badge ${isHackathon ? 'hackathon' : 'event'}`}>
          {isHackathon ? (<>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Хакатон
            </>) : (<>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Настан
            </>)}
        </span>

        <h2 className="card-title">{item.title}</h2>
        <p className="card-description">{item.description}</p>

        <div className="card-meta">
          <div className="card-meta-item">
            <svg className="card-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {formatDate(item.date)} · {formatTime(item.time)}
          </div>
          <div className="card-meta-item">
            <svg className="card-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {item.location}
          </div>
          {isHackathon && 'theme' in item && (<div className="card-meta-item">
              <svg className="card-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              {item.theme}
            </div>)}
        </div>
      </div>

      <div className="card-footer">
        <div className="card-footer-identity">
          <div className={`card-avatar ${isHackathon ? 'hackathon' : 'event'}`}>
            {getInitials(item.title)}
          </div>
          <span className="card-footer-type">
            {isHackathon ? 'Хакатон' : 'Настан'}
          </span>
        </div>
        <button className="button button-primary button-sm" onClick={handleViewMore}>
          Види повеќе
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </article>);
}
