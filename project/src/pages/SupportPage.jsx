import { useState } from 'react';
import { supabase } from '../lib/supabase';
const initialForm = { name: '', email: '', description: '' };
export default function SupportPage({ navigate }) {
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
        const { error: dbError } = await supabase.from('support_tickets').insert({
            name: form.name,
            email: form.email,
            description: form.description,
        });
        setLoading(false);
        if (dbError) {
            setError('Грешка при испраќање. Обидете се повторно.');
            return;
        }
        setSubmitted(true);
    }
    if (submitted) {
        return (<div className="page-wrapper">
        <div className="container">
          <div className="form-page wide">
            <div className="form-card success-card">
              <div className="success-icon green">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="success-title">Тикетот е испратен!</h2>
              <p className="success-message">
                Ваш барање е примено. Ќе ве контактираме на <strong>{form.email}</strong> во најкраток рок.
              </p>
              <div className="button-row">
                <button className="button button-primary" onClick={() => navigate({ name: 'home' })}>
                  Кон почетна
                </button>
                <button className="button button-ghost" onClick={() => { setForm(initialForm); setSubmitted(false); }}>
                  Испрати нов тикет
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    return (<div className="page-wrapper">
      <div className="container">
        <div className="support-page-grid">
          <div className="support-info-card">
            <h2 className="support-title">
              Контакт информации
            </h2>

            <div className="support-info-item">
              <div className="support-info-icon-wrap blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22 6 12 13 2 6"/>
                </svg>
              </div>
              <div>
                <div className="support-info-label">Email</div>
                <div className="support-info-value">support@studentevents.mk</div>
              </div>
            </div>

            <div className="support-info-item">
              <div className="support-info-icon-wrap amber">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <div className="support-info-label">Работно време</div>
                <div className="support-info-value">Пон–Пет: 09:00–17:00</div>
              </div>
            </div>

            <div className="support-info-item">
              <div className="support-info-icon-wrap green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9a16 16 0 006.72 6.72l1.18-1.18a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div>
                <div className="support-info-label">Телефон</div>
                <div className="support-info-value">+389 2 123 4567</div>
              </div>
            </div>

            <div className="support-response-card">
              <div className="support-response-label">
                Просечно време за одговор
              </div>
              <div className="support-response-time">
                &lt; 24h
              </div>
              <div className="support-response-note">
                во работни денови
              </div>
            </div>
          </div>

          <div className="form-card">
            <div className="form-header">
              <div className="form-header-icon green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h1 className="form-title">Испратете тикет</h1>
              <p className="form-subtitle">Опишете го вашиот проблем и ќе ви одговориме во најкраток рок.</p>
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
                <label className="form-label" htmlFor="name">Целосно име *</label>
                <input id="name" name="name" className="form-input" type="text" placeholder="Пр. Марко Петровски" value={form.name} onChange={handleChange} required/>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email адреса *</label>
                <input id="email" name="email" className="form-input" type="email" placeholder="marko@example.com" value={form.email} onChange={handleChange} required/>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description">Опис на проблемот *</label>
                <textarea id="description" name="description" className="form-textarea" placeholder="Опишете го детално проблемот или прашањето..." value={form.description} onChange={handleChange} required rows={6}/>
              </div>

              <button type="submit" className="button button-primary button-lg button-full" disabled={loading}>
                {loading ? (<>
                    <div className="loading-dot light"/>
                    Се испраќа...
                  </>) : (<>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Испрати тикет
                  </>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>);
}
