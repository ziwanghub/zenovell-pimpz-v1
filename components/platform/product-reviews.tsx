'use client';

interface ReviewItem {
  author: string;
  quote: string;
  rating?: number;
  date?: string;
}

interface ProductReviewsProps {
  reviews?: ReviewItem[];
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  // Safe empty state when rich content is absent
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-zinc-950 px-6 py-10 text-center text-sm text-white/50">
        Reviews data not available yet.
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-[430px]">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Reviews</h2>

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{review.author}</div>
                {review.rating && (
                  <div className="text-sm text-yellow-400">
                    {'★'.repeat(review.rating)}
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-white/80">“{review.quote}”</p>
              {review.date && (
                <p className="mt-2 text-xs text-white/50">{review.date}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
