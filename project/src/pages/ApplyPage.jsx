import { useState } from 'react';
import { supabase } from '../lib/supabase';
const initialForm = {
    first_name: '',
    last_name: '',
    email: '',
    team_name: '',
    members_count: 2,
};
export default function ApplyPage({ hackathonId, hackathonTitle, navigate }) {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'members_count' ? Number(value) : value }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        const { error: dbError } = await supabase.from('applications').insert({
            hackathon_id: hackathonId,
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            team_name: form.team_name,
            members_count: form.members_count,
        });
        setLoading(false);
        if (dbError) {
            setError('Грешка при пријавување. Обидете се повторно.');
            return;
        }
        setSubmitted(true);
    }
    if (submitted) {
        return (<div className="page-wrapper">
        <div className="container">
          <div className="form-page">
            <div className="form-card success-card">
              <div className="success-icon primary">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="success-title">Пријавата е испратена!</h2>
              <p className="success-message">
                Вашиот тим "<strong>{form.team_name}</strong>" е успешно пријавен на хакатонот <strong>{hackathonTitle}</strong>. Очекувајте потврда на {form.email}.
              </p>
              <div className="button-row">
                <button className="button button-primary" onClick={() => navigate({ name: 'home' })}>
                  Кон почетна
                </button>
                <button className="button button-ghost" onClick={() => navigate({ name: 'hackathon-detail', id: hackathonId })}>
                  Назад кон хакатонот
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    return (<div className="page-wrapper">
      <div className="container">
        <div className="form-page">
          <button className="button button-ghost form-back-btn" onClick={() => navigate({ name: 'hackathon-detail', id: hackathonId })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Назад
          </button>

          <div className="form-card">
            <div className="apply-hackathon-info">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              <div>
                <div className="apply-hackathon-label">Пријавување за</div>
                <div className="apply-hackathon-title">{hackathonTitle}</div>
              </div>
            </div>

            <div className="form-header">
              <div className="form-header-icon blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <h1 className="form-title">Пријава за тим</h1>
              <p className="form-subtitle">Пополнете ги вашите податоци и деталите за тимот.</p>
            </div>

            {error && (<div className="alert alert-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>)}

            <form onSubmit={handleSubmit}>
              <div className="form-section-title spaced">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Лични податоци
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="first_name">Име *</label>
                  <input id="first_name" name="first_name" className="form-input" type="text" placeholder="Пр. Марко" value={form.first_name} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="last_name">Презиме *</label>
                  <input id="last_name" name="last_name" className="form-input" type="text" placeholder="Пр. Петровски" value={form.last_name} onChange={handleChange} required/>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email адреса *</label>
                <input id="email" name="email" className="form-input" type="email" placeholder="marko@example.com" value={form.email} onChange={handleChange} required/>
              </div>

              <div className="form-divider"/>

              <div className="form-section-title spaced">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
                Информации за тим
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="team_name">Име на тим *</label>
                <input id="team_name" name="team_name" className="form-input" type="text" placeholder="Пр. CodeStorm Team" value={form.team_name} onChange={handleChange} required/>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="members_count">Број на членови *</label>
                <input id="members_count" name="members_count" className="form-input" type="number" min={1} max={10} value={form.members_count} onChange={handleChange} required/>
              </div>

              <button type="submit" className="button button-primary button-lg button-full" disabled={loading}>
                {loading ? (<>
                    <div className="loading-dot light"/>
                    Се испраќа...
                  </>) : (<>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Пријави се
                  </>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>);
}
