module.exports = ({ 
    product_id, 
    product_name, 
    product_sku, 
    product_price,
    short_description, 
    long_description,
    info_description,
    tech_specs, 
    defaultImage,
    images,
    thumbnails,
    datasheet_benefits,
    datasheet_features,
    product_type,
    device_compatibility,
    upc_code,
    unit_height,
    unit_width,
    unit_depth,
    unit_weight,
    height,
    width,
    depth,
    weight,
    warranty,
    certifications,
    rating,
    package_content,
    contact_name,
    contact_dep,
    contact_phone,
    contact_email,
    footer_company,
    footer_address,
    footer_email,
    footer_phone,
    footer_fax,
    footer_site
 }) => {
    const head = `
       <!doctype html>
       <html>
          <head>
             <meta charset="utf-8">
             <title>PDF Template</title>
             <style>
                /* FONTS */
                @font-face{font-family:Helvetica-Neue-Medium;src:url(https://shop.thejoyfactory.com/content/datasheet/fonts/Helvetica-Neue-Medium_22555.ttf)}
                @font-face{font-family:Helvetica-Neue-Light;src:url(https://shop.thejoyfactory.com/content/datasheet/fonts/Helvetica-Neue-Light_22503.ttf)}
                @font-face{font-family:HelveticaNeue;src:url(https://shop.thejoyfactory.com/content/datasheet/fonts/HelveticaNeue.ttf)}
                @font-face{font-family:Helvetica-Regular;src:url(https://shop.thejoyfactory.com/content/datasheet/fonts/Helvetica-Regular.ttf)}
 
                html, body {
                   font-size: 8px;
                   line-height: 12px;
                   font-family: "Helvetica-Neue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
                   font-weight: 400;
                   color: #333;
                   height: 100%;
                   width: 100%;
                   margin: 0;
                   left: 0;
                   top: 0;
                }
 
                .page {
                   width: 100%;
                }
 
                .bold {
                   font-weight: 900;
                }
 
                /* POSITIONING */
 
                .text-left {
                   text-align: left;
                }
 
                .text-right {
                   text-align: right;
                }
 
                .text-center {
                   text-align: center;
                   margin-left: auto;
                   margin-right: auto;
                }
 
                /* ----- FOOTER ----- */
                .pageFooter {
                   color: #58595b;
                   margin-left: 0px;
                   margin-right: 0px;
                   width: 100%;
                }
 
                .footer-company {
                   border-bottom: 1px solid #d0103a;
                   font-size: 8px;
                   font-weight: 700;
                   letter-spacing: 1px;
                }
 
                .footer-second-desc {
                   font-size: 6px;
                }
                
                .footer-icons td {
                   margin: 0px 3px;
                   text-align: center;
                }
                
                .footer-icons img {
                   padding: 0px;
                   width: 15px;
                }
 
                .footer-icons-text {
                   color: #6c6e70;
                   font-size: 7px;
                }
 
                .footer-logo {
                   margin: 0;
                   padding: 0;
                   position: relative;
                   top: 10px;
                   width: 50px;
                }
 
                /* ----- PAGE ONE - HEADER ----- */
                .product-header {
                   width: 100%;
                }
 
                .product-name {
                   font-family: Helvetica-Neue-Medium, Arial, "Lucida Grande", sans-serif;
                   font-size: 14pt;
                   font-weight: 700;
                   letter-spacing: 1px;
                   line-height: 14pt;
                   margin: 0px 0px 2px 0px;
                   padding: 0px 0px 0px 4px;
                   text-align: left;
                }
                
                .product-short-desc {
                   margin: 0px 0px 0px 4px;
                   padding: 0px 0px 0px 0px;
                }
 
                .hr-short {
                   border-top: 1px solid #d0103a;
                   margin: 3px 0px 4px 3px;
                   padding: 0;
                   width: 20px;
                }
 
                .product-sku-price p {
                   font-size: 8px;
                   font-weight: 700;
                   line-height: 1;
                   margin: 0px 0px 0px 3px;
                   padding: 0px;
                }
 
                .product-description {
                   vertical-align: top;
                   width: 65%;
                }
 
                .product-description ul {
                   margin: 0 0 0 25px;
                   padding: 0;
                }
 
                /* ----- PAGE ONE - BENEFITS ----- */
                .benefits {
                   color: white;
                   font-family: Helvetica-Neue-Medium;
                   font-size: 10px;
                   font-weight: 400;
                   background-color: #d0103a;
                   margin-bottom: 20px;
                   padding: 10px 10px;
                   text-align: left;
                   width: 100%;
                }
               
                .benefits-header {
                   text-transform: uppercase;
                   margin-bottom: 0px;
                }
 
                .benefits table {
                    width: 100%;
                }
               
                .benefits td {
                   padding: 10px 25px 0px 5px;
                   width: 30%;
                }
 
                /* ----- PAGE ONE - FEATURES ----- */
                .features {
                   font-family: Helvetica-Neue-Medium;
                   font-size: 9px;
                   font-weight: 400;
                   margin-bottom: 10px;
                   padding: 10px 10px;
                   text-align: left;
                   height: 200px;
                   width: 100%;
                }
               
                .features-header {
                   text-transform: uppercase;
                   margin-bottom: 0px;
                }
 
                .features table {
                    width: 100%;
                }
               
                .features td {
                   padding: 5px 10px 0px 5px;
                   width: 30%;
                }
 
                .features li {
                   list-style: none;
                }
               
                .feature-icon {
                   padding: 0px 5px 0px 0px;
                   position: relative;
                   top: 10px;
                   width: 25px;
                }
 
                /* ----- PAGE TWO - TECHNICAL SPECIFICATIONS ----- */
                .tech-specs-header {
                   background-color: #EDEDED;
                   font-size: 12px;
                   text-align: center;
                   text-transform: uppercase;
                   margin-bottom: 8px;
                   padding-top: 5px;
                   padding-bottom: 2px;
                   height: 35px;
                   width: 100%;
                }
 
                .tech-specs-header .underline {
                   border-bottom: 1px solid #d0103a;
                   margin: 0px;
                   padding: 0px 10px;
                   position: relative;
                   top: -10px;
                   width: 30px;
                }
                
                .tech-specs-container {
                   width: 100%;
                }
 
                .tech-specs-container .disclaimer {
                   font-size: 5px;
                }
 
                .tech-specs-container td {
                   vertical-align: top;
                }
                
                .tech-specs-image-container {
                   text-align: center;
                   width: 50%;
                }
 
                .tech-specs-image {
                   margin-left: auto;
                   margin-right: auto;
                   height: auto;
                   width: 100%;
                }
 
                .tech-specs {
                   border-left: 1px solid #ebeced;
                   text-align: left;
                   margin: 0px 0px 0px 0px;
                   padding: 0px 0px 0px 10px;
                   width: 100%;
                }
 
                .tech-specs ol {
                   margin: 0px;
                   padding-left: 10px;
                }
 
                .tech-specs li {
                   margin: 0px;
                   padding: 0px;
                }
 
                /* ----- Product Specifications ----- */
                .product-specifications {
                   background: #ebeced;
                   padding-bottom: 0px;
                }
 
                .product-specifications .product-name {
                   color: black;
                   font-family: Helvetica-Neue-Light;
                   font-size: 10px;
                   font-weight: 700;
                   padding-top: 0px;
                   padding-bottom: 0px;
                   padding-left: 10px;
                   text-align: left;
                }
 
                .product-specs-table {
                   text-align: left;
                   margin-bottom: 5px;
                   margin-left: 8px;
                   margin-right: 8px;
                   width: 97%;
                }
 
                .product-info-container {
                   vertical-align: top;
                   width: 35%;
                }
 
                .product-info-group {
                   color: #ffffff;
                   font-family: Helvetica-Neue-Medium;
                   font-size: 12px;
                   background-color: #d0103a;
                   padding: 25px 15px;
                }
 
                .product-info-group p {
                   padding: 3px 0px;
                   margin: 0;
                }
 
                .product-specs-inner-table {
                   color: black;
                   background: #ebeced;
                   border: solid 1px #C6C5C5;
                   border-collapse: collapse;
                   width: 100%;
                }
 
                .product-specs-inner-table th {
                   font-size: 7pt;
                   padding: 2px 0px 2px 10px;
                   width: 200px;
                }
 
                .product-specs-inner-table td {
                   padding: 0px 0px 0px 10px;
                   width: 200px;
                }
 
                .product-specs-inner-table tr:nth-child(even) {
                   background: #f2f3f3;
                }
 
                .product-specs-inner-table tr:nth-child(odd) {
                   background: #C6C5C5;
                }
 
                .product-specs-title {
                   color: white;
                   text-transform: uppercase;
                   background-color: #999999;
                }
 
                /* IMAGES */
                .product-images {
                   width: 35%;
                   padding: 10px;
                   text-align: center;
                }
 
                .default-image {
                   text-align: center;
                   margin-left: auto;
                   margin-right: auto;
                   height: auto;
                   width: 200px;
                }
 
                .thumbnail {
                   border: 1px solid #E7E7E7;
                   text-align: center;
                   margin-left: 3px;
                   margin-right: 3px;
                   padding: 0;
                   height: auto;
                   width: 50px;
                }
             </style>
          </head>
    `
 
    const page1header = `
       <div class="product-header">
          <div class="product-name">${product_name}</div>
          <p class="product-short-desc">${short_description}</p>
          <div class="hr-short"></div>
          <div class="product-sku-price">
             <p class="product-sku">SKU: ${product_sku}</p>
             <p class="product-price">MSRP: $${product_price}</p>
          </div>
       </div>
    `
 
    const page1 = `
       <body>
          <table class="page-one">
             <tr>
                <td class="product-description">
                   <span>${long_description}</span>
                   <span>${info_description}</span>
                </td>
                <td class="product-images">
                   <img class="default-image" src="${defaultImage.img320px}">
                   <p>
                      ${thumbnails}
                   </p>
                </td>
             </tr>
          </table>
          <div class="benefits">
             <span class="benefits-header">Benefits</span><br>
             <table>
                ${datasheet_benefits}
             </table>
          </div>
          <div class="features">
             <span class="features-header">Features</span><br>
             <table>
                ${datasheet_features}
             </table>
          </div>
    `
 
    const page2header = `
       <div class="tech-specs-header">
          <p>
             Technical Specifications
             <br>
             <span class="underline"></span>
          </p>
       </div>
    `
 
    const page2 = `
    <div class="page-two">
       <table class="tech-specs-container">
          <tr>
             <td class="tech-specs-image-container">
                <img class="tech-specs-image" src="${images[images.length-1].node.img320px}">
                <p class="disclaimer">The information on this data sheet is subject to change at any time at the discretion of The Joy Factory</p>
             </td>
             <td class="tech-specs-content-container">
                <p class="tech-specs">${tech_specs}</p>
             </td>
          </tr>
       </table>
       
       <div class="product-specifications">
          <table class="product-specs-table">
          <tr>
             <td class="product-info-container">
                <div class="product-name">
                   <p>${product_name}</p>
                </div>
                <table class="product-info-inner-table">
                   <tr>
                      <div class="product-info-group">
                         <p>SKU: ${product_sku}</p>
                         <p>Product type: ${product_type}</p>
                         <p>MSRP: $${product_price}</p>
                      </div>
                   </tr>
                </table>
             </td>
             <td class="product-specs-container">
                <table class="product-specs-inner-table">
                   <th class="product-specs-title">Product Specifications</th>
                   <tr>
                    <td>Compatible with: ${device_compatibility}</td>
                   </tr>
                   <tr>
                      <td>Product height: ${unit_height} in</td>
                   </tr>
                   <tr>
                      <td>Product width: ${unit_width} in</td>
                   </tr>
                   <tr>
                      <td>Product thickness: ${unit_depth} in</td>
                   </tr>
                   <tr>
                      <td>Product weight: ${unit_weight} lb</td>
                   </tr>
                   <tr>
                      <td>Package height: ${height.value} ${height.unit}</td>
                   </tr>
                   <tr>
                      <td>Package width: ${width.value} ${width.unit}</td>
                   </tr>
                   <tr>
                      <td>Package depth: ${depth.value} ${depth.unit}</td>
                   </tr>
                   <tr>
                      <td>Package weight: ${weight.value} ${weight.unit}</td>
                   </tr>
                   <tr>
                      <td>UPC: ${upc_code}</td>
                   </tr>
                   <tr>
                      <td>Warranty: ${warranty}</td>
                   </tr>
                   <tr>
                      <td>Certifications: ${certifications}</td>
                   </tr>
                   <tr>
                      <td>Rating: ${rating}</td>
                   </tr>
                   <tr>
                      <td>Package content: ${package_content}</td>
                   </tr>
                </table>
             </td>
          </tr>
          </table>
       </div>
    </div>
    `
 
    const contact_table = `
       <div class="contact-table" style="margin: 10px 0 20px 0; padding: 10px;">
       <table class="contact" style="background: white; width: 100%;">
          <tr>
             <td class="text-center" style="padding: 5px 10px; width: 20%;">
                <img src="https://shop.thejoyfactory.com/content/datasheet/logo.png" alt="The Joy Factory logo." style="width:70px;">
             </td>
             <td class="text-left" style="padding: 5px 30px; width: 30%;">
                <p style="font-size: 1.25rem; font-weight: bold;">${contact_name}</p>
                <p style="font-size: 0.9rem; font-weight: bold;">${contact_dep}</p>
             </td>
             <td class="text-left" style="border-left:solid 2px red; padding: 5px 30px; width: 50%;">
                <p>Direct Phone Number | ${contact_phone}</p>
                <p>Email Address | ${contact_email}</p>
             </td>
          </tr>
       </table>
       </div>
    `
 
    const footer = `
          <table class="pageFooter">
             <tr>
                <td style="width:70%;">
                   <table>
                      <tr>
                         <td class="footer-company">${footer_company}</td>
                      </tr>
                      <tr>
                         <td class="footer-second-desc">${footer_address} | ${footer_email} | T : ${footer_phone} | F : ${footer_fax} | ${footer_site}</td>
                      </tr>
                   </table>
                </td>
                <td style="width:20%;">
                   <table class="footer-icons">
                      <tr>
                         <td class="footer-image"><img src="https://shop.thejoyfactory.com/content/datasheet/protect.jpg" alt="The Joy Factory Protect Icon"></td>
                         <td class="footer-image"><img src="https://shop.thejoyfactory.com/content/datasheet/secure.jpg" alt="The Joy Factory Secure Icon"></td>
                         <td class="footer-image"><img src="https://shop.thejoyfactory.com/content/datasheet/position.jpg" alt="The Joy Factory Position Icon"></td>
                      </tr>
                      <tr>
                         <td class="footer-icons-text">Protect</td>
                         <td class="footer-icons-text">Secure</td>
                         <td class="footer-icons-text">Position</td>
                      </tr>
                   </table>
                </td>
                <td style="width:10%;">
                   <img class="footer-logo" src="https://shop.thejoyfactory.com/content/datasheet/logo.png" alt="The Joy Factory logo." />
                </td>
             </tr>
          </table>
    `
 
    const footerFirst = `
       <div id="pageFooter-first">
          ${footer}
       </div>
    `
 
    const footer2 = `
       <div id="pageFooter-2">
          ${footer}
       </div>
    `
 
    const close = `
       </body>
       </html>
    `
 
 return `${head}${page1header}${page1}${footerFirst}${page2header}${page2}${footer2}${close}`;
 };