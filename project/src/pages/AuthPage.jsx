import { useState } from 'react';
import { supabase } from '../lib/supabase';
export default function AuthPage({ mode, navigate, onAuth }) {
    const [regForm, setRegForm] = useState({ name: '', email: '', password: '' });
    const [logForm, setLogForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const isRegister = mode === 'register';
    function handleRegChange(e) {
        const { name, value } = e.target;
        setRegForm(prev => ({ ...prev, [name]: value }));
    }
    function handleLogChange(e) {
        const { name, value } = e.target;
        setLogForm(prev => ({ ...prev, [name]: value }));
    }
    async function handleRegister(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        const { error: authError } = await supabase.auth.signUp({
            email: regForm.email,
            password: regForm.password,
            options: {
                data: { full_name: regForm.name },
            },
        });
        setLoading(false);
        if (authError) {
            setError(authError.message === 'User already registered'
                ? 'Овој email е веќе регистриран.'
                : 'Грешка при регистрација. Обидете се повторно.');
            return;
        }
        onAuth();
        navigate({ name: 'home' });
    }
    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        const { error: authError } = await supabase.auth.signInWithPassword({
            email: logForm.email,
            password: logForm.password,
        });
        setLoading(false);
        if (authError) {
            setError('Невалиден email или лозинка.');
            return;
        }
        onAuth();
        navigate({ name: 'home' });
    }
    return (<div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="navbar-logo">SН</div>
          </div>
          <h1 className="auth-title">
            {isRegister ? 'Креирај сметка' : 'Најави се'}
          </h1>
          <p className="auth-subtitle">
            {isRegister
            ? 'Регистрирајте се за да ги користите сите функционалности на платформата.'
            : 'Внесете ги вашите податоци за да се најавите.'}
          </p>
        </div>

        {error && (<div className="alert alert-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>)}

        {isRegister ? (<form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">Име *</label>
              <input id="reg-name" name="name" className="form-input" type="text" placeholder="Пр. Марко Петровски" value={regForm.name} onChange={handleRegChange} required/>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email *</label>
              <input id="reg-email" name="email" className="form-input" type="email" placeholder="marko@example.com" value={regForm.email} onChange={handleRegChange} required/>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Лозинка *</label>
              <input id="reg-password" name="password" className="form-input" type="password" placeholder="Минимум 6 карактери" value={regForm.password} onChange={handleRegChange} required minLength={6}/>
            </div>

            <button type="submit" className="button button-primary button-lg button-full" disabled={loading}>
              {loading ? (<>
                  <div className="loading-dot light"/>
                  Се регистрира...
                </>) : ('Регистрирај се')}
            </button>
          </form>) : (<form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="log-email">Email *</label>
              <input id="log-email" name="email" className="form-input" type="email" placeholder="marko@example.com" value={logForm.email} onChange={handleLogChange} required/>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="log-password">Лозинка *</label>
              <input id="log-password" name="password" className="form-input" type="password" placeholder="Вашата лозинка" value={logForm.password} onChange={handleLogChange} required/>
            </div>

            <button type="submit" className="button button-primary button-lg button-full" disabled={loading}>
              {loading ? (<>
                  <div className="loading-dot light"/>
                  Се најавува...
                </>) : ('Најави се')}
            </button>
          </form>)}

        <div className="auth-switch">
          {isRegister ? (<span>
              Веќе имате сметка?{' '}
              <button className="auth-switch-link" onClick={() => navigate({ name: 'login' })}>
                Најави се
              </button>
            </span>) : (<span>
              Немате сметка?{' '}
              <button className="auth-switch-link" onClick={() => navigate({ name: 'register' })}>
                Регистрирај се
              </button>
            </span>)}
        </div>
      </div>
    </div>);
}
