// components/HeroCarousel.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

/*
  Be sure to import the CSS for each module you use
  (in addition to the base 'swiper/css'):
*/
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

type HeroSlide = {
    imageSrc: string;
    heading: string;
    subheading?: string;
};

type HeroCarouselProps = {
    slides: HeroSlide[];
};

export default function HeroCarousel({ slides }: HeroCarouselProps) {
    return (
        <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="relative w-full h-[80vh]"
        >
            {slides.map((slide, i) => (
                <SwiperSlide key={i}>
                    <div
                        className="w-full h-full bg-center bg-cover flex items-center justify-center"
                        style={{ backgroundImage: `url(${slide.imageSrc})` }}
                    >
                        {/* Overlay */}
                        <div className="bg-black/40 absolute top-0 left-0 w-full h-full"></div>
                        <div className="relative z-10 text-center text-ivory px-4 max-w-3xl">
                            <h2 className="text-5xl font-serif mb-4">{slide.heading}</h2>
                            {slide.subheading && <p className="text-xl">{slide.subheading}</p>}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
