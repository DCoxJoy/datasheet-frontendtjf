import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import LoadingSpinner from '../components/LoadingSpinner';
import '../App.css';
import '../components/Datasheet.css';
import '../components/Options.css';
import testData from '../testdata.json';

let productData = {
  product_id: 0,
  product_name: '',
  product_type: '',
  product_sku: '',
  product_price: '',
  short_description: '',
  long_description: '',
  info_description: '',
  tech_specs: '',
  defaultImage: [],
  images: [],
  thumbnails: '',
  datasheet_benefits: '',
  datasheet_features: '',
  device_compatibility: '',
  package_content: '',
  warranty: '',
  certifications: '',
  rating: '',
  upc_code: '',
  unit_height: '',
  unit_width: '',
  unit_depth: '',
  unit_weight: '',
  height: {},
  width: {},
  depth: {},
  weight: {},
  contact_name: 'The Joy Factory',
  contact_dep: 'Sales Team',
  contact_phone: '949.382.1552',
  contact_email: 'sales@shop.thejoyfactory.com',
  footer_company: 'The Joy Factory Inc.',
  footer_address: '16811 Hale Ave Bldg D, Irvine, CA 92606',
  footer_email: 'sales@shop.thejoyfactory.com',
  footer_phone: '949.216.8869',
  footer_fax: '949.216.8869',
  footer_site: 'www.shop.thejoyfactory.com'
}

