export const checkRating = (rating) => {
  switch (rating) {
    case "PG":
      return "ratingPG";
    case "G":
      return "ratingG";
    case "PG-13":
      return "ratingPG13";
    case "R":
      return "ratingR";
    default:
      return "noRating";
  }
};
