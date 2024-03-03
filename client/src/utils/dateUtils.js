export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
};

export const formatCalendarDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
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
