const filterNotes = (title, date, query) => {
  if (title && date) {
    query.date = date;
    query.title = title;
  } else {
    if (title) {
      query.title = title;
    }
    if (date) {
      query.date = date;
    }
  }
  return query;
};

export default filterNotes;
