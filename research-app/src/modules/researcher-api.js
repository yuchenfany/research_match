export async function addStudy(user, study, setStudy) {
  // finds maximum studyID in our collections
  const studyData = await fetch('http://localhost:5000/findMax', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await studyData.json();
  // sets next ID
  const Id = data[0].studyId + 1;
  // gets the userData
  const userData = await fetch(`http://localhost:5000/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const currUser = await userData.json();
  const currStudies = currUser.studies;
  currStudies.push(Id);
  const updatedUser = {
    username: currUser.username,
    password: currUser.password,
    name: currUser.name,
    organization: currUser.organization,
    studies: currUser.studies,
    type: currUser.type,
  };
  // Adds the new created study into the user's studies field
  await fetch('http://localhost:5000/record/add-to-user-array', {
    method: 'POST',
    body: JSON.stringify(updatedUser),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  setStudy({
    title: study.title,
    description: study.description,
    compensation: study.compensation,
    duration: study.duration,
    tags: study.tags,
    participants: study.participants,
    studyId: Id,
    researchers: user.name,
  });
  const myobj = {
    title: study.title,
    description: study.description,
    compensation: study.compensation,
    duration: study.duration,
    tags: study.tags,
    participants: study.participants,
    studyId: Id,
    researchers: user.name,
  };
  // creates a new study in the study collection
  await fetch('http://localhost:5000/add-study', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(myobj),
  })
    .catch((e) => {
      console.log(e);
    });
  return true;
}

export default { addStudy };
