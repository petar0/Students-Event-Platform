import { useState } from 'react';
import { supabase } from '../lib/supabase';
const initialForm = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    theme: '',
    prizes: '',
    jury: [''],
    max_team_members: 4,
};
export default function AddHackathonPage({ navigate }) {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'max_team_members' ? Number(value) : value }));
    }
    function handleJuryChange(idx, value) {
        setForm(prev => {
            const jury = [...prev.jury];
            jury[idx] = value;
            return { ...prev, jury };
        });
    }
    function addJuryMember() {
        setForm(prev => ({ ...prev, jury: [...prev.jury, ''] }));
    }
    function removeJuryMember(idx) {
        setForm(prev => ({ ...prev, jury: prev.jury.filter((_, i) => i !== idx) }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        const juryFiltered = form.jury.filter(j => j.trim() !== '');
        const { error: dbError } = await supabase.from('hackathons').insert({
            title: form.title,
            description: form.description,
            date: form.date,
            time: form.time,
            location: form.location,
            theme: form.theme,
            prizes: form.prizes,
            jury: juryFiltered,
            max_team_members: form.max_team_members,
        });
        setLoading(false);
        if (dbError) {
            setError('Грешка при зачувување. Обидете се повторно.');
            return;
        }
        setSubmitted(true);
    }
    if (submitted) {
        return (<div className="page-wrapper">
        <div className="container">
          <div className="form-page">
            <div className="form-card success-card">
              <div className="success-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="success-title">Хакатонот е додаден!</h2>
              <p className="success-message">
                Вашиот хакатон "<strong>{form.title}</strong>" е успешно зачуван и ќе биде видлив на почетната страна.
              </p>
              <div className="button-row">
                <button className="button button-primary" onClick={() => navigate({ name: 'home' })}>
                  Кон почетна
                </button>
                <button className="button button-ghost" onClick={() => { setForm(initialForm); setSubmitted(false); }}>
                  Додај уште еден
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
          <button className="button button-ghost form-back-btn" onClick={() => navigate({ name: 'home' })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Назад
          </button>

          <div className="form-card">
            <div className="form-header">
              <div className="form-header-icon amber">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h1 className="form-title">Додај нов хакатон</h1>
              <p className="form-subtitle">Пополнете ги деталите за вашиот хакатон и тој ќе биде видлив на платформата.</p>
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
              <div className="form-group">
                <label className="form-label" htmlFor="title">Наслов *</label>
                <input id="title" name="title" className="form-input" type="text" placeholder="Пр. HackSkopje 2026" value={form.title} onChange={handleChange} required/>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description">Опис *</label>
                <textarea id="description" name="description" className="form-textarea" placeholder="Детален опис на хакатонот..." value={form.description} onChange={handleChange} required rows={5}/>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="date">Датум *</label>
                  <input id="date" name="date" className="form-input" type="date" value={form.date} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="time">Време *</label>
                  <input id="time" name="time" className="form-input" type="time" value={form.time} onChange={handleChange} required/>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="location">Локација *</label>
                <input id="location" name="location" className="form-input" type="text" placeholder="Пр. Innovation Hub, Скопје" value={form.location} onChange={handleChange} required/>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="theme">Тема *</label>
                <input id="theme" name="theme" className="form-input" type="text" placeholder="Пр. SmartCity & UrbanTech" value={form.theme} onChange={handleChange} required/>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prizes">Награди *</label>
                <textarea id="prizes" name="prizes" className="form-textarea" placeholder="1-во место: 1000€&#10;2-ро место: 500€&#10;3-то место: 200€" value={form.prizes} onChange={handleChange} required rows={4}/>
                <span className="form-helper">Секоја награда на нов ред</span>
              </div>

              <div className="form-divider"/>

              <div className="form-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
                Членови на жири
              </div>

              <div className="form-group">
                <div className="jury-input-list">
                  {form.jury.map((member, idx) => (<div key={idx} className="jury-input-row">
                      <input className="form-input" type="text" placeholder={`Жири #${idx + 1} — Пр. д-р Петровски - CTO @ TechMK`} value={member} onChange={e => handleJuryChange(idx, e.target.value)}/>
                      {form.jury.length > 1 && (<button type="button" className="jury-remove-btn" onClick={() => removeJuryMember(idx)} title="Отстрани">
                          ×
                        </button>)}
                    </div>))}
                </div>
                <button type="button" className="jury-add-btn" onClick={addJuryMember}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Додај член на жири
                </button>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="max_team_members">Максимален број на членови по тим *</label>
                <input id="max_team_members" name="max_team_members" className="form-input" type="number" min={1} max={10} value={form.max_team_members} onChange={handleChange} required/>
              </div>

              <button type="submit" className="button button-accent button-lg button-full" disabled={loading}>
                {loading ? (<>
                    <div className="loading-dot dark"/>
                    Се зачувува...
                  </>) : (<>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    Додај хакатон
                  </>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>);
}
