// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-brandIvory text-richEbony">
            {/* Modern Minimal Newsletter Section */}
            <section className="py-20 border-b border-black text-center bg-burgundy">
                <div className="max-w-xl mx-auto px-4">
                    <h2 className="text-4xl font-serif font-bold mb-6 text-diamondWhite">
                        Le courrier des Joailliers
                    </h2>
                    <p className="mb-10 text-xl text-diamondWhite">
                        Recevez toutes les <strong>actualités Diamant Rouge</strong> ainsi que{" "}
                        <strong>des invitations exclusives</strong> aux évènements.
                    </p>
                    <form
                        action="https://diamantrouge.com/?na=s"
                        method="post"
                        className="max-w-md mx-auto"
                    >
                        {/* Container with only a fine bottom border */}
                        <div className="relative flex items-center border-b-2 border-diamondWhite">
                            <input
                                type="email"
                                name="ne"
                                placeholder="VOTRE EMAIL"
                                required
                                className="w-full bg-transparent text-xs text-diamondWhite placeholder-diamondWhite py-3 focus:outline-none focus:ring-0 border-none"
                            />
                            <button type="submit" className="ml-4 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-diamondWhite hover:text-burgundy transition"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Property Icons Section */}
            <section className="py-16 border-b border-black bg-diamondWhite">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 md:divide-x md:divide-black">
                    <div className="flex flex-col items-center px-4">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2023/07/Diamant-Brillant-1.svg"
                            alt="Diamants naturels éthiques et certifiés GIA"
                            width={45}
                            height={45}
                        />
                        <p className="mt-4 text-lg text-center">
                            Diamants naturels éthiques
                            <br />
                            et certifiés GIA
                        </p>
                    </div>
                    <div className="flex flex-col items-center px-4">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2023/07/Or-18K-1.svg"
                            alt="Or 18K recyclé, spécial Haute-Joaillerie"
                            width={53}
                            height={22}
                        />
                        <p className="mt-4 text-lg text-center">
                            Or 18K recyclé,
                            <br />
                            spécial Haute-Joaillerie
                        </p>
                    </div>
                    <div className="flex flex-col items-center px-4">
                        <Image
                            src="https://amantys.fr/wp-content/uploads/2023/07/Bague-1.svg"
                            alt="40% moins onéreux que les joailliers de la Place Vendôme"
                            width={34}
                            height={46}
                        />
                        <p className="mt-4 text-lg text-center">
                            40% moins onéreux que les
                            <br />
                            joailliers de la Place Vendôme.
                        </p>
                    </div>
                </div>
            </section>

            {/* REVIEWS SECTION */}
            <section className="inner-section review-section py-12 border-b border-black ">
                <div className="max-w-4xl mx-auto text-center">
                    <h5 className="text-3xl font-serif">Vos avis</h5>
                    <p className="mt-4 text-lg text-gray-600">NOTE GENERALE GOOGLE</p>
                    <ul className="flex justify-center items-center space-x-4 mt-2">
                        <li className="text-2xl font-bold">4,9/5</li>
                        <li>
                            <img
                                src="https://amantys.fr/wp-content/uploads/2024/06/reviewStar.svg"
                                alt="Stars"
                                className="h-4 w-auto"
                            />
                        </li>
                    </ul>
                </div>
                <div className="mt-8 max-w-6xl mx-auto">
                    {/* Here you can implement your carousel; for demonstration, we show static review items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                name: "Mitchell Brinkman",
                                rating: "5/5",
                                date: "la semaine dernière",
                                review:
                                    "Amantys offre un savoir-faire haut de gamme, du professionnalisme et une expérience raffinée mais accessible. L’équipe, en particulier Marie, a travaillé sans relâche pour donner vie à un projet spécial pour ma fiancée et moi. La gentillesse et la richesse des connaissances de Marie étaient évidentes alors qu’elle expliquait tout le processus.",
                            },
                            {
                                name: "Wendy Anani",
                                rating: "5/5",
                                date: "la semaine dernière",
                                review:
                                    "Un grand merci à l’équipe d’Amantys Paris pour cette expérience inoubliable ! J’ai été accueillie chaleureusement dès mon arrivée pour un essayage de bague de fiançailles. Ma bague est tout simplement sublime, exactement ce dont je rêvais.",
                            },
                        ].map((item, idx) => (
                            <div key={idx} className=" p-6 ">
                                <h5 className="text-xl font-serif">{item.name}</h5>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-base font-medium">NOTE : {item.rating}</span>
                                    <span className="text-sm text-gray-500">{item.date}</span>
                                </div>
                                <p className="mt-4 text-gray-700">{item.review}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Footer Navigation */}
            <section className="py-16 border-b border-black">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Branding / Logo */}
                    <div className="flex items-center justify-center">
                        <Image
                            src="/images/2.png"
                            alt="Diamant Rouge"
                            width={203}
                            height={25}
                            className="object-contain"
                        />
                    </div>
                    {/* Boutiques */}
                    <div>
                        <h2 className="font-bold mb-3 text-xl text-brandGold">BOUTIQUES</h2>
                        <p className="text-lg leading-relaxed">
                            <Link
                                href="https://www.google.com/maps/place/"
                                className="hover:text-brandGold transition-colors"
                            >
                                PARIS – 5 Rue de l’Échelle, 75001
                            </Link>
                            <br />
                            <Link
                                href="https://www.google.com/maps/place/"
                                className="hover:text-brandGold transition-colors"
                            >
                                BORDEAUX – 4/6 Cours de l’Intendance, 33000
                            </Link>
                        </p>
                    </div>
                    {/* Contact */}
                    <div>
                        <h2 className="font-bold mb-3 text-xl text-brandGold">CONTACT</h2>
                        <p className="text-lg mb-2">
                            <Link
                                href="tel:33 1 89 71 55 76"
                                className="hover:text-brandGold transition-colors"
                            >
                                Nous téléphoner
                            </Link>
                        </p>
                        <p className="text-lg mb-2">
                            <Link
                                href="https://api.whatsapp.com/send/?phone=744094495"
                                className="hover:text-brandGold transition-colors"
                            >
                                Échanger par WhatsApp
                            </Link>
                        </p>
                        <p className="text-lg">
                            <Link
                                href="mailto:contact@diamantrouge.com"
                                className="hover:text-brandGold transition-colors"
                            >
                                contact@diamantrouge.com
                            </Link>
                        </p>
                    </div>
                    {/* À Propos */}
                    <div>
                        <h2 className="font-bold mb-3 text-xl text-brandGold">À PROPOS</h2>
                        <p className="text-lg mb-2">
                            <Link
                                href="/conditions-de-vente"
                                className="hover:text-brandGold transition-colors"
                            >
                                Conditions de vente
                            </Link>
                        </p>
                        <p className="text-lg">
                            <Link
                                href="/mentions-legales"
                                className="hover:text-brandGold transition-colors"
                            >
                                Mentions légales
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Social & Appointment */}
            <section className="py-12 border-b border-black">
                <div className="w-full px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 flex flex-col md:flex-row items-center justify-between">
                    {/* Social Media Block */}
                    <div className="flex flex-col items-center">
                        <p className="text-lg uppercase tracking-wide mb-2">Suivez-nous</p>
                        <ul className="flex items-center space-x-4">
                            <li>
                                <Link href="https://www.pinterest.fr/DiamantRougeJoaillerie/">
                                    <Image
                                        src="https://amantys.fr/wp-content/uploads/2023/07/Path-2.svg"
                                        alt="Pinterest"
                                        width={15}
                                        height={20}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.facebook.com/diamantrouge">
                                    <Image
                                        src="https://amantys.fr/wp-content/uploads/2023/07/Path-1.svg"
                                        alt="Facebook"
                                        width={12}
                                        height={22}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.instagram.com/diamantrouge_joaillerie/">
                                    <Image
                                        src="https://amantys.fr/wp-content/uploads/2023/07/insta.svg"
                                        alt="Instagram"
                                        width={20}
                                        height={20}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.tiktok.com/@diamantrouge">
                                    <Image
                                        src="https://amantys.fr/wp-content/uploads/2023/07/tiktok.svg"
                                        alt="TikTok"
                                        width={14}
                                        height={22}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.youtube.com/diamantrouge">
                                    <Image
                                        src="https://amantys.fr/wp-content/uploads/2023/07/Youtube.svg"
                                        alt="YouTube"
                                        width={30}
                                        height={22}
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Appointment */}
                    <div>
                        <Link
                            href="/rendez-vous"
                            className="flex items-center transition-colors hover:text-brandGold"
                        >
                            <Image
                                src="https://amantys.fr/wp-content/uploads/2023/07/Calendrier-1.svg"
                                alt="Prendre rendez-vous"
                                width={24}
                                height={27}
                            />
                            <span className="ml-3 text-lg">Prendre rendez-vous</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bottom Copyright */}
            <div className="bg-burgundy py-4">
                <div className="text-center text-xs text-diamondWhite">
                    © {currentYear} Diamant Rouge. The House of Eternal Luxury.
                </div>
            </div>
        </footer>
    );
}
