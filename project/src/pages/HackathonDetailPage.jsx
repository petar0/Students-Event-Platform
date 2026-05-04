import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('mk-MK', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}
function formatTime(timeStr) {
    return timeStr.slice(0, 5);
}
function getInitials(name) {
    return name.split(' ').filter(w => w.length > 1).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
export default function HackathonDetailPage({ hackathonId, navigate }) {
    const [hackathon, setHackathon] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchHackathon() {
            const { data } = await supabase
                .from('hackathons')
                .select('*')
                .eq('id', hackathonId)
                .maybeSingle();
            if (data) {
                setHackathon({
                    ...data,
                    jury: Array.isArray(data.jury) ? data.jury : JSON.parse(data.jury || '[]'),
                });
            }
            setLoading(false);
        }
        fetchHackathon();
    }, [hackathonId]);
    if (loading) {
        return (<div className="page-wrapper">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"/>
            <span>Се вчитува...</span>
          </div>
        </div>
      </div>);
    }
    if (!hackathon) {
        return (<div className="page-wrapper">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-title">Хакатонот не е пронајден.</div>
            <button className="button button-primary" onClick={() => navigate({ name: 'home' })}>
              Назад кон почетна
            </button>
          </div>
        </div>
      </div>);
    }
    return (<div className="page-wrapper">
      <div className="container">
        <div className="detail-back-btn">
          <button className="button button-ghost" onClick={() => navigate({ name: 'home' })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Назад
          </button>
        </div>

        <div className="detail-hero">
          <div className="detail-hero-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Хакатон
          </div>
          <h1 className="detail-title">{hackathon.title}</h1>
          <div className="detail-meta-row">
            <div className="detail-meta-chip">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {formatDate(hackathon.date)} · {formatTime(hackathon.time)}
            </div>
            <div className="detail-meta-chip">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {hackathon.location}
            </div>
            <div className="detail-meta-chip">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                <path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
              До {hackathon.max_team_members} члена по тим
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <div>
            <div className="detail-section">
              <h2 className="detail-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                За хакатонот
              </h2>
              <p className="detail-description">{hackathon.description}</p>
            </div>

            <div className="detail-section">
              <h2 className="detail-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Награди
              </h2>
              <p className="detail-prizes">{hackathon.prizes}</p>
            </div>

            {hackathon.jury.length > 0 && (<div className="detail-section">
                <h2 className="detail-section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                    <path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                  Жири
                </h2>
                <div className="jury-list">
                  {hackathon.jury.map((member, idx) => (<div key={idx} className="jury-item">
                      <div className="jury-avatar">{getInitials(member)}</div>
                      <span className="jury-name">{member}</span>
                    </div>))}
                </div>
              </div>)}
          </div>

          <div className="detail-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-card-title">Информации</div>

              <div className="sidebar-info-row">
                <svg className="sidebar-info-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <div>
                  <span className="sidebar-info-label">Датум</span>
                  <span className="sidebar-info-text">{formatDate(hackathon.date)}</span>
                </div>
              </div>

              <div className="sidebar-info-row">
                <svg className="sidebar-info-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <div>
                  <span className="sidebar-info-label">Почеток</span>
                  <span className="sidebar-info-text">{formatTime(hackathon.time)}</span>
                </div>
              </div>

              <div className="sidebar-info-row">
                <svg className="sidebar-info-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <span className="sidebar-info-label">Локација</span>
                  <span className="sidebar-info-text">{hackathon.location}</span>
                </div>
              </div>

              <div className="sidebar-info-row">
                <svg className="sidebar-info-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                </svg>
                <div>
                  <span className="sidebar-info-label">Макс. членови по тим</span>
                  <span className="sidebar-info-text">{hackathon.max_team_members} лица</span>
                </div>
              </div>

              <div>
                <span className="sidebar-info-label spaced">Тема</span>
                <span className="theme-tag">{hackathon.theme}</span>
              </div>
            </div>

            <button className="button button-accent button-lg button-full" onClick={() => navigate({ name: 'apply', hackathonId: hackathon.id, hackathonTitle: hackathon.title })}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Пријави се
            </button>
          </div>
        </div>
      </div>
    </div>);
}
