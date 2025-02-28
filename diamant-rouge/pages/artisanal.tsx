import React from 'react';
import Link from 'next/link';

const Artisanal: React.FC = () => {
    return (
        <main>
            {/* HERO SECTION */}
            <section id="jewelryHeroSec">
                <video autoPlay loop muted playsInline className="showDesktop half-video">
                    <source src="https://amantys.fr/wp-content/uploads/2024/09/vid_bdf_del_cou_250_dem_bla_1.webm" type="video/webm" />
                </video>

                <div className="heroContentWrap">
                    <h2>Confection artisanale</h2>
                    <Link legacyBehavior href="#withoutIntermediaries">
                        <a>découvrir l’atelier</a>
                    </Link>
                </div>
            </section>

            {/* WITHOUT INTERMEDIARIES SECTION */}
            <section id="withoutIntermediaries">
                <div className="priceQualityContainer">
                    <h5>Un Atelier parisien d’exception ouvert à tous</h5>
                    <p>
                        Tous les bijoux en diamants sur-mesure sont confectionnés à la main par nos artisans joailliers.
                        L’Atelier, véritable écrin hors du temps, témoigne de chacune des étapes de fabrication artisanale.
                        Installé au coeur même de notre Showroom parisien, il est ouvert à tous les clients de la Maison
                        Amantys et offre la possibilité de découvrir la création de bijoux en diamants naturels.
                    </p>
                </div>
            </section>

            {/* ARTISANS SECTION */}
            <section id="jewelryArtisans">
                <div className="d-flex align-item-center">
                    <div className="jewelryArtisansText">
                        <h3>Artisans joailliers expérimentés</h3>
                        <p>
                            S’entourer des artisans joailliers <strong>les plus expérimentés</strong> est primordial pour une
                            <strong> qualité sans concession</strong>. Nos artisans ont <strong>plus de 20 ans d’expérience</strong> dans le métier de la joaillerie, nous permettant d’assurer
                            <strong> une qualité de fabrication exceptionnelle</strong>, dans la pure tradition des grands joailliers de la Place Vendôme à Paris.
                        </p>
                        <ul>
                            <li>
                                <Link legacyBehavior href="https://www.youtube.com/watch?v=OtMda8_98qM&list=PLAbU-g895HAoFu_fVlb46raLBQZTRG1Q8&pp=iAQB">
                                    <a>visionner les étapes de fabrication</a>
                                </Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="provenance-diamants/index.html">
                                    <a>diamants uniques &amp; or recyclé</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="btnWBorder">
                            <Link legacyBehavior href="rendez-vous/index.html">
                                <a className="mt-0 section-btn section-white-btn"><span>modéliser un bijou</span></a>
                            </Link>
                        </div>
                    </div>
                    <div className="showDesktop jewelryArtisansVideo">
                        <img
                            src="https://amantys.fr/wp-content/uploads/2024/04/ate_bdf_art_cou_300_dem_bla_22.jpg"
                            alt=""
                            width="1100"
                            height="1300"
                            decoding="async"
                            loading="lazy"
                            sizes="auto, (max-width: 1100px) 100vw, 1100px"
                        />
                    </div>
                </div>
            </section>

            {/* VIDEO STRIP SECTIONS */}
            <section id="videoStrip" className="d-md-flex d-none">
                <video autoPlay loop muted playsInline>
                    <source src="https://amantys.fr/wp-content/uploads/2024/09/ate_all_del_300_com_bla_2.webm" type="video/webm" />
                </video>
            </section>

            {/* STAGES OF MAKING SECTION */}
            <section id="requestStepsSec" className="stagesOfMaking">
                <div className="engagementContainerWrap">
                    <hgroup className="preEngagmentHeading">
                        <h3>
                            <p>Les étapes de fabrication <em>d’un bijou</em> en <em>diamants sur-mesure</em></p>
                        </h3>
                    </hgroup>
                    <div className="owl-carousel owl-loaded owl-theme stages-of-making">
                        <div className="owl-stage-outer">
                            <div className="owl-stage">
                                {/* Stage 01 */}
                                <div className="owl-item active">
                                    <div className="showDesktop imageVideoWrap">
                                        <video autoPlay loop muted playsInline>
                                            <source src="https://amantys.fr/wp-content/uploads/2024/09/ate_all_del_300_com_bla_1.webm" type="video/webm" />
                                        </video>
                                    </div>
                                    <div className="imageVideoOverlayWrap">
                                        <h2>
                                            <p>01 - Rattrapage de<br />la fonte</p>
                                        </h2>
                                        <p>
                                            Le travail de la monture fait partie des premières étapes de fabrication d’un bijou sur-mesure. Notre joaillier commence par <strong>travailler le métal à l’état brut</strong>. Il soude et perce la matière précieuse afin que notre sertisseur puisse ensuite minutieusement y déposer les diamants naturels.
                                        </p>
                                        <div className="btnWBorder">
                                            <Link legacyBehavior href="https://www.youtube.com/watch?v=DHBcGcWnP8E&list=PLAbU-g895HAqyfkuND72O9i8w9UNRCiFH&pp=iAQB">
                                                <a className="mt-0 section-btn section-white-btn"><span>RENCONTRER LES ARTISANS</span></a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Stage 02 */}
                                <div className="owl-item">
                                    <div className="showDesktop imageVideoWrap">
                                        <video autoPlay loop muted playsInline>
                                            <source src="https://amantys.fr/wp-content/uploads/2024/09/ate_bdf_pur_ron_100_san_bla_1.webm" type="video/webm" />
                                        </video>
                                    </div>
                                    <div className="imageVideoOverlayWrap">
                                        <h2>
                                            <p>02 – Sertissage</p>
                                        </h2>
                                        <p>
                                            Une fois la monture réalisée, notre sertisseur s’attèle à <strong>l’insertion des pierres dans la monture</strong>. Il s’agit d’une étape cruciale dont la complexité réside dans la recherche du <strong>juste équilibre</strong> entre <strong>mise en lumière</strong> des diamants et <strong>résistance</strong> des griffes dans le temps.
                                        </p>
                                        <div className="btnWBorder">
                                            <Link legacyBehavior href="https://www.youtube.com/watch?v=OtMda8_98qM&list=PLAbU-g895HAoFu_fVlb46raLBQZTRG1Q8&pp=iAQB">
                                                <a className="mt-0 section-btn section-white-btn"><span>voir les étapes en vidéo</span></a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Stage 03 */}
                                <div className="owl-item">
                                    <div className="showDesktop imageVideoWrap">
                                        <video autoPlay loop muted playsInline>
                                            <source src="https://amantys.fr/wp-content/uploads/2024/09/ate_bdf_dah_ova_100_san_bla_1.webm" type="video/webm" />
                                        </video>
                                    </div>
                                    <div className="imageVideoOverlayWrap">
                                        <h2>
                                            <p>03 – Polissage et<br />rhodiage</p>
                                        </h2>
                                        <p>
                                            Le joaillier entreprend alors un <strong>poli-rhodiage</strong>, une étape qui permet à l’Or 18K du bijou d’obtenir un <strong>aspect lisse et scintillant</strong>. Cela donne à la création tout son éclat.
                                        </p>
                                        <div className="btnWBorder">
                                            <Link legacyBehavior href="rendez-vous/index.html">
                                                <a className="mt-0 section-btn section-white-btn"><span>prendre rendez-vous</span></a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Stage 04 */}
                                <div className="owl-item">
                                    <div className="showDesktop imageVideoWrap">
                                        <video autoPlay loop muted playsInline>
                                            <source src="https://amantys.fr/wp-content/uploads/2024/09/ate_bdf_dah_ova_100_san_bla_2.webm" type="video/webm" />
                                        </video>
                                    </div>
                                    <div className="imageVideoOverlayWrap">
                                        <h2>
                                            <p>04 – Contrôle qualité</p>
                                        </h2>
                                        <p>
                                            Lorsque la création joaillière est finalisée, un contrôle qualité est assuré avec <strong>la plus grande minutie</strong>. Examiné <strong>à la loupe et au microscope</strong>, le bijou est étudié dans les moindres détails.
                                        </p>
                                        <div className="btnWBorder">
                                            <Link legacyBehavior href="https://www.youtube.com/watch?v=DHBcGcWnP8E&list=PLAbU-g895HAqyfkuND72O9i8w9UNRCiFH&pp=iAQB">
                                                <a className="mt-0 section-btn section-white-btn"><span>visiter l’atelier</span></a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EQUIPMENT OF POINTE SECTION */}
            <section id="borrowingTerms" className="equipmentPoint">
                <div className="engagementContainerWrap">
                    <div className="borrowingTermsRow">
                        <div className="showDesktop borrowingTermsCol">
                            <img
                                src="https://amantys.fr/wp-content/uploads/2024/04/amantys_atelier_sertissage_diamant_central.jpg"
                                alt=""
                                width="1100"
                                height="1300"
                                decoding="async"
                                loading="lazy"
                                sizes="auto, (max-width: 1100px) 100vw, 1100px"
                            />
                        </div>

                        <div className="borrowingTermsCol">
                            <h3>Équipement de pointe</h3>
                            <p>
                                La Maison Amantys met la <strong>technologie au service de la joaillerie</strong>. Dans l’Atelier ouvert aux clients, une <strong>caméra</strong> a été insérée <strong>dans la binoculaire</strong> de notre meilleur sertisseur afin de <strong>projeter en direct</strong> le travail artisanal de fabrication sur-mesure.
                            </p>
                            <ul>
                                <li>
                                    <Link legacyBehavior href="rendez-vous/index.html">
                                        <a>Rencontrer les artisans</a>
                                    </Link>
                                </li>
                            </ul>
                            <div className="btnWBorder">
                                <Link legacyBehavior href="rendez-vous/index.html">
                                    <a className="mt-0 section-btn section-white-btn"><span>prendre rendez-vous</span></a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ASSIST SECTION */}
            <section id="framedMargins" className="assist">
                <h3>Assister au sertissage de votre bijou</h3>
                <div className="framedMarginsRow">
                    <div className="framedMarginsCol">
                        <div className="framedMarginsItem">
                            <div className="showDesktop framedMarginsVideo">
                                <video autoPlay loop muted playsInline>
                                    <source src="https://amantys.fr/wp-content/uploads/2024/09/ate_bdf_lqp_ova_100_san_jau_1.webm" type="video/webm" />
                                </video>
                            </div>
                            <div className="framedMarginsContent">
                                <h4>émotion unique</h4>
                                <p>Aucun mot ne peut décrire le sentiment que procure le spectacle du sertissage de sa propre création.</p>
                            </div>
                        </div>
                    </div>
                    <div className="framedMarginsCol">
                        <div className="framedMarginsItem">
                            <div className="showDesktop framedMarginsVideo">
                                <video autoPlay loop muted playsInline>
                                    <source src="https://amantys.fr/wp-content/uploads/2024/09/ate_bdf_art_cou_300_dem_bla_7.webm" type="video/webm" />
                                </video>
                            </div>
                            <div className="framedMarginsContent">
                                <h4>métaux rares</h4>
                                <p>Observez toutes les composantes les plus précieuses utilisées pour confectionner le bijou d’une vie.</p>
                            </div>
                        </div>
                    </div>
                    <div className="framedMarginsCol">
                        <div className="framedMarginsItem">
                            <div className="showDesktop framedMarginsVideo">
                                <video autoPlay loop muted playsInline>
                                    <source src="https://amantys.fr/wp-content/uploads/2024/09/ate_bdf_lqp_ova_100_san_jau_2.webm" type="video/webm" />
                                </video>
                            </div>
                            <div className="framedMarginsContent">
                                <h4>immersion</h4>
                                <p>À la place du sertisseur, examinez à la binoculaire les moindres détails de votre création joaillière d’exception.</p>
                            </div>
                        </div>
                    </div>
                    <div className="framedMarginsCol">
                        <div className="framedMarginsItem">
                            <div className="showDesktop framedMarginsVideo">
                                <video autoPlay loop muted playsInline>
                                    <source src="https://amantys.fr/wp-content/uploads/2024/09/ate_bdf_cha_ron_100_san_jau_2.webm" type="video/webm" />
                                </video>
                            </div>
                            <div className="framedMarginsContent">
                                <h4>artisanat</h4>
                                <p>Rencontrez des artisans au savoir-faire ancestral, transmis à travers les âges.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCT SLIDE SECTION (Créations joaillières artisanales) */}
            <section className="inner-section ethicalDiamondCreations uniquePtoducts">
                <div className="product-slide-sec">
                    <h2 className="text-center title">Créations joaillières artisanales</h2>
                    <div className="product-tabs-wrap">
                        <div className="inner-container">
                            <div className="categrory-list-tab">
                                <div className="d-flex tab-btn-wrap">
                                    <button className="tab-btn active" type="button" data-tab-id="bagues-de-fiancailles">Bagues de fiançailles</button>
                                    <button className="tab-btn" type="button" data-tab-id="alliances">Alliances</button>
                                    <button className="tab-btn" type="button" data-tab-id="bagues-diamants">Bagues diamants</button>
                                    <button className="tab-btn" type="button" data-tab-id="boucles-doreilles">Boucles d’oreilles</button>
                                    <button className="tab-btn" type="button" data-tab-id="colliers">Colliers</button>
                                    <button className="tab-btn" type="button" data-tab-id="bracelets">Bracelets</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inner-container">
                        <div className="category-tab-content">
                            {/* Example tab – “Bagues de fiançailles” */}
                            <div className="tab-content active" data-content-id="bagues-de-fiancailles">
                                <div className="d-flex productbox-wrap">
                                    <div className="product_box">
                                        <div className="product-wrap">
                                            <Link legacyBehavior href="../bague-de-fiancailles-halo-delicate/index.html">
                                                <a>
                                                    <img
                                                        src="https://amantys.fr/wp-content/uploads/2023/11/trd_bdf_del_ron_100_dem_bla_1_desktop-1.jpg"
                                                        alt="Product Image"
                                                        width="1080"
                                                        height="1080"
                                                        decoding="async"
                                                        loading="lazy"
                                                        sizes="auto, (max-width: 1080px) 100vw, 1080px"
                                                    />
                                                    <p className="product-title">Délicate</p>
                                                </a>
                                            </Link>
                                            <div
                                                className="tinv-wishlist tinv-wraper tinvwl-no-action tinvwl-shortcode-add-to-cart woocommerce"
                                                data-tinvwl_product_id="179273"
                                            >
                                                <a
                                                    className="no-txt tinvwl-icon-heart tinvwl-position-after tinvwl_add_to_wishlist_button"
                                                    aria-label=""
                                                    data-tinv-wl-action="add"
                                                    data-tinv-wl-list={[]}
                                                    data-tinv-wl-product="179273"
                                                    data-tinv-wl-producttype="variable"
                                                    data-tinv-wl-productvariation="0"
                                                    data-tinv-wl-productvariations={[]}
                                                    role="button"
                                                    tabIndex={0}
                                                ></a>
                                                <div className="tinvwl-tooltip"></div>
                                            </div>
                                            <p className="Price-pro">
                                                À partir de 5000 €
                                                <div className="ArchiveHtml">
                                                    <Link legacyBehavior href="../bague-de-fiancailles-halo-delicate/indexd71b.html?attribute_pa_la-forme-de-pierres=taille_brillant&attribute_pa_le-carat=0-40-ct&attribute_pa_la-qualite=d-e-vs1&attribute_pa_la-coupe=tres-bonne&attribute_pa_la-couleur-du-metal=or-blanc-palladie-18k&attribute_pa_la-pavage-de-lanneau=pavage-3-4">
                                                        <a>
                                                            <img
                                                                src="https://amantys.fr/wp-content/uploads/2024/09/Diamant-brillant.svg"
                                                                alt="Rond"
                                                                height="37"
                                                                width="37"
                                                                decoding="async"
                                                                loading="lazy"
                                                                title="Rond"
                                                            />
                                                        </a>
                                                    </Link>
                                                    <Link legacyBehavior href="../bague-de-fiancailles-halo-delicate/indexa0fe.html?attribute_pa_la-forme-de-pierres=taille_ovale&attribute_pa_le-carat=0-30-ct&attribute_pa_la-qualite=d-e-vs1&attribute_pa_la-coupe=excellente&attribute_pa_la-couleur-du-metal=or-blanc-palladie-18k&attribute_pa_la-pavage-de-lanneau=pavage-demi-tour">
                                                        <a>
                                                            <img
                                                                src="https://amantys.fr/wp-content/uploads/2023/10/Diamant-ovale.svg"
                                                                alt="Ovale"
                                                                height="37"
                                                                width="27"
                                                                decoding="async"
                                                                loading="lazy"
                                                                title="Ovale"
                                                            />
                                                        </a>
                                                    </Link>
                                                    <Link legacyBehavior href="../bague-de-fiancailles-halo-delicate/index8a32.html?attribute_pa_la-forme-de-pierres=taille_coussin&attribute_pa_le-carat=0-30-ct&attribute_pa_la-qualite=d-e-vs1&attribute_pa_la-coupe=excellente&attribute_pa_la-couleur-du-metal=or-blanc-palladie-18k&attribute_pa_la-pavage-de-lanneau=pavage-demi-tour">
                                                        <a>
                                                            <img
                                                                src="https://amantys.fr/wp-content/uploads/2023/10/Diamant-Coussin.svg"
                                                                alt="Coussin"
                                                                height="35"
                                                                width="35"
                                                                decoding="async"
                                                                loading="lazy"
                                                                title="Coussin"
                                                            />
                                                        </a>
                                                    </Link>
                                                    <Link legacyBehavior href="../bague-de-fiancailles-halo-delicate/indexcec3.html?attribute_pa_la-forme-de-pierres=taille_emeraude&attribute_pa_le-carat=0-30-ct&attribute_pa_la-qualite=d-e-vs1&attribute_pa_la-coupe=excellente&attribute_pa_la-couleur-du-metal=or-blanc-palladie-18k&attribute_pa_la-pavage-de-lanneau=pavage-demi-tour">
                                                        <a>
                                                            <img
                                                                src="https://amantys.fr/wp-content/uploads/2023/10/Diamant-Emeraude.svg"
                                                                alt="Émeraude"
                                                                height="35"
                                                                width="28"
                                                                decoding="async"
                                                                loading="lazy"
                                                                title="Émeraude"
                                                            />
                                                        </a>
                                                    </Link>
                                                    <Link legacyBehavior href="../bague-de-fiancailles-halo-delicate/index2a7f.html?attribute_pa_la-forme-de-pierres=taille_poire&attribute_pa_le-carat=0-30-ct&attribute_pa_la-qualite=d-e-vs1&attribute_pa_la-coupe=excellente&attribute_pa_la-couleur-du-metal=or-blanc-palladie-18k&attribute_pa_la-pavage-de-lanneau=pavage-demi-tour">
                                                        <a>
                                                            <img
                                                                src="https://amantys.fr/wp-content/uploads/2024/09/Diamant-Poire.svg"
                                                                alt="Poire"
                                                                height="35"
                                                                width="25"
                                                                decoding="async"
                                                                loading="lazy"
                                                                title="Poire"
                                                            />
                                                        </a>
                                                    </Link>
                                                    <Link legacyBehavior href="../bague-de-fiancailles-halo-delicate/index43f7.html?attribute_pa_la-forme-de-pierres=taille_radiant&attribute_pa_le-carat=0-30-ct&attribute_pa_la-qualite=d-e-vs1&attribute_pa_la-coupe=excellente&attribute_pa_la-couleur-du-metal=or-blanc-palladie-18k&attribute_pa_la-pavage-de-lanneau=pavage-demi-tour">
                                                        <a>
                                                            <img
                                                                src="https://amantys.fr/wp-content/uploads/2023/10/Diamant-Radiant.svg"
                                                                alt="Radiant"
                                                                height="35"
                                                                width="28"
                                                                decoding="async"
                                                                loading="lazy"
                                                                title="Radiant"
                                                            />
                                                        </a>
                                                    </Link>
                                                </div>
                                            </p>
                                            <Link legacyBehavior href="../bague-de-fiancailles-halo-delicate/index.html">
                                                <a className="product-btn">Personnaliser</a>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* …additional product boxes for other categories would follow the same structure */}
                                </div>
                            </div>
                            {/* Additional tab-content blocks for "alliances", "bagues-diamants", "boucles-doreilles", "colliers", "bracelets" go here */}
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
};

export default Artisanal;
