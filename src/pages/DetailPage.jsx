import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById } from '../services/api';
import { applyPersona } from '../data/personas';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUserById(id);
        if (!cancelled) setUser(applyPersona(data));
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadUser();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="page">
      <button className="secondary back-btn" onClick={() => navigate('/')}>
        ← Back to list
      </button>

      {loading && <p className="status">Loading user…</p>}
      {error && (
        <p className="status error-text" role="alert">
          {error}
        </p>
      )}

      {user && (
        <div className="card detail-card">
          <h1>{user.name}</h1>
          <p className="subtitle">@{user.username}</p>

          <dl>
            <dt>Email</dt>
            <dd>{user.email}</dd>

            <dt>Phone</dt>
            <dd>{user.phone}</dd>

            <dt>Website</dt>
            <dd>{user.website}</dd>

            <dt>Company</dt>
            <dd>{user.company?.name}</dd>

            <dt>Address</dt>
            <dd>
              {user.address?.street}, {user.address?.suite}, {user.address?.city}{' '}
              {user.address?.zipcode}
            </dd>
          </dl>
        </div>
      )}
    </div>
  );
}
