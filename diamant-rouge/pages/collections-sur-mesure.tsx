// pages/collections-sur-mesure.tsx
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

// A sample product tile component (desktop version)
interface ProductTileProps {
    imageUrl: string
    title: string
    subtitle: string
    price: string
    link: string
}

const ProductTile: FC<ProductTileProps> = ({ imageUrl, title, subtitle, price, link }) => {
    return (
        <div className="relative productsTileSingle">
            <div className="productsTileSingleImgWrap">
                <Link legacyBehavior href={link} passHref>
                    <a>
                        <Image
                            src={imageUrl}
                            alt={title}
                            layout="responsive"
                            width={1080}
                            height={1080}
                            className="proImg"
                        />
                    </a>
                </Link>
            </div>
            <div className="productsTileSingleOverlay absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent transition-opacity duration-300">
                <div className="titleGroup">
                    <p className="titleGroup-title text-white text-xl font-semibold">{title}</p>
                    <p className="titleGroup-subtitle text-white">{subtitle}</p>
                    <p className="titleGroup-price text-white">{price}</p>
                </div>
                <Link legacyBehavior href={link} passHref>
                    <a className="proButton mt-2 inline-block bg-white text-black px-4 py-2 rounded">
                        découvrir
                    </a>
                </Link>
            </div>
        </div>
    )
}

// A sample review item component
interface ReviewItemProps {
    reviewer: string
    note: string
    reviewDate: string
    reviewText: string
}

const ReviewItem: FC<ReviewItemProps> = ({ reviewer, note, reviewDate, reviewText }) => {
    return (
        <div className="reviewItem p-4 bg-white shadow-md">
            <h5 className="font-bold">{reviewer}</h5>
            <div className="rateSingle flex items-center text-sm my-1">
                <span className="reviewNote mr-2">NOTE : {note}</span>
                <img
                    src="https://amantys.fr/wp-content/uploads/2024/06/starFull.svg"
                    alt="star"
                    className="h-4 w-auto"
                />
                <span className="reviewDate ml-2 text-gray-600">{reviewDate}</span>
            </div>
            <p className="mt-2 text-gray-800">{reviewText}</p>
        </div>
    )
}

