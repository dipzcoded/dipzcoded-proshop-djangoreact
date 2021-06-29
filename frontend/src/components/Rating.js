import StarRatings from "react-star-ratings";
function Rating({ rating, numReviews }) {
  return (
    <>
      <StarRatings
        rating={rating}
        starDimension="18px"
        starSpacing="5px"
        starRatedColor="yellow"
        numberOfStars={5}
      />{" "}
      <p
        style={{
          marginTop: "5px",
        }}
      >
        {numReviews} {numReviews < 2 ? "review" : "reviews"}
      </p>
    </>
  );
}

export default Rating;
