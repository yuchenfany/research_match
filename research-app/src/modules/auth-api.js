/* AUTH */
export async function userExists(user) {
  const data = await fetch(`http://localhost:5000/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => { console.log(e); });

  return await data.json() != null;
}

export async function deleteUser(user) {
  await fetch(`http://localhost:5000/record/delete/${user.username}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => e.toString());
  return true;
}
