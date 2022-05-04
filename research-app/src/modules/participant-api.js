// gets list of studies that match user's tags
export async function getUserTags(user, setUser) {
  const data = await fetch(`http://localhost:5000/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();

  setUser({
    username: user.username,
    password: user.password,
    enrolled: user.enrolled,
    age: user.age,
    heightFeet: user.heightFeet,
    heightInches: user.heightInches,
    weight: user.weight,
    sex: user.sex,
    gender: user.gender,
    allergies: user.allergies,
    type: user.type,
    phys: json.phys,
    psych: json.psych,
    med: json.med,
    messages: json.messages,
  });

  const userTags = user.phys.concat(user.psych.concat(user.med));
  return userTags;
}

// gets individual study by id
export async function getStudyByTag(tag) {
  const data = await fetch(`http://localhost:5000/study/tag/${tag}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.json();
}

// get all studies
export async function getAllStudyJsonByTag(user, setUser) {
  const tags = await getUserTags(user, setUser);
  return Promise.all(tags.map((tag) => getStudyByTag(tag)));
}

export default { getAllStudyJsonByTag };
