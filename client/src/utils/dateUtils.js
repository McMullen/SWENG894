export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${month}-${day}-${year}`;
};

export const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age === 0) {
    // Calculate months difference
    let months = today.getMonth() - birthDate.getMonth() + (today.getDate() < birthDate.getDate() ? -1 : 0);
    if (months < 0) months += 12;

    if (months === 0) {
      // Calculate weeks difference
      const weeks = Math.floor((today - birthDate) / (7 * 24 * 60 * 60 * 1000));
      return `${weeks} week(s)`;
    }

    return `${months} month(s)`;
  }

  return `${age} year(s)`;
};
