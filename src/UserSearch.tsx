import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};

export default function UserSearch({
  query,
}: {
  query: string;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/users?q=${encodeURIComponent(query)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json() as Promise<User[]>;
      })
      .then((data) => {
        setUsers(data);
      })
      .catch(() => {
        setError("Could not load users");
      });
  }, [query]);

  return (
    <div>
      {error && <p role="alert">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
