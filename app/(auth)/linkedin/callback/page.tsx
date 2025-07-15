export default async function LinkedinCallbackPage() {
  const res = await fetch(`${process.env.API_URL}/api/users/current/`, {
    credentials: "include",
  });

  console.log("LinkedinCallbackPage res:", await res.json());

  if (res.ok) {
    const user = await res.json();
    return (
      <div>
        <h1>Привіт, {user?.username}</h1>
      </div>
    );
  }

  return <p>Не вдалося увійти</p>;
}
