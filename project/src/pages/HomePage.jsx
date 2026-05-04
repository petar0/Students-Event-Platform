import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import EventCard from '../components/EventCard';
export default function HomePage({ navigate }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const [eventsRes, hackathonsRes] = await Promise.all([
                supabase.from('events').select('*').order('date', { ascending: true }),
                supabase.from('hackathons').select('*').order('date', { ascending: true }),
            ]);
            const events = (eventsRes.data || []).map(e => ({
                ...e,
                itemType: 'event',
            }));
            const hackathons = (hackathonsRes.data || []).map(h => ({
                ...h,
                jury: Array.isArray(h.jury) ? h.jury : JSON.parse(h.jury || '[]'),
                itemType: 'hackathon',
            }));
            const combined = [...events, ...hackathons].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setItems(combined);
            setLoading(false);
        }
        fetchData();
    }, []);
    const filtered = filter === 'all' ? items : items.filter(i => i.itemType === filter);
    const eventCount = items.filter(i => i.itemType === 'event').length;
    const hackathonCount = items.filter(i => i.itemType === 'hackathon').length;
    return (<>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Платформа за студентски настани
            </div>
            <h1 className="hero-title">
              Откријте ги<br />
              <span className="hero-title-highlight">Можностите</span>
            </h1>
            <p className="hero-description">
              Пронајдете ги најдобрите студентски хакатони и настани.
              Пријавете се, натпреварувајте се и напреднувајте.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">{items.length}</div>
                <div className="hero-stat-label">Активни настани</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{hackathonCount}</div>
                <div className="hero-stat-label">Хакатони</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{eventCount}</div>
                <div className="hero-stat-label">Настани</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-wrapper">
        <div className="container">
          <div className="filter-bar">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              Сите
              <span className="filter-count">{items.length}</span>
            </button>
            <button className={`filter-btn ${filter === 'hackathon' ? 'active' : ''}`} onClick={() => setFilter('hackathon')}>
              Хакатони
              <span className="filter-count">{hackathonCount}</span>
            </button>
            <button className={`filter-btn ${filter === 'event' ? 'active' : ''}`} onClick={() => setFilter('event')}>
              Настани
              <span className="filter-count">{eventCount}</span>
            </button>
          </div>

          {loading ? (<div className="loading-spinner">
              <div className="spinner"/>
              <span>Се вчитуваат настаните...</span>
            </div>) : filtered.length === 0 ? (<div className="empty-state">
              <div className="empty-state-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div className="empty-state-title">Нема настани</div>
            </div>) : (<div className="events-grid">
              {filtered.map(item => (<EventCard key={`${item.itemType}-${item.id}`} item={item} navigate={navigate}/>))}
            </div>)}
        </div>
      </div>
    </>);
}
