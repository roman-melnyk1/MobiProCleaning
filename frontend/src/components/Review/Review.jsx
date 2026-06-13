import { useState, useEffect } from "react";
import { client } from "../../sanity";
import { Star } from "lucide-react";
import css from "./Review.module.css";

import googlePlaceholder from "../../assets/photo/google24.png";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "review"] | order(_createdAt desc)[0..5] {
      author,
      text,
      rating,
      date,
      "avatarUrl": avatar.asset->url
    }`;

    client
      .fetch(query)
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Помилка завантаження відгуків:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={css.reviewsSection}>
        <div className='container'>
          <p className={css.loadingText}>Завантаження відгуків...</p>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className={css.reviewsSection} id='reviews'>
      <div className='container'>
        <h2 className={css.sectionTitle}>Відгуки наших клієнтів</h2>

        <div className={css.reviewsSlider}>
          {reviews.map((rev, i) => (
            <div key={i} className={css.reviewCard}>
              <div className={css.reviewHeader}>
                <div className={css.avatarWrapper}>
                  <img src={rev.avatarUrl || googlePlaceholder} alt={rev.author} className={css.reviewAvatar} />
                  <span className={css.googleBadge}>G</span>
                </div>
                <div className={css.authorMeta}>
                  <h4 className={css.authorName}>{rev.author}</h4>
                  <span className={css.reviewDate}>{rev.date}</span>
                </div>
              </div>

              <div className={css.starsRow}>
                {[...Array(Number(rev.rating) || 5)].map((_, index) => (
                  <Star key={index} fill='#fbbc04' stroke='#fbbc04' size={16} />
                ))}
              </div>

              <p className={css.reviewText}>– {rev.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
