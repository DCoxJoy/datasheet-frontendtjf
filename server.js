const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("config");
const pdf = require("html-pdf");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const pdfTemplate = require("./templates/index");

const app = express();

const PORT = process.env.PORT || 5005;

// Allow cross-origin
app.use(cors());

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POST request to fetch data for PDF generation
app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("datasheet.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

// POST request to fetch data for PDF generation
app.post("/download-pdf", (req, res) => {
  const config = {
    format: "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    orientation: "portrait", // portrait or landscape
    border: {
      top: "10mm", // default is 0, units: mm, cm, in, px
      right: "15mm",
      bottom: "10mm",
      left: "15mm",
    },
    header: {
      height: "0mm",
    },
    footer: {
      height: "18mm",
    },
  };

  pdf.create(pdfTemplate(req.body), config).toFile("datasheet.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

// GET request to send the generated PDF to client
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/datasheet.pdf`);
});

function getProductAndSiteInfo(params) {
  const graphQLUrl = `https://shop.thejoyfactory.com/graphql`;
  let data = JSON.stringify({
    query: `query SingleProduct {
            site {
               product(entityId: ${params.id}) {
                entityId
                brand {
                  name
                }
                name
                sku
                path
                description
                height {
                  value
                  unit
                }
                width {
                  value
                  unit
                }
                weight {
                  value
                  unit
                }
                depth {
                  value
                  unit
                }
                warranty
                customFields {
                  edges {
                    node {
                      name
                      value
                    }
                  }
                }
                defaultImage {
                  img320px: url(width: 320)
                  img640px: url(width: 640)
                  img960px: url(width: 960)
                }
                images {
                  edges {
                    node {
                      img320px:url(width:320)
                    }
                  }
                }
                prices {
                  price {
                    ...PriceFields
                  }
                }
              }
            }
          }
            
          fragment PriceFields on Money {
            value
            currencyCode
          }`,
    variables: {},
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: graphQLUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sImVhdCI6MjE0NjAwMjU3OCwiaWF0IjoxNjUxNTc1NDM1LCJpc3MiOiJCQyIsInNpZCI6MTAwMDY3NjI0MCwic3ViIjoicXNzNHVsazZnZTYyNTRybWl2YWU3amJodjZ4bDBqeCIsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxfQ.2LxDqgnyUNqZEYxDaLz-uffUczn6N2Rz2w1mmIZl_SkV9Fc6Uhxcpiu74EzO2uQCLP1y-sf6j7h3RaRGNX0z7Q",
      Cookie:
        "SF-CSRF-TOKEN=04ea22a9-552a-41b0-b07c-c9626a84601c; SHOP_SESSION_TOKEN=f6269edc-e2ba-47d2-a576-7f9bc95e9e5e; __cf_bm=umnodATYMi.2sege.Pw2GMfboyXiU3aHGuzWm4RN.IQ-1739369602-1.0.1.1-a8qodWKZKdahGbzfqXUfDp.sokzuLN26QNxUnM6yU92arrSE83ucHeRMoBAExXklWETg2bCCURNvj1ZSKfqE7g; athena_short_visit_id=bf9a3ea5-a9e1-4c8c-b637-655edaca65c7:1739369623; fornax_anonymousId=b1c357e8-d3b6-4a6d-9220-71d9367146a8",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("GraphQL API Error:", error);
      throw error;
    });
}

app.get("/get-product", async (req, res) => {
  let params = {
    id: req.query.id,
    sku: req.query.sku,
  };
  try {
    const result = await getProductAndSiteInfo(params);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product info" });
  }
});

// GraphQL Schema
app.get("/test", (req, res) => {
  res.send({
    data: "working",
  });
  res.statusCode(200);
});
// Allow public folder
app.use(express.static("./public"));

// Serve index file
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
