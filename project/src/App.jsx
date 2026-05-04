import { useState, useEffect } from 'react';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import HackathonDetailPage from './pages/HackathonDetailPage';
import EventDetailPage from './pages/EventDetailPage';
import AddHackathonPage from './pages/AddHackathonPage';
import AddEventPage from './pages/AddEventPage';
import ApplyPage from './pages/ApplyPage';
import SupportPage from './pages/SupportPage';
import AuthPage from './pages/AuthPage';
import './styles/main.css';
export default function App() {
    const [currentPage, setCurrentPage] = useState({ name: 'home' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    useEffect(() => {
        if (!isSupabaseConfigured) {
            return;
        }
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsLoggedIn(!!session);
            setUserEmail(session?.user?.email ?? null);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
            setUserEmail(session?.user?.email ?? null);
        });
        return () => subscription.unsubscribe();
    }, []);
    function navigate(page) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    async function handleLogout() {
        if (!isSupabaseConfigured) {
            return;
        }
        await supabase.auth.signOut();
        setIsLoggedIn(false);
        setUserEmail(null);
        navigate({ name: 'home' });
    }
    function handleAuth() {
        setIsLoggedIn(true);
    }
    function renderPage() {
        if (!isSupabaseConfigured) {
            return <SupabaseSetupNotice />;
        }
        switch (currentPage.name) {
            case 'home':
                return <HomePage navigate={navigate}/>;
            case 'hackathon-detail':
                return <HackathonDetailPage hackathonId={currentPage.id} navigate={navigate}/>;
            case 'event-detail':
                return <EventDetailPage eventId={currentPage.id} navigate={navigate}/>;
            case 'add-hackathon':
                return <AddHackathonPage navigate={navigate}/>;
            case 'add-event':
                return <AddEventPage navigate={navigate}/>;
            case 'apply':
                return (<ApplyPage hackathonId={currentPage.hackathonId} hackathonTitle={currentPage.hackathonTitle} navigate={navigate}/>);
            case 'support':
                return <SupportPage navigate={navigate}/>;
            case 'register':
                return <AuthPage mode="register" navigate={navigate} onAuth={handleAuth}/>;
            case 'login':
                return <AuthPage mode="login" navigate={navigate} onAuth={handleAuth}/>;
            default:
                return <HomePage navigate={navigate}/>;
        }
    }
    return (<div>
      <NavBar currentPage={currentPage} navigate={navigate} isLoggedIn={isLoggedIn} userEmail={userEmail} onLogout={handleLogout}/>
      <main>{renderPage()}</main>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <span className="footer-brand">Студентски Настани и Хакатони</span>
            <span>© {new Date().getFullYear()} Сите права задржани.</span>
          </div>
        </div>
      </footer>
    </div>);
}

function SupabaseSetupNotice() {
    return (<div className="page-wrapper">
      <div className="container">
        <div className="setup-card">
          <h1 className="setup-title">Недостасува Supabase конфигурација</h1>
          <p className="setup-text">
            Проектот е симнат од GitHub без <code>.env</code> фајл, затоа што тој намерно не се качува јавно. Креирај <code>.env</code> во <code>project</code> папката и внеси ги вредностите од Supabase.
          </p>
          <pre className="setup-code">{`VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`}</pre>
          <p className="setup-text">
            Потоа изгаси го dev server-от и пушти повторно <code>npm run dev</code>.
          </p>
        </div>
      </div>
    </div>);
}
