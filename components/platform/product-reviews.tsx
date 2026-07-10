interface ReviewItem {
  author: string;
  quote: string;
  rating?: number;
  date?: string;
}

interface ProductReviewsProps {
  reviews?: ReviewItem[];
}

function formatReviewDate(date?: string) {
  if (!date) {
    return null;
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <section className="px-4 py-4 text-white md:px-0" aria-labelledby="product-reviews-title">
        <div className="mx-auto max-w-[430px] rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,18,20,0.96),rgba(8,8,10,0.98))] px-5 py-6 text-center text-sm text-white/55">
          <h2 id="product-reviews-title" className="text-lg font-semibold text-white">
            รีวิวจากลูกค้า
          </h2>
          <p className="mt-2">รีวิวจากลูกค้าจะปรากฏที่นี่เมื่อมีข้อมูลพร้อมแสดงผล</p>
        </div>
      </section>
    );
  }

  const ratings = reviews
    .map((review) => review.rating)
    .filter((rating): rating is number => typeof rating === 'number');
  const reviewCount = reviews.length;
  const average = ratings.length > 0
    ? Number((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1))
    : null;
  const aggregateLabel = average
    ? `คะแนนเฉลี่ย ${average} จาก 5 ดาว จาก ${reviewCount} รีวิว`
    : `มีรีวิวจากลูกค้า ${reviewCount} รายการ`;

  return (
    <section className="px-4 py-4 text-white md:px-0" aria-labelledby="product-reviews-title">
      <div className="mx-auto max-w-[430px] rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_30%),linear-gradient(180deg,rgba(22,22,26,0.96),rgba(8,8,10,0.99))] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/45">
              Reviews
            </p>
            <h2
              id="product-reviews-title"
              className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-white"
            >
              รีวิวจากลูกค้า
            </h2>
            <p className="mt-1 text-[13px] leading-5 text-white/64">
              ใช้ข้อมูลรีวิวจริงจากหน้าสินค้าเพื่อช่วยให้ตัดสินใจได้อย่างมั่นใจมากขึ้น
            </p>
            <p className="mt-1 text-[11px] leading-4 text-white/42">
              เลื่อนในแนวนอนเพื่อดูรีวิวเพิ่มเติม
            </p>
          </div>

          <div
            className="shrink-0 rounded-[18px] border border-white/10 bg-white/[0.04] px-3 py-2 text-right"
            aria-label={aggregateLabel}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/45">Average</div>
            <div className="mt-1 text-[30px] font-semibold leading-none tracking-[-0.04em] text-white">
              {average ?? '-'}
            </div>
            <div className="mt-1 flex justify-end gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => {
                const filled = average !== null && index < Math.round(average);

                return (
                  <span
                    key={index}
                    className={filled ? 'text-yellow-400' : 'text-white/18'}
                  >
                    ★
                  </span>
                );
              })}
            </div>
            <div className="mt-1 text-[11px] text-white/55">{reviewCount} รีวิว</div>
          </div>
        </div>

        <div
          className="scrollbar-none -mx-1 mt-3.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 [overscroll-behavior-inline:contain]"
          aria-label="รีวิวจากลูกค้า เลื่อนในแนวนอนเพื่อดูรีวิวเพิ่มเติม"
          tabIndex={0}
        >
          {reviews.map((review, index) => {
            const formattedDate = formatReviewDate(review.date);
            const rating = review.rating;
            const ratingLabel = typeof rating === 'number'
              ? `${rating} จาก 5 ดาว`
              : 'ไม่มีข้อมูลคะแนน';

            return (
              <article
                key={`${review.author}-${index}`}
                className="w-[84%] shrink-0 snap-start rounded-[20px] border border-white/10 bg-white/[0.05] p-3"
                aria-label={`รีวิวจาก ${review.author}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium tracking-tight text-white">{review.author}</p>
                    {formattedDate && (
                      <time
                        className="mt-1 block text-[11px] text-white/45"
                        dateTime={review.date}
                      >
                        {formattedDate}
                      </time>
                    )}
                  </div>

                  {typeof rating === 'number' && (
                    <div className="shrink-0 text-right" aria-label={ratingLabel}>
                      <div className="flex justify-end gap-1 text-sm text-yellow-400" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <span
                            key={starIndex}
                            className={starIndex < rating ? 'text-yellow-400' : 'text-white/18'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="mt-1 text-[11px] text-white/55">{ratingLabel}</p>
                    </div>
                  )}
                </div>

                <p className="mt-2 text-[13px] leading-5 text-white/84">
                  {review.quote}
                </p>
              </article>
            );
          })}
        </div>

        <p className="mt-2.5 text-[11px] leading-4 text-white/42">
          คะแนนเฉลี่ยคำนวณจากรีวิวที่แสดงอยู่ในส่วนนี้เท่านั้น
        </p>
      </div>
    </section>
  );
}
