```javascript
// ============================================================
// 🔎 GALOULOUFIND
// 🛍️ MOTEUR DE RECHERCHE PRODUITS
// ============================================================


// ============================================================
// 📦 CATALOGUE
// ============================================================
//
// IMPORTANT :
// Les liens Amazon ci-dessous sont des exemples.
// Remplace-les par les vrais liens des produits lorsque
// tu ajouteras tes produits.
//
// image : chemin vers l'image du produit
// amazon : lien vers la page Amazon
//
// ============================================================

const catalogueProduits = [

    {
        id: "clavier-001",

        title: "Clavier mécanique RGB",

        category: "Claviers",

        description:
            "Clavier mécanique RGB pour PC, gaming et bureautique.",

        price: 39.99,

        oldPrice: 59.99,

        rating: 4.5,

        reviews: 1240,

        score: 92,

        badge: "Bon plan",

        image: "",

        amazon:
            "https://www.amazon.fr/"
    },


    {
        id: "souris-001",

        title: "Souris gaming sans fil",

        category: "Souris",

        description:
            "Souris sans fil légère avec capteur précis.",

        price: 24.99,

        oldPrice: 34.99,

        rating: 4.4,

        reviews: 860,

        score: 89,

        badge: "Populaire",

        image: "",

        amazon:
            "https://www.amazon.fr/"
    },


    {
        id: "casque-001",

        title: "Casque audio Bluetooth",

        category: "Audio",

        description:
            "Casque Bluetooth avec réduction de bruit et grande autonomie.",

        price: 49.99,

        oldPrice: 69.99,

        rating: 4.6,

        reviews: 2310,

        score: 94,

        badge: "Très bien noté",

        image: "",

        amazon:
            "https://www.amazon.fr/"
    },


    {
        id: "webcam-001",

        title: "Webcam Full HD",

        category: "Webcams",

        description:
            "Webcam Full HD idéale pour les appels vidéo et le streaming.",

        price: 29.99,

        oldPrice: 44.99,

        rating: 4.3,

        reviews: 570,

        score: 86,

        badge: "Bon plan",

        image: "",

        amazon:
            "https://www.amazon.fr/"
    },


    {
        id: "micro-001",

        title: "Microphone USB",

        category: "Audio",

        description:
            "Microphone USB simple à utiliser pour voix, jeux et création.",

        price: 34.99,

        oldPrice: 49.99,

        rating: 4.5,

        reviews: 930,

        score: 91,

        badge: "Populaire",

        image: "",

        amazon:
            "https://www.amazon.fr/"
    },


    {
        id: "support-001",

        title: "Support pour ordinateur portable",

        category: "Accessoires",

        description:
            "Support réglable pour améliorer le confort devant l'écran.",

        price: 19.99,

        oldPrice: 27.99,

        rating: 4.4,

        reviews: 640,

        score: 88,

        badge: "Petit prix",

        image: "",

        amazon:
            "https://www.amazon.fr/"
    }

];


// ============================================================
// 🧩 ÉLÉMENTS HTML
// ============================================================

const searchInput =
    document.querySelector(
        ".search-box input"
    );


const searchButton =
    document.querySelector(
        ".search-box button"
    );


const productsGrid =
    document.querySelector(
        ".products-grid"
    );


const filters =
    document.querySelector(
        ".filters"
    );


const noResults =
    document.querySelector(
        ".no-results"
    );


// ============================================================
// ⚙️ ÉTAT
// ============================================================

let rechercheActuelle = "";

let categorieActuelle = "Toutes";

let triActuel = "pertinence";


// ============================================================
// 💶 FORMAT PRIX
// ============================================================

function formatPrice(
    price
) {

    return new Intl.NumberFormat(
        "fr-FR",
        {
            style: "currency",
            currency: "EUR"
        }
    ).format(price);

}


// ============================================================
// ⭐ ÉTOILES
// ============================================================

function generateStars(
    rating
) {

    const rounded =
        Math.round(rating);

    let stars = "";

    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        stars +=
            i <= rounded
                ? "★"
                : "☆";

    }

    return stars;

}


// ============================================================
// 🔍 NORMALISATION
// ============================================================

function normaliser(
    texte
) {

    return String(
        texte || ""
    )
        .toLowerCase()
        .normalize(
            "NFD"
        )
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


// ============================================================
// 🔎 RECHERCHE
// ============================================================

function rechercherProduits(
    produits,
    recherche
) {

    const terme =
        normaliser(
            recherche
        ).trim();


    if (
        !terme
    ) {

        return produits;

    }


    const mots =
        terme.split(
            /\s+/
        );


    return produits.filter(
        produit => {

            const texte =
                normaliser(
                    [
                        produit.title,
                        produit.category,
                        produit.description
                    ].join(" ")
                );


            return mots.every(
                mot =>
                    texte.includes(
                        mot
                    )
            );

        }
    );

}


// ============================================================
// 🏷️ FILTRE CATÉGORIE
// ============================================================

function filtrerCategorie(
    produits
) {

    if (
        categorieActuelle ===
        "Toutes"
    ) {

        return produits;

    }


    return produits.filter(
        produit =>
            produit.category ===
            categorieActuelle
    );

}


// ============================================================
// ↕️ TRI
// ============================================================

function trierProduits(
    produits
) {

    const copie =
        [...produits];


    switch (
        triActuel
    ) {

        case "prix-croissant":

            return copie.sort(
                (
                    a,
                    b
                ) =>
                    a.price -
                    b.price
            );


        case "prix-decroissant":

            return copie.sort(
                (
                    a,
                    b
                ) =>
                    b.price -
                    a.price
            );


        case "note":

            return copie.sort(
                (
                    a,
                    b
                ) =>
                    b.rating -
                    a.rating
            );


        case "populaire":

            return copie.sort(
                (
                    a,
                    b
                ) =>
                    b.reviews -
                    a.reviews
            );


        default:

            return copie.sort(
                (
                    a,
                    b
                ) =>
                    b.score -
                    a.score
            );

    }

}


// ============================================================
// 🖼️ IMAGE PRODUIT
// ============================================================

function renderProductImage(
    produit
) {

    if (
        produit.image
    ) {

        return `
            <img
                src="${produit.image}"
                alt="${produit.title}"
                loading="lazy"
            >
        `;

    }


    return `
        <div
            class="product-placeholder"
            aria-label="Image indisponible"
        >
            🛍️
        </div>
    `;

}


// ============================================================
// 🃏 CARTE PRODUIT
// ============================================================

function createProductCard(
    produit,
    index
) {

    const badgeClass =
        normaliser(
            produit.badge
        ).includes(
            "bon"
        )
            ? "good"
            : "";


    return `
        <article
            class="product-card"
            style="animation-delay:${index * 0.05}s"
        >

            <div class="product-image">

                ${
                    produit.badge
                        ? `
                            <span
                                class="product-badge ${badgeClass}"
                            >
                                ${produit.badge}
                            </span>
                        `
                        : ""
                }

                ${renderProductImage(produit)}

            </div>


            <div class="product-content">

                <span
                    class="product-category"
                >
                    ${produit.category}
                </span>


                <h3>
                    ${produit.title}
                </h3>


                <p
                    class="product-description"
                >
                    ${produit.description}
                </p>


                <div
                    class="product-rating"
                >

                    <span
                        class="stars"
                    >
                        ${generateStars(produit.rating)}
                    </span>

                    <span
                        class="rating-number"
                    >
                        ${produit.rating.toFixed(1)}
                    </span>

                    <span
                        class="review-count"
                    >
                        (${produit.reviews.toLocaleString("fr-FR")})
                    </span>

                </div>


                <div
                    class="product-price-row"
                >

                    <div>

                        <span
                            class="product-price"
                        >
                            ${formatPrice(produit.price)}
                        </span>

                        ${
                            produit.oldPrice
                                ? `
                                    <span
                                        class="product-old-price"
                                    >
                                        ${formatPrice(produit.oldPrice)}
                                    </span>
                                `
                                : ""
                        }

                    </div>


                    <span
                        class="product-score"
                    >
                        ${produit.score}/100
                    </span>

                </div>


                <a
                    class="product-button"
                    href="${produit.amazon}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    🛒 Voir sur Amazon
                </a>

            </div>

        </article>
    `;

}


// ============================================================
// 🖥️ AFFICHAGE
// ============================================================

function afficherProduits() {

    if (
        !productsGrid
    ) {

        return;

    }


    let produits =
        [...catalogueProduits];


    produits =
        rechercherProduits(
            produits,
            rechercheActuelle
        );


    produits =
        filtrerCategorie(
            produits
        );


    produits =
        trierProduits(
            produits
        );


    if (
        noResults
    ) {

        noResults.style.display =
            produits.length === 0
                ? "block"
                : "none";

    }


    productsGrid.innerHTML =
        produits
            .map(
                (
                    produit,
                    index
                ) =>
                    createProductCard(
                        produit,
                        index
                    )
            )
            .join("");


    console.log(
        `🔎 ${produits.length} produit(s) affiché(s)`
    );

}


// ============================================================
// 🏷️ CONSTRUCTION DES FILTRES
// ============================================================

function construireFiltres() {

    if (
        !filters
    ) {

        return;

    }


    const categories =
        [
            "Toutes",
            ...new Set(
                catalogueProduits.map(
                    produit =>
                        produit.category
                )
            )
        ];


    filters.innerHTML =
        categories
            .map(
                categorie => `
                    <button
                        type="button"
                        class="filter-button ${
                            categorie ===
                            categorieActuelle
                                ? "active"
                                : ""
                        }"
                        data-category="${categorie}"
                    >
                        ${categorie}
                    </button>
                `
            )
            .join("");


    filters
        .querySelectorAll(
            ".filter-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        categorieActuelle =
                            button.dataset.category;


                        filters
                            .querySelectorAll(
                                ".filter-button"
                            )
                            .forEach(
                                bouton =>
                                    bouton.classList.remove(
                                        "active"
                                    )
                            );


                        button.classList.add(
                            "active"
                        );


                        afficherProduits();

                    }
                );

            }
        );

}


// ============================================================
// 🔍 BOUTON RECHERCHE
// ============================================================

function lancerRecherche() {

    if (
        !searchInput
    ) {

        return;

    }


    rechercheActuelle =
        searchInput.value;


    afficherProduits();


    const productsSection =
        document.querySelector(
            ".products-section"
        );


    if (
        productsSection &&
        rechercheActuelle.trim()
    ) {

        productsSection.scrollIntoView(
            {
                behavior: "smooth"
            }
        );

    }

}


// ============================================================
// ⌨️ ENTRÉE CLAVIER
// ============================================================

if (
    searchInput
) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
            ) {

                lancerRecherche();

            }

        }
    );

}


// ============================================================
// 🔘 BOUTON SEARCH
// ============================================================

if (
    searchButton
) {

    searchButton.addEventListener(
        "click",
        lancerRecherche
    );

}


// ============================================================
// 💡 EXEMPLES DE RECHERCHE
// ============================================================

document
    .querySelectorAll(
        ".example-search"
    )
    .forEach(
        example => {

            example.addEventListener(
                "click",
                () => {

                    if (
                        !searchInput
                    ) {

                        return;

                    }


                    searchInput.value =
                        example.textContent
                            .trim();


                    lancerRecherche();

                }
            );

        }
    );


// ============================================================
// 🧹 EFFACER RECHERCHE AVEC ESC
// ============================================================

if (
    searchInput
) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                searchInput.value =
                    "";


                rechercheActuelle =
                    "";


                afficherProduits();

            }

        }
    );

}


// ============================================================
// 🚀 DÉMARRAGE
// ============================================================

construireFiltres();

afficherProduits();


console.log(
    "🔎 GaloulouFind démarré."
);

console.log(
    "🛍️ Catalogue :",
    catalogueProduits.length,
    "produits"
);
```
