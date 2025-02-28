// pages/rendezvous.tsx
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import Script from 'next/script'

const RendezVous: NextPage = () => {
    useEffect(() => {
        // Here you can initialize Bootstrap collapse/accordion functionality if needed.
        // For example:
        // const collapseEls = document.querySelectorAll('.accordion-collapse');
        // collapseEls.forEach((el) => new bootstrap.Collapse(el, { toggle: false }));
    }, [])

    return (
        <>
            {/* External scripts or inline script initialization can be added here if required */}
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />

            <div className="appointmentPage">
                {/* HERO SECTION */}
                <section className="HeroSliderSec relative">
                    {/* Desktop version image only */}
                    <Image
                        src="https://amantys.fr/wp-content/uploads/2024/04/clo_all_del_18_dem_ros_2.jpg"
                        alt="Hero Appointment"
                        layout="responsive"
                        width={1920}
                        height={1080}
                        className="showDesktop"
                    />
                    <div className="heroContentWrap absolute inset-0 flex flex-col justify-center items-center text-center">
                        <h2 className="uppercase tracking-widest text-3xl font-bold">
                            prendre rendez-vous
                        </h2>
                        <Link legacyBehavior href="#secReach" passHref>
                            <a className="mt-4 inline-block border border-black px-6 py-2 uppercase text-sm">
                                voir les disponibilités
                            </a>
                        </Link>
                    </div>
                </section>

                {/* EXPERT GREETING SECTION */}
                <section className="withoutIntermediaries py-8">
                    <div className="appointmentContainer mx-auto px-4 text-center">
                        <h5 className="text-xl font-semibold mb-2">
                            Un expert Gemmologue dédié vous accueille
                        </h5>
                        <p className="text-base">
                            Quel que soit votre projet, un Gemmologue de la Maison Joaillière vous est attitré.
                            Lors d’un rendez-vous chez Amantys, nous prenons le temps de vous accueillir et de vous écouter
                            pour mieux vous accompagner.
                        </p>
                    </div>
                </section>

                {/* APPOINTMENT FORM SECTION */}
                <section className="appointmentFormSec py-12" id="secReach">
                    <div className="appointmentContainer mx-auto px-4">
                        {/* Experience intro – for mobile only, desktop duplicates are already in the left column */}
                        <div className="experienceTitleWrap md:hidden text-center mb-8">
                            <h2 className="text-2xl font-bold">L’expérience Amantys</h2>
                            <p className="text-base">
                                C’est avant tout un <strong>parcours immersif</strong> au cours duquel chaque client{' '}
                                <strong>observe, touche</strong> et <strong>comprend</strong> de vrais{' '}
                                <strong>diamants naturels certifiés.</strong>
                            </p>
                        </div>
                        <div className="appointmentRow flex flex-col md:flex-row gap-8">
                            {/* Left Column: Appointment Data Images */}
                            <div className="appointmentDataImages md:w-1/2">
                                <h2 className="text-2xl font-bold mb-4">L’expérience Amantys</h2>
                                <p className="mb-4 text-base">
                                    C’est avant tout un <strong>parcours immersif</strong> au cours duquel chaque client{' '}
                                    <strong>observe, touche</strong> et <strong>comprend</strong> de vrais{' '}
                                    <strong>diamants naturels certifiés.</strong>
                                </p>
                                <div className="appImagesRow grid grid-cols-3 gap-4 mb-4">
                                    <div className="img1 showDesktop">
                                        <Image
                                            src="https://amantys.fr/wp-content/uploads/2024/10/amantys_showroom_paris_gemmologie_couleur_1_blog.jpg"
                                            alt="Showroom Paris Gemmologie"
                                            layout="responsive"
                                            width={500}
                                            height={400}
                                        />
                                    </div>
                                    <div className="img2 showDesktop">
                                        <div
                                            className="bg-cover bg-center h-full w-full"
                                            style={{
                                                backgroundImage:
                                                    "url('https://amantys.fr/wp-content/uploads/2024/04/amantys_salle_gemmologie_diamant_rond_clarte_1.jpg')",
                                            }}
                                        />
                                    </div>
                                    <div className="img3 showDesktop">
                                        <div
                                            className="bg-cover bg-center h-full w-full"
                                            style={{
                                                backgroundImage:
                                                    "url('https://amantys.fr/wp-content/uploads/2024/04/pac_gemmologie_diamant_brillant_100_1.jpg')",
                                            }}
                                        />
                                    </div>
                                </div>
                                <p className="mb-4 text-base">
                                    C’est aussi un <strong>moment privilégié</strong> où votre Gemmologue dédié prendra le temps de
                                    vous faire <strong>essayer toutes les créations</strong> de votre choix.
                                </p>
                                <div className="img1 showDesktop mb-4">
                                    <Image
                                        src="https://amantys.fr/wp-content/uploads/2024/10/mat_bdf_lqp_ova_100_san_ros_4_desktop-1.jpg"
                                        alt="Experience Detail"
                                        layout="responsive"
                                        width={1920}
                                        height={1080}
                                    />
                                </div>
                            </div>

                            {/* Right Column: Appointment Form (Accordion) */}
                            <div className="appointmentFormPart md:w-1/2">
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    {/* Accordion Item 1 */}
                                    <div className="accordion-item border-b">
                                        <a
                                            href="#"
                                            className="accordion-button block text-left p-4 font-semibold"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#appointmentTab1"
                                            aria-expanded="true"
                                            aria-controls="appointmentTab1"
                                        >
                                            <span id="span1" className="font-bold mr-2">1</span> - Choisissez le lieu de rendez-vous
                                        </a>
                                        <div
                                            id="appointmentTab1"
                                            className="accordion-collapse collapse show"
                                            data-bs-parent="#accordionFlushExample"
                                        >
                                            <div className="accordion-body p-4">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className="form-check">
                                                        <input
                                                            defaultChecked
                                                            className="meetingPlace form-check-input"
                                                            id="en_boutique"
                                                            name="meetingPlace"
                                                            type="radio"
                                                            value="en_boutique"
                                                        />
                                                        <label className="form-check-label" htmlFor="en_boutique">
                                                            En boutique
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="meetingPlace form-check-input"
                                                            id="en_visio"
                                                            name="meetingPlace"
                                                            type="radio"
                                                            value="en_visio"
                                                        />
                                                        <label className="form-check-label" htmlFor="en_visio">
                                                            En visio
                                                        </label>
                                                    </div>
                                                </div>
                                                <p className="mb-0 meetingPlaceResult text-sm">
                                                    À Paris ou à Bordeaux
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Accordion Item 2 */}
                                    <div className="accordion-item border-b optionAcc">
                                        <a
                                            href="#"
                                            className="accordion-button block text-left p-4 font-semibold collapsed"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#appointmentTab2"
                                            aria-expanded="false"
                                            aria-controls="appointmentTab2"
                                        >
                                            <span id="span2" className="font-bold mr-2">2</span> - Choisissez une adresse
                                        </a>
                                        <div
                                            id="appointmentTab2"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFlushExample"
                                        >
                                            <div className="accordion-body p-4">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className="form-check">
                                                        <input
                                                            defaultChecked
                                                            className="addressOption form-check-input"
                                                            id="parisAddress"
                                                            name="addressOption"
                                                            type="radio"
                                                            value="parisAddress"
                                                        />
                                                        <label className="form-check-label" htmlFor="parisAddress">
                                                            Paris - L’Atelier
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="addressOption form-check-input"
                                                            id="BordeauxAddress"
                                                            name="addressOption"
                                                            type="radio"
                                                            value="BordeauxAddress"
                                                        />
                                                        <label className="form-check-label" htmlFor="BordeauxAddress">
                                                            Bordeaux
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="addressResults text-sm">
                                                    <p className="mb-0">
                                                        5 rue de l’Échelle<br />75001 Paris
                                                    </p>
                                                    <p className="mb-0">
                                                        4-6 Cours de l’Intendance<br />33000 Bordeaux
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Accordion Item 3 */}
                                    <div className="accordion-item accordionSlot">
                                        <a
                                            href="#"
                                            className="accordion-button block text-left p-4 font-semibold collapsed"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#appointmentTab3"
                                            aria-expanded="false"
                                            aria-controls="appointmentTab3"
                                        >
                                            <span id="span3" className="font-bold mr-2">3</span> - Choisissez un type de rendez-vous
                                        </a>
                                        <div
                                            id="appointmentTab3"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFlushExample"
                                        >
                                            <div className="accordion-body p-4">
                                                {/* Option lists – all three sets are output; JS toggles their visibility */}
                                                <ul className="chooseAppointmentSlot" id="opt_1">
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/parissolitaire-bague-de-fiancailles"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Solitaire / Bague de fiançailles - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Un rendez-vous avec initiation à la Gemmologie et essayages des modèles coup de coeur.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/parisconfirmationcaracteristiques?uuid=3ed2317c-1694-415a-92dd-d62c04bd3ab1"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Valider ma commande - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Ce rendez-vous correspond uniquement à la validation d’un projet en cours.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/paris-fabrication-sur-mesure"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Fabrication sur-mesure - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Lors de ce moment privilégié, nous discuterons de vos envies, de vos inspirations, et des détails qui feront de votre création une pièce inoubliable.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/paris-bague-de-pre-demande-en-fiancailles"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Bague de pré-demande en fiançailles - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Pressé(e) ou pas sûr(e) du modèle ? Choisissez la bague de pré-demande, disponible tout de suite.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/paris-alliances-or-et-diamants"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Alliances Or et Diamants - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Trouvons ensemble vos alliances idéales pour un mariage parfait. Déjà client Amantys ? Bénéficiez de 10% de réduction.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/paris-collier-boucles-doreilles-bracelet"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Collier, Boucles d'oreilles, Bracelet - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Personnalisons ensemble votre collier, bracelet ou boucles d'oreilles dans les moindres détails.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/paris-bague-en-diamant-a-soffrir"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Bague diamant à (s')offrir - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Un moment de vie unique à célébrer ? Envie de se faire (très) plaisir ? Vous avez frappé à la bonne porte !
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/paris-mise-a-taille-gravure"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Mise à taille / gravure bijoux Amantys - 15 minutes
                                                            </h4>
                                                            <p className="text-sm">
                                                                Pour nos clients Amantys uniquement qui souhaitent déposer leurs bijoux en mise à taille et/ou gravures. (Délai 1 semaine)
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/paris-sav-bijoux-amantys"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                SAV Bijoux Amantys uniquement - 30 minutes
                                                            </h4>
                                                            <p className="text-sm">
                                                                Un accident sur votre bijou Amantys ? Une révision ? Passez à l'Atelier, on voit ça ensemble !
                                                            </p>
                                                        </a>
                                                    </li>
                                                </ul>

                                                <ul className="chooseAppointmentSlot" id="opt_2" style={{ display: 'none' }}>
                                                    {/* Bordeaux slot options */}
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/bordeaux-solitaire-bague-de-fiancailles"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Solitaire / Bague de fiançailles - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Un rendez-vous avec initiation à la Gemmologie et essayages des modèles coup de coeur.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/bordeaux-confirmation-caracteristiques"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Valider ma commande - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Ce rendez-vous correspond uniquement à la validation d’un projet en cours.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/bordeaux-fabrication-sur-mesure"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Fabrication sur-mesure - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Lors de ce moment privilégié, nous discuterons de vos envies, de vos inspirations, et des détails qui feront de votre création une pièce inoubliable.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/bordeaux-bague-de-pre-demande-en-fiancailles"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Bague de pré-demande en fiançailles - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Pressé(e) ou pas sûr(e) du modèle ? Choisissez la bague de pré-demande, disponible tout de suite.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/bordeaux-alliances-or-et-diamants"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Alliances Or et Diamants - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Trouvons ensemble vos alliances idéales pour un mariage parfait. Déjà client Amantys ? Bénéficiez de 10% de réduction.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/bordeaux-collier-boucles-doreilles-bracelet"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Collier, Boucles d'oreilles, Bracelet - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Personnalisons ensemble votre collier, bracelet ou boucles d'oreilles dans les moindres détails.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/bordeauxbague-en-diamant-a-soffrir"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Bague diamant à (s')offrir - 1 heure
                                                            </h4>
                                                            <p className="text-sm">
                                                                Un moment de vie unique à célébrer ? Envie de se faire (très) plaisir ? Vous avez frappé à la bonne porte !
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/bordeaux-mise-a-taille-gravure"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Mise à taille / gravure bijoux Amantys - 15 minutes
                                                            </h4>
                                                            <p className="text-sm">
                                                                Pour nos clients Amantys uniquement qui souhaitent déposer leurs bijoux en mise à taille et/ou gravures. (Délai 1 semaine)
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/bordeaux-sav-bijoux-amantys"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                SAV Bijoux Amantys uniquement - 30 minutes
                                                            </h4>
                                                            <p className="text-sm">
                                                                Un accident sur votre bijou Amantys ? Une révision ? Passez à l'Atelier, on voit ça ensemble !
                                                            </p>
                                                        </a>
                                                    </li>
                                                </ul>

                                                <ul className="chooseAppointmentSlot" id="opt_3" style={{ display: 'none' }}>
                                                    {/* Online (visio) slot options */}
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/online-solitaire-bague-de-fiancailles"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Solitaire / Bagues de fiançailles - 30 minutes
                                                            </h4>
                                                            <p className="text-sm">
                                                                Un rendez-vous avec initiation à la Gemmologie et présentation des modèles coup de coeur.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/online-bague-de-pre-demande-en-fiancailles"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Bague de pré-demande en fiançailles - 30 minutes
                                                            </h4>
                                                            <p className="text-sm">
                                                                Pressé(e) ou pas sûr(e) du modèle ? Choisissez la bague de pré-demande, disponible tout de suite.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/online-collier-boucles-doreilles-bracelet"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Collier, Boucles d'oreilles, Bracelet - 30 minutes
                                                            </h4>
                                                            <p className="text-sm">
                                                                Personnalisons ensemble votre collier, bracelet ou boucles d'oreilles dans les moindres détails.
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://info.amantys.fr/meetings/frederic-sebag/online-bague-en-diamant-a-soffrir"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4 className="text-lg font-bold">
                                                                Bague diamant à (s')offrir - 30 minutes
                                                            </h4>
                                                            <p className="text-sm">
                                                                Un moment de vie unique à célébrer ? Envie de se faire (très) plaisir ? Vous avez frappé à la bonne porte !
                                                            </p>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NO COMMITMENT SECTION */}
                <section className="withoutIntermediaries orangeColor py-8">
                    <div className="appointmentContainer mx-auto px-4 text-center">
                        <h5 className="text-xl font-semibold">SANS ENGAGEMENT & SANS COMPROMIS</h5>
                        <p className="text-base">
                            Sans obligation d’achat, les rendez-vous Amantys sont toujours conduits avec la même exigence afin de
                            vous garantir une expérience irréprochable, empreinte d’émerveillement.
                        </p>
                    </div>
                </section>



            </div>

            {/* Note: In a real Next.js app, header and footer are provided as separate components */}
        </>
    )
}

export default RendezVous
