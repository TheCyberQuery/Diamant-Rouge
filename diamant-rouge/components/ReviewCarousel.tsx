// components/ReviewCarousel.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Don't forget autoplay CSS

// Define the shape of a review
export interface Review {
    id: string;
    reviewerName: string;
    rating: number; // number between 1 and 5
    reviewText: string;
    date: string; // e.g. "Jan 16, 2024"
}

interface ReviewCarouselProps {
    reviews: Review[];
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews }) => {
    return (
        <div className="review-carousel bg-richEbony text-softIvory py-12">
            <h2 className="text-4xl font-serif text-center mb-8">Vos Avis</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                        <div className="max-w-3xl mx-auto px-4 text-center">
                            <p className="mb-4 italic">"{review.reviewText}"</p>
                            <p className="font-bold">{review.reviewerName}</p>
                            <p className="text-sm">{review.date}</p>
                            <div className="flex justify-center mt-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < review.rating ? 'text-royalGold' : 'text-gray-500'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.05 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ReviewCarousel;
