import { useEffect, useMemo, useState } from 'react';
import { fetchUsers } from '../services/api';
import { applyPersona } from '../data/personas';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import { useAuth } from '../context/AuthContext';

export default function MainPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers();
        if (!cancelled) setUsers(data.map(applyPersona));
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  return (
    <div className="page">
      <header className="page-header">
        <h1>Users</h1>
        <button className="secondary" onClick={logout}>
          Logout
        </button>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search by name, username, or email…"
      />

      {loading && <p className="status">Loading users…</p>}
      {error && (
        <p className="status error-text" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && filteredUsers.length === 0 && (
        <p className="status">No users match your search.</p>
      )}

      <div className="user-list">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