const Sales = () => {
  // initialize props
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    store_url: "https://shop.thejoyfactory.com",
    id: null,
    sku: null,
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJlYXQiOjIxNDcxMjY0MDAsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxLCJjb3JzIjpbImh0dHBzOi8vZGF0YXNoZWV0LWRlbW8uaGVyb2t1YXBwLmNvbSJdLCJjaWQiOjEsImlhdCI6MTU5NTkyNDE5MCwic3ViIjoianYwbXNnZXcyY3U2cHF6NGhtd200MmhtamtseXh0NiIsInNpZCI6MTAwMDY3NjI0MCwiaXNzIjoiQkMifQ.GwsvV50ENH8X5J1UQ61w3Nq_8d-YrgVxecipSVuEJvDYpT5KOXf71mwjvV4m5U0B7Ac-pU0oF0tjnaN1LdJ04A"
  });
  const [sku, setSku] = useState(params.sku);
  const [contact, setContact] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reseller, setReseller] = useState([]);
  const [resellers, setResellers] = useState([]);

  const handlePreview = (e) => {
    e.preventDefault();
    setParams(params[sku] = sku);
    console.log('HandlePreview ran.');
    console.log('Sku Changed: ', sku);
    console.log('Params Changed: ', params);
  }
  
  // load data into props on pageload
  useEffect(() => {
    const getContacts = async () => {
      const res = await fetch('https://datasheet-app.shop.thejoyfactory.com/contacts');
      const data = await res.json();
      setContacts(data);
    }

    const getResellers = async () => {
      const res = await fetch('https://datasheet-app.shop.thejoyfactory.com/resellers');
      const data = await res.json();
      setResellers(data);
    }

    const fetchData = () => {
      console.log("FetchData started...");
      const pageUrl = new URL(window.location);
      const searchParams = pageUrl.searchParams;
      console.log(`Search Params: ${searchParams}`);

      /*
          Utility functions for rendering
      */

      // Based on the browser locale, provide a localized price
      function formatLocalizedPrice (price) {
          return new Intl.NumberFormat(navigator.language, {style: 'currency', currency: price.currencyCode}).format(price.value);
      }

      // Create a srcset string for responsive images
      function renderSrcset(image) {
          return `${image.img320px} 320w, ${image.img640px} 640w, ${image.img960px} 960w, ${image.img1280px} 1280w`
      }

      // Function to strip HTML from product descriptions, leaving just the text
      function stripHtml(html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          return doc.body.textContent || "";
      }

      // Function to strip link tags from product descriptions
      function stripLinks(desc) {
        let cleanDesc = '';
        let regexValid = false;
        try {
          // Check if there are links in the Tech Specs Description
          new RegExp(/<a.*?>[^<]*<\/a>/);
          regexValid = true;
        } catch(e) {
          regexValid = false;
        }
        // If a link is found, also remove the double BR tags
        if(regexValid) {
          let removedFirstBR = desc.replace(/<br><br>/, "");
          cleanDesc = removedFirstBR.replace(/<a.*?>[^<]*<\/a>/g, "");
          return cleanDesc;
        } else {
          return desc;
        }
      }

      function findProductType(fields) {
        fields.forEach((field) => {
          if(field.node.name === "product_type") {
            productData.product_type = field.node.value;
          }
        })
      }

      function findDeviceCompatibility(fields) {
        fields.forEach((field) => {
          if(field.node.name === "device_compatibility") {
            let device_compatibility = field.node.value;
            productData.device_compatibility =  device_compatibility.replace(',', ' | ');
          }
        })
      }

      function findCertifications(fields) {
        fields.forEach((field) => {
          if(field.node.name === "certifications") {
            let certifications = field.node.value;
            productData.certifications = certifications.replace(',', ' | ');
          }
        })
      }

      function findRating(fields) {
        fields.forEach((field) => {
          if(field.node.name === "rating") {
            let rating = field.node.value;
            productData.rating = rating.replace(',', ' | ');
          }
        })
      }

      function findPackageContent(fields) {
        fields.forEach((field) => {
          if(field.node.name === "package_content") {
            productData.package_content = field.node.value;
          }
        })
      }

      function splitProductDescription(desc) {
        var array = desc.split("&lt;!-- split --&gt;");
        productData.short_description = stripHtml(array[0]);
        productData.long_description = array[1];
        productData.info_description = array[2];
        productData.tech_specs = stripLinks(array[3]);
      }

      function generateThumbnails(images) {
        let thumbnails = '';
        images.forEach((image, index) => {
          if(index !== 0 && index < 4)
          thumbnails += `<img class="thumbnail" src="${image.node.img320px}">`
        });
        productData.thumbnails = thumbnails;
      }

      function findBenefits(fields) {
        var benefits;
        fields.forEach((field) => {
          if(field.node.name === "datasheet_benefits") {
            benefits = field.node.value;
          }
        })
        var array = benefits.split(",");
        array.forEach((item, index) => {
          if(index % 3 === 0) {
            productData.datasheet_benefits += `<tr>`;
          }
          productData.datasheet_benefits += `<td><li>${item}</li></td>`;
          if(index === 2 || index === 5) {
            productData.datasheet_benefits += `</tr>`;
          }
        })
      }

      function findFeatures(fields) {
        let features;
        let productLine;
        let axtionSeries;
        fields.forEach((field) => {
          if(field.node.name === "datasheet_features") {
            features = field.node.value;
          }
        })
        fields.forEach((field) => {
          if(field.node.name === "product_line") {
            productLine = field.node.value;
          }
        })
        fields.forEach((field) => {
          if(field.node.name === "axtion_series") {
            axtionSeries = field.node.value;
          }
        })
        let featureList = features.split(",");
        let icons = findFeatureIcons(featureList, productLine, axtionSeries);
        featureList.forEach((item, index) => {
          if(index % 3 === 0) {
            productData.datasheet_features += `<tr>`;
          }
          productData.datasheet_features += `<td><li class="feature-item"><img class="feature-icon" src="${icons[index]}">${item}</li></td>`;
          if(index === 2 || index === 5) {
            productData.datasheet_features += `</tr>`;
          }
        })
      }

      function findFeatureIcons(features, productLine, axtionSeries) {
        let domain = 'https://shop.thejoyfactory.com/content/datasheet/icons/';
        let iconsrc = [];

        features.forEach((item, index) => {
          let spaceToDash = item.replace(/ /g, "-");
          let icon = '';

          if(axtionSeries != null) {
            icon = `${domain}${productLine}-${axtionSeries}-${spaceToDash}.png`
          } else {
            icon = `${domain}${productLine}-${spaceToDash}.png`
          }

          let url = icon.toLowerCase();
          iconsrc.push(url);
        })
        return iconsrc;
      }

      function getUpcCode(fields) {
        fields.forEach((field) => {
          if(field.node.name === "upc_code") {
            productData.upc_code = field.node.value;
          }
        })
      }

      function getUnitDimensions(fields) {
        fields.forEach((field) => {
          // Get unit height
          if(field.node.name === "unit_height") {
            productData.unit_height = field.node.value;
          }
          // Get unit width
          else if(field.node.name === "unit_width") {
            productData.unit_width = field.node.value;
          }
          // Get unit depth
          else if(field.node.name === "unit_depth") {
            productData.unit_depth = field.node.value;
          }
          // Get unit weight
          else if(field.node.name === "unit_weight") {
            productData.unit_weight = field.node.value;
          }
        })
      }

      // Assign data values into state
      function handleData(data) {
        const product = data.site.product;
        console.log('Assigning new values to state...');
        productData.product_id = product.entityId;
        productData.product_name = product.name;
        findProductType(product.customFields.edges);
        getUpcCode(product.customFields.edges);
        getUnitDimensions(product.customFields.edges);
        findCertifications(product.customFields.edges);
        findRating(product.customFields.edges);
        productData.product_sku = product.sku;
        productData.product_price = product.prices.price.value;
        splitProductDescription(product.description);
        productData.defaultImage = product.defaultImage;
        productData.images = product.images.edges;
        generateThumbnails(product.images.edges);
        findBenefits(product.customFields.edges);
        findFeatures(product.customFields.edges);
        productData.warranty = product.warranty;
        productData.depth = product.depth;
        productData.height = product.height;
        productData.weight = product.weight;
        productData.width = product.width;
        findPackageContent(product.customFields.edges);
        findDeviceCompatibility(product.customFields.edges);
      }

      /*
          Page rendering logic
      */
      function renderPage(data) {
          // Render the HTML for the product
          console.log(data);
          
          const product = data.site.product;
          console.log(product);

          handleData(data);

          document.getElementById('product').innerHTML = renderProduct(productData);
      }

      function renderProduct(product) {
          // Footer
          const footer = `
            <table class="footer text-left">
              <tr>
                  <td style="width:73%;">
                    <table>
                    <tr>
                      <td class="footer-company" style="width:73%;">The Joy Factory Inc.</td>
                    </tr>
                    <tr>
                      <td class="footer-second-desc">${product.footer_address} <span style="color: #d0103a;">|</span> ${product.footer_email} <span style="color: #d0103a;">|</span> T : ${product.footer_phone} <span style="color: #d0103a;">|</span> F : ${product.footer_fax} <span style="color: #d0103a;">|</span> ${product.footer_site}</td>
                    </tr>
                    </table>     
                  </td>
                  <td style="width:16.5%;">
                    <table class="footer-icons" style="width:100%;">
                      <tr>
                        <td class="footer-image"><img src="https://shop.thejoyfactory.com/content/datasheet/protect.jpg" alt="The Joy Factory Protect Icon"></td>
                        <td class="footer-image"><img src="https://shop.thejoyfactory.com/content/datasheet/secure.jpg" alt="The Joy Factory Secure Icon"></td>
                        <td class="footer-image"><img src="https://shop.thejoyfactory.com/content/datasheet/position.jpg" alt="The Joy Factory Position Icon"></td>
                      </tr>
                      <tr>
                        <td class="footer-image-content">Protect</td>
                        <td class="footer-image-content">Secure</td>
                        <td class="footer-image-content">Position</td>
                      </tr>
                    </table>
                  </td>
                  <td align="center" style="width:10.5%;">
                    <img src="https://shop.thejoyfactory.com/content/datasheet/logo.png" alt="The Joy Factory logo." style="width:100px;">
                  </td>
              </tr>
            </table>
            `

          // Contact Section - currently not used on customer preview
          const contact = `
            <div class="contact-table" style="margin: 10px 0 300px 0; padding: 10px;">
              <table class="contact" style="background: white; width: 100%;">
                <tr>
                  <td class="text-center" style="padding: 5px 30px; width: 25%;">
                    <img src="https://shop.thejoyfactory.com/content/datasheet/logo-lg.png" alt="The Joy Factory logo." style="width:100px;">
                  </td>
                  <td class="text-left" style="padding: 5px 30px; width: 25%;">
                    <p style="font-size: 1.25rem; font-weight: bold;">${product.contact_name}</p>
                    <p style="font-size: 0.9rem; font-weight: bold;">${product.contact_dep}</p>
                  </td>
                  <td class="text-left" style="border-left:solid 2px red; padding: 5px 30px; width: 50%;">
                    <p>Direct Phone Number | ${product.contact_phone}</p>
                    <p>Email Address | ${product.contact_email}</p>
                  </td>
                </tr>
              </table>
            </div>
          `

          // Render the product into a preview
          return `
            <!-- Start: Page One -->
            <div class="page" id="page-one">
              <table class="text-left">
                <tr>
                  <td class="product-header">
                    <h1 class="product-name">${product.product_name}</h1>
                    <p class="product-short-desc">${product.short_description}</p>
                    <hr class="hr-short hr-left">
                    <div class="product-sku-price">
                      <p class="product-sku">SKU: ${product.product_sku}</p>
                      <p class="product-price">MSRP: $${product.product_price}</p>
                    </div>
                  </td>
                </tr>
              </table>
              <table class="product-desc-container">
                <tr>
                  <td class="product-description">
                    ${product.long_description}
                    ${product.info_description}
                  </td>
                  <td class="product-images">
                    ${product.defaultImage ? `<img class="default-image" src="${product.defaultImage.img320px}" alt="The Joy Factory product image">` : ''}
                    <p>
                      ${product.thumbnails}
                    </p>
                  </td>
                </tr>
              </table>
              <div class="benefits">
                <span class="benefits-header">Benefits</span>
                <br>
                <table>
                    ${product.datasheet_benefits}
                </table>
              </div>
              <div class="features">
                <span class="features-header">Features</span>
                <br>
                <table>
                    ${product.datasheet_features}
                </table>
              </div>
              ${footer}
            </div>
            <!-- End: Page One -->

            <!-- Start: Page Two -->
            <div class="page" id="page-two">
              <div class="tech-specs-header">
                <p>
                  Technical Specifications
                  <br>
                  <span class="underline"></span>
                </p>
              </div>
              <table class="tech-specs-container">
                <tr>
                  <td class="tech-specs-image-container" style="padding: 0 25px;">
                    ${product.images[product.images.length-1] ? `<img class="tech-spec-image" src="${product.images[product.images.length-1].node.img320px}" alt="The Joy Factory product image">` : ''}
                    <p class="disclaimer" style="font-size: 7px;">The information on this data sheet is subject to change at any time at the discretion of The Joy Factory</p>
                  </td>
                  <td class="tech-specs">
                    ${product.tech_specs}
                  </td>
                </tr>
              </table>
              <div class="product-specifications">
                <table class="product-specs-table">
                  <tr>
                    <td class="product-info-container">
                      <div class="product-name text-left">
                        ${product.product_name}
                      </div>
                      <table class="product-info-inner-table">
                        <tr>
                          <div class="product-info-group">
                            <p>SKU: ${product.product_sku}</p>
                            <p>Product type: ${product.product_type}</p>
                            <p>MSRP: $${product.product_price}</p>
                          </div>
                        </tr>
                      </table>
                    </td>
                    <td class="product-specs-container">
                      <table class="product-specs-inner-table">
                        <th class="product-specs-title">Product Specifications</th>
                        <tr>
                          <td>Compatible with: ${product.device_compatibility}</td>
                        </tr>
                        <tr>
                          <td>Product height: ${product.unit_height} in</td>
                        </tr>
                        <tr>
                          <td>Product width: ${product.unit_width} in</td>
                        </tr>
                        <tr>
                          <td>Product thickness: ${product.unit_depth} in</td>
                        </tr>
                        <tr>
                          <td>Product weight: ${product.unit_weight} lb</td>
                        </tr>
                        <tr>
                          <td>Package height: ${product.height.value} ${product.height.unit}</td>
                        </tr>
                        <tr>
                          <td>Package width: ${product.width.value} ${product.width.unit}</td>
                        </tr>
                        <tr>
                          <td>Package depth: ${product.depth.value} ${product.depth.unit}</td>
                        </tr>
                        <tr>
                          <td>Package weight: ${product.weight.value} ${product.weight.unit}</td>
                        </tr>
                        <tr>
                          <td>UPC: ${product.upc_code}</td>
                        </tr>
                        <tr>
                          <td>Warranty: ${product.warranty}</td>
                        </tr>
                        <tr>
                          <td>Certifications: ${product.certifications}</td>
                        </tr>
                        <tr>
                          <td>Rating: ${product.rating}</td>
                        </tr>
                        <tr>
                          <td>Package content: ${product.package_content}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
              ${footer}
            </div>
            <!-- End: Page Two -->
          `
      }

      function renderPrice(prices) {
          // Render the price component from the supplied prices
          return `<span></span>`
      }

      /*
          API fetching
      */
      function getProductAndSiteInfo() {
          const storeUrl = new URL(params.store_url);

          // Use the store's canonical URL which should always resolve
          const graphQLUrl = `${storeUrl.origin}/graphql`;

          // Set up GraphQL query
          // If specific product IDs were supplied, fetch them, else just get the first few products
          const graphQLQuery = `
          query SingleProduct {
            site {
              product(entityId: ${params.sku}) {
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
          }`

          // Fetch data from the GraphQL Storefront API
          return fetch(graphQLUrl, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json',
                      'Authorization': `Bearer ${params.token}`},
            body: JSON.stringify({ query: graphQLQuery}),
          })
          .then(res => res.json())
          .then(res => res.data);
      }

      // Set up default params (token expires 1/15/2038)
      Object.keys(params).forEach(function (key) {
        if (searchParams.get(key)) {
            params[key] = searchParams.get(key);
        }
      });

      // Use testdata.json file as testData
      renderPage(testData);

      console.log('Params: ', params);

      // Check for required parameters, throw an error if they're not found
      // if (!(params.store_url && params.token)) {
      //     throw new Error('At least one of the required URL parameters (Store URL, Token) was not supplied or was invalid');
      // } else {
      //     // It seems like the required parameters were supplied, try to load the product data from the Storefront API
      //     getProductAndSiteInfo(params).then(data => {
      //         // With our data loaded, render the product listing
      //         renderPage(data);
            
      //     }).catch(e => {
      //       // Some error was encountered
      //       console.log(`Error: failed to fetch product data.`);
      //       throw(e);
      //     });
      // }
    }

    getContacts();
    getResellers();
    fetchData();
  }, [sku, params, contact, reseller]);

  // Currently being used to handle PDF Download
  const downloadPdf = () => {
    setLoading(true);
  
    axios.post('/download-pdf', productData)
    .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      saveAs(pdfBlob, `datasheet-${productData.product_sku}.pdf`);
      setLoading(false);
    })
  }

  return (
    <div className="Sales">
      <div className="Options row">

        <form className="form-options row" onSubmit={handlePreview}>
          <div className="sku-select col-12 col-md-3">
            <div className="form-group">
              <label className="col-form-label" htmlFor="inputsku">Enter Product SKU</label>
              <input type="text" className="form-control" id="inputsku" placeholder="CWA304" name="productSku" value={sku} onChange={e => setSku(e.target.value)} />
            </div>
          </div>
          <div className="contact-select col-12 col-md-3">
            <div className="form-group">
              <label className="col-form-label" htmlFor="form-contact-select">Select Contact</label>
              <select className="form-control" id="form-contact-select" name="contact">
                <option value="1-contact">1</option>
                <option value="2-contact">2</option>
                <option value="3-contact">3</option>
                <option value="4-contact">4</option>
              </select>
            </div>
          </div>
          <div className="reseller-select col-12 col-md-3">
            <div className="form-group">
              <label className="col-form-label" htmlFor="form-reseller-select">Select Reseller</label>
              <select className="form-control" id="form-reseller-select" name="reseller" value={reseller}>
                <option value="1-reseller">1</option>
                <option value="2-reseller">2</option>
                <option value="3-reseller">3</option>
                <option value="4-reseller">4</option>
              </select>
            </div>
          </div>
          <div className="option-buttons col-12 col-md-3">
            <div className="option-buttons-wrapper">
              <input className="option-preview btn btn-primary" type="submit" value="Preview" />
              <button className="option-download btn btn-primary" onClick={downloadPdf}>Download</button>
            </div>
          </div>

        </form>
      </div>

      <div className="container">
        <div className="LoadingSpinner-wrapper">
          {loading ? <LoadingSpinner /> : ''}
        </div>
        <div className="py-5" id="intro"><h1>Sales Datasheet Preview</h1></div>
        <div id="product"></div>
      </div>
    </div>
  )
}

export default Sales