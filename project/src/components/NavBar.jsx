export default function NavBar({ currentPage, navigate, isLoggedIn, userEmail, onLogout }) {
    const isActive = (name) => currentPage.name === name;
    return (<nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <div className="navbar-brand" onClick={() => navigate({ name: 'home' })}>
            <div className="navbar-logo">SН</div>
            <div>
              <div className="navbar-title">Студентски Настани</div>
              <span className="navbar-subtitle">и Хакатони</span>
            </div>
          </div>

          <div className="navbar-nav">
            <button className={`nav-link ${isActive('home') ? 'active' : ''}`} onClick={() => navigate({ name: 'home' })}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Почетна
            </button>
            <button className={`nav-link ${isActive('support') ? 'active' : ''}`} onClick={() => navigate({ name: 'support' })}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Поддршка
            </button>

            {isLoggedIn && (<>
                <button className="nav-link nav-link-add" onClick={() => navigate({ name: 'add-event' })}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Додај Настан
                </button>
                <button className="nav-link nav-link-primary" onClick={() => navigate({ name: 'add-hackathon' })}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  Додај Хакатон
                </button>
              </>)}

            {isLoggedIn ? (<div className="navbar-user">
                <div className="navbar-user-avatar">
                  {userEmail ? userEmail[0].toUpperCase() : 'U'}
                </div>
                <div className="navbar-user-info">
                  <span className="navbar-user-email">{userEmail}</span>
                </div>
                <button className="nav-link" onClick={onLogout} title="Одјави се">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Одјави се
                </button>
              </div>) : (<>
                <button className={`nav-link ${isActive('login') ? 'active' : ''}`} onClick={() => navigate({ name: 'login' })}>
                  Најави се
                </button>
                <button className="nav-link nav-link-add" onClick={() => navigate({ name: 'register' })}>
                  Регистрирај се
                </button>
              </>)}
          </div>
        </div>
      </div>
    </nav>);
}
