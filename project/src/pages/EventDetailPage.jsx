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
export default function EventDetailPage({ eventId, navigate }) {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchEvent() {
            const { data } = await supabase
                .from('events')
                .select('*')
                .eq('id', eventId)
                .maybeSingle();
            if (data) {
                setEvent(data);
            }
            setLoading(false);
        }
        fetchEvent();
    }, [eventId]);
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
    if (!event) {
        return (<div className="page-wrapper">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-title">Настанот не е пронајден.</div>
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

        <div className="detail-hero event-detail-hero">
          <div className="detail-hero-badge event-detail-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Настан
          </div>
          <h1 className="detail-title">{event.title}</h1>
          <div className="detail-meta-row">
            <div className="detail-meta-chip">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {formatDate(event.date)} · {formatTime(event.time)}
            </div>
            <div className="detail-meta-chip">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {event.location}
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <div>
            <div className="detail-section">
              <h2 className="detail-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                За настанот
              </h2>
              <p className="detail-description">{event.description}</p>
            </div>
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
                  <span className="sidebar-info-text">{formatDate(event.date)}</span>
                </div>
              </div>

              <div className="sidebar-info-row">
                <svg className="sidebar-info-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <div>
                  <span className="sidebar-info-label">Време</span>
                  <span className="sidebar-info-text">{formatTime(event.time)}</span>
                </div>
              </div>

              <div className="sidebar-info-row">
                <svg className="sidebar-info-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <span className="sidebar-info-label">Локација</span>
                  <span className="sidebar-info-text">{event.location}</span>
                </div>
              </div>

              <div className="sidebar-info-row">
                <svg className="sidebar-info-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <div>
                  <span className="sidebar-info-label">Тип</span>
                  <span className="sidebar-info-text">Настан</span>
                </div>
              </div>
            </div>

            <button className="button button-primary button-lg button-full" onClick={() => navigate({ name: 'home' })}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Сите настани
            </button>
          </div>
        </div>
      </div>
    </div>);
}