export default function CollectionsSurMesure() {
    return (
        <>
            <NextSeo
                title="Toutes les créations sur-mesure | Diamant Rouge"
                description="Découvrez toutes les créations sur-mesure de Diamant Rouge, réalisées par l’Atelier Amantys, des bijoux uniques et personnalisables."
            />
            {/* SECTION: HERO */}
            <section id="showroomHero" className="relative">
                {/* Desktop version */}
                <div className="hidden md:flex">
                    <div className="flex">
                        <div className="showroomCol flex-1">
                            <Image
                                src="https://amantys.fr/wp-content/uploads/2024/07/pac_bdf_sur_cou_400_san_ros_5_header_desktop.jpg"
                                alt="Showroom Image 1"
                                layout="responsive"
                                width={960}
                                height={1080}
                            />
                        </div>
                        <div className="showroomCol flex-1">
                            <Image
                                src="https://amantys.fr/wp-content/uploads/2024/07/amantys_atelier_bague_diamant_sur_mesure_3_header_desktop.jpg"
                                alt="Showroom Image 2"
                                layout="responsive"
                                width={960}
                                height={1080}
                            />
                        </div>
                    </div>
                </div>
                {/* Mobile version */}
                <div className="md:hidden flex">
                    <div className="showroomCol flex-1">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2024/07/pac_bdf_sur_cou_400_san_ros_5_header_mobile.jpg"
                            alt="Showroom Mobile Image 1"
                            layout="responsive"
                            width={780}
                            height={725}
                        />
                    </div>
                    <div className="showroomCol flex-1">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2024/07/amantys_atelier_bague_diamant_sur_mesure_3_header_mobile.jpg"
                            alt="Showroom Mobile Image 2"
                            layout="responsive"
                            width={780}
                            height={725}
                        />
                    </div>
                </div>
                {/* Overlay text on top of the hero */}
                <div className="showroomOverlay absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h2 className="text-4xl font-bold text-center">
                        Bijoux<br />sur-mesure
                    </h2>
                    <Link legacyBehavior href="#engagementRingsWrap" passHref>
                        <a className="mt-4 px-6 py-3 border border-white rounded">
                            découvrir les créations
                        </a>
                    </Link>
                </div>
            </section>

            {/* SECTION: ENGAGEMENT / COLLECTIONS */}
            <section id="engagementRingsWrap" className="py-16">
                <div className="container mx-auto px-4">
                    <hgroup className="mb-8 text-center">
                        <h3 className="text-3xl font-serif">
                            Créations de<br />
                            <em className="italic">l’Atelier Amantys</em>
                        </h3>
                    </hgroup>
                    <p className="text-center mb-8">
                        Découvrez et appréciez la <strong>diversité</strong> et la <strong>créativité</strong> des clients Diamant Rouge au travers de créations uniques et personnalisables. Chaque projet est le fruit d’une <strong>collaboration</strong> entre inspiration et expertise de nos <strong>Designer Bijoux</strong>.
                    </p>
                    {/* Filter menu (desktop version) */}
                    <div className="workshopCreationFilter mb-8">
                        <ul className="flex justify-center gap-4">
                            <li data-jewel-id="178" className="active">
                                <Link legacyBehavior href="#">
                                    <a className="flex flex-col items-center">
                                        <Image
                                            src="https://amantys.fr/wp-content/uploads/2024/05/cat-01.png"
                                            alt="Toutes Les Créations"
                                            width={120}
                                            height={120}
                                        />
                                        <span>Toutes Les Créations</span>
                                    </a>
                                </Link>
                            </li>
                            <li data-jewel-id="143">
                                <Link legacyBehavior href="#">
                                    <a className="flex flex-col items-center">
                                        <Image
                                            src="https://amantys.fr/wp-content/uploads/2024/05/cat-02.png"
                                            alt="Bagues de fiançailles"
                                            width={120}
                                            height={120}
                                        />
                                        <span>Bagues de fiançailles</span>
                                    </a>
                                </Link>
                            </li>
                            {/* Additional categories would follow here */}
                        </ul>
                    </div>

                    {/* PRODUCTS GRID (desktop) */}
                    <div className="productsTileWraps grid grid-cols-3 gap-4 hidden md:grid" id="filterProductWrap">
                        <ProductTile
                            imageUrl="https://amantys.fr/wp-content/uploads/2024/06/pac_bdf_sur_ron_100_dem_bla_1_desktop.jpg"
                            title="Inspiration Florale"
                            subtitle="Rond"
                            price="À partir de 14050 €"
                            link="/bague-diamant-sur-mesure-rose"
                        />
                        <ProductTile
                            imageUrl="https://amantys.fr/wp-content/uploads/2024/06/clo_bdf_del_cou_250_com_bla_5_desktop.jpg"
                            title="Inspiration Délicate Signature II"
                            subtitle="Coussin"
                            price="À partir de 37260 €"
                            link="/bague-diamant-sur-mesure-delicate-signature-diamant-jaune"
                        />
                        <ProductTile
                            imageUrl="https://amantys.fr/wp-content/uploads/2024/11/clo_bdf_flo_ron_100_dem_bla_2_desktop.jpg"
                            title="Florale Haute Joaillerie"
                            subtitle="Rond"
                            price="À partir de 16500 €"
                            link="/bague-diamant-brillant-florale-haute-joaillerie"
                        />
                        {/* More product tiles can be added here */}
                    </div>
                    {/* For mobile you could also create a similar grid */}
                    <div className="productsTileWraps grid grid-cols-2 gap-4 md:hidden" id="filterProductWrapMobile">
                        {/* Mobile product tiles can be rendered here */}
                    </div>
                </div>
            </section>

            {/* SECTION: SERVICE SUR-MESURE */}
            <section
                className="serviceSection relative my-8"
                style={{
                    backgroundImage:
                        'url(https://amantys.fr/wp-content/uploads/2024/06/pac_bdf_art_cou_300_dem_bla_3_desktop.jpg)',
                    height: '450px',
                    backgroundSize: 'cover'
                }}
            >
                <div className="stewardshipCourseOverlay absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
                    <h3 className="text-3xl font-bold mb-4">Service sur-mesure</h3>
                    <p className="mb-4">
                        La Maison Diamant Rouge propose à ses clients de <strong>modéliser</strong> leur création{' '}
                        <strong>en 3D</strong>, de <strong>l’imprimer</strong> en Cire et d’obtenir un{' '}
                        <strong>dessin gouaché</strong>, dans la pure tradition de la Haute-Joaillerie.
                    </p>
                    <Link legacyBehavior href="/creer-un-bijou-en-diamant-sur-mesure" passHref>
                        <a className="mt-2 px-6 py-3 border border-white rounded">découvrir le service</a>
                    </Link>
                </div>
            </section>

            {/* SECTION: EXPLORE TOUTES LES POSSIBILITÉS */}
            <section className="exploreAll py-16">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-serif text-center mb-8">
                        Explorer toutes<br />les possibilités
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Link legacyBehavior href="/haute-joaillerie-bijoux-diamants" passHref>
                            <a
                                className="exploreItem hidden md:block relative w-full md:w-1/3 h-48"
                                style={{
                                    backgroundImage:
                                        'url(https://amantys.fr/wp-content/uploads/2024/06/pac_bag_par_eme_490_dem_bla_4_desktop.jpg)',
                                    backgroundSize: 'cover'
                                }}
                            >
                                <div className="exploreOverlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <p className="text-white text-lg">Bagues Haute Joaillerie</p>
                                </div>
                            </a>
                        </Link>
                        <Link legacyBehavior href="/alliances" passHref>
                            <a
                                className="exploreItem hidden md:block relative w-full md:w-1/3 h-48"
                                style={{
                                    backgroundImage:
                                        'url(https://amantys.fr/wp-content/uploads/2024/06/mat_bdf_del_ron_070_dem_ros_1.jpg)',
                                    backgroundSize: 'cover'
                                }}
                            >
                                <div className="exploreOverlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <p className="text-white text-lg">Alliances pour elle</p>
                                </div>
                            </a>
                        </Link>
                        <Link legacyBehavior href="/bague-de-fiancailles" passHref>
                            <a
                                className="exploreItem hidden md:block relative w-full md:w-1/3 h-48"
                                style={{
                                    backgroundImage:
                                        'url(https://amantys.fr/wp-content/uploads/2024/06/clo_bdf_ino_ron_100_dem_bla_10.jpg)',
                                    backgroundSize: 'cover'
                                }}
                            >
                                <div className="exploreOverlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <p className="text-white text-lg">Bagues de fiançailles intemporelles</p>
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
