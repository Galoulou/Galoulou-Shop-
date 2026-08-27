```javascript
// ============================================================
// 🛒 GALOULOUFIND
// 🔐 BACKEND
// ============================================================

const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;


// ============================================================
// ⚙️ CONFIGURATION
// ============================================================

app.use(
    express.json()
);


// ============================================================
// 🌐 FICHIERS DU SITE
// ============================================================

app.use(
    express.static(
        path.join(__dirname)
    )
);


// ============================================================
// 🔎 API DE RECHERCHE
// ============================================================

app.get(
    "/api/search",
    async (req, res) => {

        const recherche =
            String(
                req.query.q || ""
            ).trim();


        // ----------------------------------------------------
        // Vérification
        // ----------------------------------------------------

        if (!recherche) {

            return res.status(400).json({

                error:
                    "Veuillez entrer une recherche."

            });

        }


        console.log(
            "🔎 Recherche :",
            recherche
        );


        // ----------------------------------------------------
        // POUR L'INSTANT
        // ----------------------------------------------------
        //
        // Ici nous brancherons l'API Amazon.
        //
        // On ne met PAS les clés Amazon ici en dur.
        //
        // ----------------------------------------------------

        return res.json({

            success: true,

            query:
                recherche,

            products: []

        });

    }
);


// ============================================================
// 🚀 DÉMARRAGE
// ============================================================

app.listen(
    PORT,
    () => {

        console.log(
            ""
        );

        console.log(
            "===================================="
        );

        console.log(
            "🛒 GaloulouFind"
        );

        console.log(
            "🚀 Backend démarré"
        );

        console.log(
            `🌐 http://localhost:${PORT}`
        );

        console.log(
            "===================================="
        );

    }
);
```
