import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockLogin } from '../utils/validation';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { success, error: validationError } = mockLogin(phone.trim());

    if (!success) {
      setError(validationError);
      setSubmitting(false);
      return;
    }

    setError(null);
    login(phone.trim());
    setSubmitting(false);
    navigate('/');
  };

  return (
    <div className="page login-page">
      <div className="card login-card">
        <h1>Directory Access</h1>
        <p className="subtitle">
          Enter your registered phone number to view the directory
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            type="tel"
            placeholder="+254712345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'phone-error' : undefined}
          />

          {error && (
            <p id="phone-error" className="error-text" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Checking…' : 'Continue'}
          </button>
        </form>

        <p className="hint">Registered test line: +254712345678</p>
      </div>
    </div>
  );
}
