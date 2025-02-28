// pages/haute-joaillerie.tsx
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function HauteJoailleriePage() {
    // Array of Fine Jewelry images
    const fineJewelryImages = [
        "https://amantys.fr/wp-content/uploads/2024/11/AMANTYS_STUDIO-41-HJO.jpg",
        "https://amantys.fr/wp-content/uploads/2024/04/pac_bag_par_eme_490_dem_bla_3.jpg",
        "https://amantys.fr/wp-content/uploads/2024/11/AMANTYS_STUDIO-52-HJO.jpg",
        "https://amantys.fr/wp-content/uploads/2024/10/pac_bdf_del_ova_060_dem_bla_2-1.jpg",
        "https://amantys.fr/wp-content/uploads/2024/10/clo_bdf_art_cou_300_dem_bla_1.jpg",
        "https://amantys.fr/wp-content/uploads/2024/04/pac_bdf_ecl_ron_050_dem_bla_4.jpg",
        "https://amantys.fr/wp-content/uploads/2024/10/clo_bdf_flo_ron_100_dem_bla_7.jpg",
    ]

    return (
        <>
            <NextSeo
                title="Diamant Rouge | Amantys"
                description="Découvrez l'univers de Diamant Rouge par Amantys – des créations d'exception façonnées à la main par des artisans joailliers."
            />

            {/* HERO SECTION */}
            <section className="relative h-screen overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source
                        src="https://amantys.fr/wp-content/uploads/2024/06/vip_diamant_brillant_facettes_1.webm"
                        type="video/webm"
                    />
                </video>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
                    <div className="w-full max-w-6xl px-4">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2024/11/AMANTYS_STUDIO-53_desktop.jpg"
                            alt="Diamant Rouge Background"
                            layout="responsive"
                            width={1000}
                            height={600}
                            objectFit="cover"
                            className="rounded-lg shadow-regal"
                        />
                        <h2 className="mt-8 text-5xl md:text-7xl font-serif tracking-wide text-brandGold text-center">
                            Diamant Rouge
                        </h2>
                    </div>
                </div>
            </section>

            {/* FINE JEWELRY SECTION – FULL WIDTH SWIPER CAROUSEL */}
            <section className="py-12">
                <div className="text-center px-4">
                    <h5 className="text-3xl font-serif">Bijoux Diamant Rouge</h5>
                    <p className="mt-4 text-lg text-platinumGray max-w-4xl mx-auto">
                        Garants d’une <em>tradition ancestrale</em>, nos artisans joailliers conçoivent des créations aussi <em>raffinées</em> que <em>scintillantes</em>. <em>Minutie</em> et <em>exigence</em> sont au coeur de la démarche de joaillerie de luxe de la Maison Amantys.
                    </p>
                </div>
                <div className="mt-12 w-full">
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {fineJewelryImages.map((src, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="overflow-hidden rounded-lg shadow-luxury mx-4">
                                    <Image
                                        src={src}
                                        alt={`Création Bijou ${idx + 1}`}
                                        layout="responsive"
                                        width={845}
                                        height={1080}
                                        objectFit="cover"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* HIGH JEWELRY VIDEO ROW – UPS */}
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center">
                        <video autoPlay loop muted playsInline className="w-full rounded-lg shadow-subtle">
                            <source
                                src="https://amantys.fr/wp-content/uploads/2024/09/vid_amantys_atelier_bijou_diamants_sur_mesure_3.webm"
                                type="video/webm"
                            />
                        </video>
                        <div className="mt-4 text-center">
                            <h5 className="text-xl font-serif">TRADITION JOAILLIÈRE</h5>
                            <p className="text-base text-platinumGray">
                                Chaque création est façonnée à la main dans l’Atelier de la Maison Amantys par nos artisans joailliers expérimentés.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <video autoPlay loop muted playsInline className="w-full rounded-lg shadow-subtle">
                            <source
                                src="https://amantys.fr/wp-content/uploads/2024/09/vid_ajustement_diamant_delicate_poire_1.webm"
                                type="video/webm"
                            />
                        </video>
                        <div className="mt-4 text-center">
                            <h5 className="text-xl font-serif">TECHNOLOGIE DE POINTE</h5>
                            <p className="text-base text-platinumGray">
                                La CAO (Conception Assistée par Ordinateur) et la Cire 3D permettent à chacun de se projeter.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <video autoPlay loop muted playsInline className="w-full rounded-lg shadow-subtle">
                            <source
                                src="https://amantys.fr/wp-content/uploads/2024/09/vid_bdf_ino_ron_100_dem_bla_1.webm"
                                type="video/webm"
                            />
                        </video>
                        <div className="mt-4 text-center">
                            <h5 className="text-xl font-serif">DIAMANTS UNIQUES</h5>
                            <p className="text-base text-platinumGray">
                                Experts du diamant, nos Gemmologues sélectionnent uniquement les joyaux les plus scintillants, dans les codes de la joaillerie de luxe.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BAGUES EN DIAMANTS SECTION */}
            <section
                className="py-20 text-white bg-cover"
                style={{ backgroundImage: "url('https://amantys.fr/wp-content/uploads/2024/11/AMANTYS_STUDIO-36_desktop.jpg')" }}
            >
                <div className="bg-black bg-opacity-50 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-4xl font-serif">
                            Bagues
                            <br />
                            <em className="italic">en diamants</em>
                        </h3>
                        <div className="my-8 flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-white opacity-50"></div>
                        </div>
                        <p className="text-lg text-platinumGray">
                            La Maison Amantys conçoit, <strong>avec ses clients</strong>, des créations joaillières d’exception. Les bagues haute joaillerie sont le reflet du savoir-faire ancestral de nos artisans. Confectionnées à la main avec les dernières techniques joaillières, elles se transmettent de générations en générations.
                        </p>
                        <div className="mt-6">
                            <a
                                href="/creations-bijoux-sur-mesure-atelier"
                                className="inline-block border border-white text-white font-medium px-6 py-3 rounded-full transition-colors hover:bg-white hover:text-brandGold"
                            >
                                découvrir les créations
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* DISCOVER HIGH JEWELRY – FIRST */}
            <section
                className="py-20 bg-brandIvory"
                style={{ backgroundImage: "url('https://amantys.fr/wp-content/uploads/2024/04/pac_dia_eme_fond_1_desktop.jpg')" }}
            >
                <div className="py-16">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="text-center">
                            <Image
                                src="https://amantys.fr/wp-content/uploads/2024/07/pac_bag_bri_bag_400_dem_bla_mobile.jpg"
                                alt="Création Bague"
                                layout="responsive"
                                width={720}
                                height={1280}
                                className="rounded-lg shadow-deepGlow"
                            />
                            <div className="mt-4">
                                <a
                                    href="/bague-diamant-sur-mesure-baguette"
                                    className="inline-block border border-brandGold text-brandGold font-semibold px-4 py-2 rounded-full transition-colors hover:bg-brandGold hover:text-richEbony"
                                >
                                    découvrir la création
                                </a>
                            </div>
                        </div>
                        <div className="text-center">
                            <Image
                                src="https://amantys.fr/wp-content/uploads/2024/04/clo_bag_par_eme_070_dem_bla_3.jpg"
                                alt="Création Alliance"
                                layout="responsive"
                                width={845}
                                height={1080}
                                className="rounded-lg shadow-deepGlow"
                            />
                            <div className="mt-4">
                                <a
                                    href="/alliance-haute-joaillerie-parfaite-emeraude"
                                    className="inline-block border border-brandGold text-brandGold font-semibold px-4 py-2 rounded-full transition-colors hover:bg-brandGold hover:text-richEbony"
                                >
                                    découvrir la création
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COLLIERS SECTION */}
            <section
                className="py-20 text-white bg-cover"
                style={{ backgroundImage: "url('https://amantys.fr/wp-content/uploads/2024/11/AMANTYS_STUDIO-27_desktop.jpg')" }}
            >
                <div className="bg-black bg-opacity-50 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-4xl font-serif text-right">
                            Colliers
                            <br />
                            <em>Haute-Joaillerie</em>
                        </h3>
                        <div className="my-8 flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-white opacity-50"></div>
                        </div>
                        <p className="text-lg text-platinumGray">
                            Nos artisans joailliers maîtrisent à la perfection la technique du sertissage pour des parures somptueuses. Chaque collier est modélisé aux côtés de chacun de nos clients pour des créations uniques et durables.
                        </p>
                        <div className="mt-6">
                            <a
                                href="/creations-bijoux-sur-mesure-atelier"
                                className="inline-block border border-white text-white font-medium px-6 py-3 rounded-full transition-colors hover:bg-white hover:text-brandGold"
                            >
                                voir les colliers
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* DISCOVER HIGH JEWELRY – SECOND */}
            <section
                className="py-20 bg-brandIvory"
                style={{
                    backgroundImage: "url('https://amantys.fr/wp-content/uploads/2024/04/pac_dia_eme_fond_1_desktop.jpg')",
                    backgroundPosition: "bottom",
                }}
            >
                <div className="py-16">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12">
                        <div className="text-center">
                            <Image
                                src="https://amantys.fr/wp-content/uploads/2024/03/pac_bra_art_070_san_ros_1_overlay.jpg"
                                alt="Création Bracelet"
                                layout="responsive"
                                width={1080}
                                height={1080}
                                className="rounded-lg shadow-deepGlow"
                            />
                            <div className="mt-4">
                                <a
                                    href="/bracelet-sur-mesure-riviere-art-deco"
                                    className="inline-block border border-brandGold text-brandGold font-semibold px-4 py-2 rounded-full transition-colors hover:bg-brandGold hover:text-richEbony"
                                >
                                    découvrir la création
                                </a>
                            </div>
                        </div>
                        <div className="text-center">
                            <Image
                                src="https://amantys.fr/wp-content/uploads/2024/03/Article-16.png"
                                alt="Création Collier"
                                layout="responsive"
                                width={720}
                                height={720}
                                className="rounded-lg shadow-deepGlow"
                            />
                            <div className="mt-4">
                                <a
                                    href="/collier-diamants-audacieux-3-poires"
                                    className="inline-block border border-brandGold text-brandGold font-semibold px-4 py-2 rounded-full transition-colors hover:bg-brandGold hover:text-richEbony"
                                >
                                    découvrir la création
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOUCLES D'OREILLES SECTION */}
            <section
                className="py-20 text-white bg-cover"
                style={{ backgroundImage: "url('https://amantys.fr/wp-content/uploads/2024/11/AMANTYS_STUDIO-17_desktop.jpg')" }}
            >
                <div className="bg-black bg-opacity-50 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-4xl font-serif">
                            Boucles
                            <br />
                            <em>d’oreilles</em>
                        </h3>
                        <div className="my-8 flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-white opacity-50"></div>
                        </div>
                        <p className="text-lg text-platinumGray">
                            Parmi les <strong>bijoux Haute-Joaillerie</strong> de la Maison Amantys, les boucles d’oreilles ont une place de choix. Serties avec <strong>minutie</strong> et <strong>délicatesse</strong>, leur <strong>éclat</strong> est unique.
                        </p>
                        <div className="mt-6">
                            <a
                                href="/creations-bijoux-sur-mesure-atelier"
                                className="inline-block border border-white text-white font-medium px-6 py-3 rounded-full transition-colors hover:bg-white hover:text-brandGold"
                            >
                                découvrir les boucles d’oreilles
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* DISCOVER HIGH JEWELRY – BOUCLES D'OREILLES */}
            <section
                className="py-20 bg-brandIvory"
                style={{
                    backgroundImage: "url('https://amantys.fr/wp-content/uploads/2024/04/pac_dia_eme_fond_1_desktop.jpg')",
                    backgroundPosition: "bottom",
                }}
            >
                <div className="py-16">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="text-center">
                            <Image
                                src="https://amantys.fr/wp-content/uploads/2024/06/pac_bou_del_ron_020_bla_2_desktop.jpg"
                                alt="Création Boucles d’oreilles Delicates"
                                layout="responsive"
                                width={1080}
                                height={1080}
                                className="rounded-lg shadow-deepGlow"
                            />
                            <div className="mt-4">
                                <a
                                    href="/boucles-doreilles-delicates"
                                    className="inline-block border border-brandGold text-brandGold font-semibold px-4 py-2 rounded-full transition-colors hover:bg-brandGold hover:text-richEbony"
                                >
                                    découvrir la création
                                </a>
                            </div>
                        </div>
                        <div className="text-center">
                            <Image
                                src="https://amantys.fr/wp-content/uploads/2024/06/clo_bou_cha_mar_053_bla_2_desktop.jpg"
                                alt="Création Boucles d’oreilles Charnelles"
                                layout="responsive"
                                width={720}
                                height={720}
                                className="rounded-lg shadow-deepGlow"
                            />
                            <div className="mt-4">
                                <a
                                    href="/boucles-doreilles-charnelles"
                                    className="inline-block border border-brandGold text-brandGold font-semibold px-4 py-2 rounded-full transition-colors hover:bg-brandGold hover:text-richEbony"
                                >
                                    découvrir la création
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICE SUR-MESURE VIDEO SECTION */}
            <section className="relative">
                <div className="banner-video hidden md:block">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source
                            src="https://amantys.fr/wp-content/uploads/2024/09/vid_bag_par_eme_490_dem_bla_3_desktop.webm"
                            type="video/webm"
                        />
                    </video>
                </div>
                <div className="categoryVideoOverlay absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h3 className="text-4xl font-serif text-white">
                        Service
                        <br />
                        sur-mesure
                    </h3>
                    <p className="mt-4 text-white max-w-2xl">
                        Accompagné.e par un <strong>Gemmologue</strong>, un <strong>Designer Bijou</strong> et un <strong>Joaillier</strong>, laissez-vous guider pas à pas pour créer votre propre bijou.
                    </p>
                    <p className="mt-4 text-white max-w-2xl">
                        Des croquis préparatoires, à la <strong>modélisation 3D</strong> en passant par le choix des <strong>diamants d’exception</strong>, rien n’est laissé au hasard pour donner vie à la création Diamant Rouge de vos rêves.
                    </p>
                    <div className="mt-6">
                        <a
                            href="/rendez-vous"
                            className="inline-block border border-white text-white font-medium px-6 py-3 rounded-full transition-colors hover:bg-white hover:text-brandGold"
                        >
                            prendre rendez-vous
                        </a>
                    </div>
                </div>
            </section>

            {/* DIAMANTS ÉTHIQUES EXCEPTIONNELS VIDEO ROW */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h5 className="text-3xl font-serif">DIAMANTS ÉTHIQUES EXCEPTIONNELS</h5>
                    <p className="mt-4 text-lg text-platinumGray">
                        En tant que marque de Haute Joaillerie à Paris, la Maison Amantys ne s’approvisionne qu’en diamants naturels éthiques, certifiés par le GIA, le laboratoire le plus exigeant du monde.
                    </p>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center">
                        <video autoPlay loop muted playsInline className="w-full rounded-lg shadow-subtle">
                            <source
                                src="https://amantys.fr/wp-content/uploads/2024/09/vid_bdf_tal_poi_400_dem_bla_1.webm"
                                type="video/webm"
                            />
                        </video>
                        <div className="mt-4 text-center">
                            <h5 className="text-xl font-serif">LE DIAMANT POIRE</h5>
                            <p className="text-base text-platinumGray">
                                Le client a sélectionné le modèle Talentueuse avec diamant taille Poire de 4,50 Carats. Une forme de diamant optimale pour maximiser la brillance et le volume.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <video autoPlay loop muted playsInline className="w-full rounded-lg shadow-subtle">
                            <source
                                src="https://amantys.fr/wp-content/uploads/2024/09/vip_diamant_brut_1.webm"
                                type="video/webm"
                            />
                        </video>
                        <div className="mt-4 text-center">
                            <h5 className="text-xl font-serif">LE DIAMANT BRUT</h5>
                            <p className="text-base text-platinumGray">
                                Le diamant brut est d’abord taillé au laser avant d’être facetté à la main par le Lapidaire. La qualité de taille est essentielle car elle garantit la brillance du diamant.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <video autoPlay loop muted playsInline className="w-full rounded-lg shadow-subtle">
                            <source
                                src="https://amantys.fr/wp-content/uploads/2024/09/vip_diamant_jaune_teasing_1.webm"
                                type="video/webm"
                            />
                        </video>
                        <div className="mt-4 text-center">
                            <h5 className="text-xl font-serif">LE DIAMANT JAUNE</h5>
                            <p className="text-base text-platinumGray">
                                Les nuances de Couleur du diamant jaune se mesurent sur une échelle indépendante allant de “Fancy Light” à Fancy Vivid”.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
