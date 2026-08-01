import { useNavigate } from 'react-router-dom';

export default function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <button
      className="user-card"
      onClick={() => navigate(`/users/${user.id}`)}
      aria-label={`View details for ${user.name}`}
    >
      <div className="avatar">{user.name.charAt(0)}</div>
      <div className="user-card-info">
        <h3>{user.name}</h3>
        <p>@{user.username}</p>
        <p className="muted">{user.email}</p>
      </div>
    </button>
  );
}
