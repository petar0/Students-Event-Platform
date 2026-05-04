import { useState } from 'react';
import { supabase } from '../lib/supabase';
const initialForm = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
};
export default function AddEventPage({ navigate }) {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        const { error: dbError } = await supabase.from('events').insert({
            title: form.title,
            description: form.description,
            date: form.date,
            time: form.time,
            location: form.location,
            type: 'event',
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
              <div className="success-icon event">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="success-title">Настанот е додаден!</h2>
              <p className="success-message">
                Вашиот настан "<strong>{form.title}</strong>" е успешно зачуван и ќе биде видлив на почетната страна.
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
              <div className="form-header-icon event">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h1 className="form-title">Додај нов настан</h1>
              <p className="form-subtitle">Пополнете ги деталите за вашиот настан и тој ќе биде видлив на платформата.</p>
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
                <input id="title" name="title" className="form-input" type="text" placeholder="Пр. Отворен ден на технолошкиот факултет" value={form.title} onChange={handleChange} required/>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description">Опис *</label>
                <textarea id="description" name="description" className="form-textarea" placeholder="Детален опис на настанот..." value={form.description} onChange={handleChange} required rows={5}/>
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
                <input id="location" name="location" className="form-input" type="text" placeholder="Пр. Технолошки факултет, Скопје" value={form.location} onChange={handleChange} required/>
              </div>

              <button type="submit" className="button button-primary button-lg button-full" disabled={loading}>
                {loading ? (<>
                    <div className="loading-dot light"/>
                    Се зачувува...
                  </>) : (<>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Додај настан
                  </>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>);
}
