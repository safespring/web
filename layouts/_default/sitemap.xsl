<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="sitemap">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <!-- Matchar rot-elementet -->
  <xsl:template match="/">
    <html lang="sv">
      <head>
        <title>Sitemap for Safespring</title>
        <meta charset="UTF-8"/>
        <style type="text/css">
          :root {
          --main-color:#195F8C;
          --heading-color:#195F8C;
          --button-color:#f4670f;
          --link-color:#f4670f;
          --alt-color:#323232;
          --text-color:#FFF;
          --content-color:#EEF2F4;
          --web-green-color:#19F064;
          --middle-blue-color:#417DA5;
          --green-color:#32CD32;
          --clear-blue-color:#3C9BCD;
          --cloud-blue-color:#E8EFF3;
          --hind-font:"Hind", sans-serif;
          --hind-font-semibold:"Hind SemiBold", sans-serif;
          --mon-font:"Montserrat", sans-serif;
          --mon-font-italic:"Montserrat Italic", sans-serif;
          --extra-light-weight:100;
          --light-weight:200;
          --hind-light-weight:300;
          --normal-weight:400;
          --medium-weight:500;
          --heavy-weight:599;
          --reg-shadow:2px 3px 9px 0 rgba(0, 0, 0, 0.10);
          --tran-shadow:0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
          --width-Ckb:40px;
          --checkedColor:rgba(33, 150, 243, 1);
          --unCheckedColor:rgba(220, 220, 220, 1);
          --height-Ckb:(var(--width-Ckb)*0.5625);
          --transitionSpeed:0.05s;
          --border:var(--width-Ckb) - var(--height-Ckb)/10;
          }
          @font-face {
          font-family: 'Montserrat';
          src: url('/fonts/Montserrat-VariableFont_wght.ttf') format('truetype');
          }

          @font-face {
          font-family: 'Montserrat';
          src: url('/fonts/Montserrat-Italic-VariableFont_wght.ttf') format('truetype');
          font-style: italic;
          }

          @font-face {
          font-family: 'Hind';
          src: url('/fonts/Hind-Light.ttf') format('truetype');
          }

          @font-face {
          font-family: 'Hind SemiBold';
          src: url('/fonts/Hind-SemiBold.ttf') format('truetype');
          }

          @font-face {
          font-family: 'Safespring Mono';
          src: url('/fonts/Safespring-Mono-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          }

          @font-face {
          font-family: 'Safespring Mono';
          src: url('/fonts/Safespring-Mono-Italic.ttf') format('truetype');
          font-weight: normal;
          font-style: italic;
          }

          @font-face {
          font-family: 'Safespring Mono';
          src: url('/fonts/Safespring-Mono-Medium.ttf') format('truetype');
          font-weight: 500;
          font-style: normal;
          }

          @font-face {
          font-family: 'Safespring Mono';
          src: url('/fonts/Safespring-Mono-MediumItalic.ttf') format('truetype');
          font-weight: 500;
          font-style: italic;
          }

          @font-face {
          font-family: 'Safespring Mono';
          src: url('/fonts/Safespring-Mono-SemiBold.ttf') format('truetype');
          font-weight: 600;
          font-style: normal;
          }

          @font-face {
          font-family: 'Safespring Mono';
          src: url('/fonts/Safespring-Mono-SemiBoldItalic.ttf') format('truetype');
          font-weight: 600;
          font-style: italic;
          }

          body {
          padding:3%;
          }

          h1 {
          padding-top:60px;
          font:var(--hind-light-weight) 50px var(--hind-font);
          color:var(--heading-color);
          line-height:50px;
          margin-bottom:10px;
          }

          table {
          border-spacing:0;
          /*box-shadow:2px 3px 9px 0 rgba(0, 0, 0, 0.10);
          padding:5%;
          background-color:white;
          border-radius:10px;*/;
          margin:40px 0 80px 0;
          }

          table.width100 {
          width:100% !important;
          }

          thead {
          font:18px/1 var(--hind-font);
          color:var(--clear-blue-color);
          }

          tbody {
          margin:0;
          }

          th {
          font:18px/1 var(--hind-font);
          color:var(--clear-blue-color);
          font-weight:300;
          text-align:left;
          /*border-bottom:1px solid var(--cloud-blue-color);*/;
          padding:10px 20px;
          background-color:none !important;
          }

          td {
          font:16px/1 var(--mon-font);
          font-weight:300;
          padding:10px 20px;
          /*border-bottom:1px solid var(--cloud-blue-color);*/;
          }

          td:first-child a {
          font-weight:599;
          color:var(--main-color);
          text-decoration:none;
          }

          tr:hover {
          background-color:var(--cloud-blue-color) !important;
          }

          tr:nth-child(odd) td {
          background-color:#e8eff34d;
          }

          tr:last-child td {
          border-bottom:1px solid var(--cloud-blue-color);
          }


          td:first-child,
          th:first-child {
          border-radius:10px 0 0 10px !important;
          }


          td:last-child,
          th:last-child {
          border-radius:0 10px 10px 0 !important;
          }

          @media screen and (max-width:650px) {
          table {
          border:0;
          width:100%;
          }

          table caption {
          font-size:1.3em;
          }

          table thead {
          border:none;
          clip:rect(0 0 0 0);
          height:1px;
          margin:-1px;
          overflow:hidden;
          padding:0;
          position:absolute;
          width:1px;
          }

          table tr {
          border-bottom:1px solid var(--main-color);
          display:block;
          margin-bottom:10px;
          padding-bottom:7px;
          }

          table td {
          border-bottom:1px solid var(--cloud-blue-color);
          display:block;
          font-size:.8em;
          text-align:right;
          }

          table td::before {
          content:attr(data-label);
          float:left;
          font-weight:;
          font:15px/1 var(--hind-font);
          color:var(--clear-blue-color);
          }

          table td:last-child {
          border-bottom:0;
          }

          td:first-child,;
          th:first-child {
          border-radius:0;
          }

          td:last-child,;
          th:last-child {
          border-radius:0;
          }

          td:first-child {
          font-weight:599;
          color:var(--main-color);
          }
          td {
          text-align:right !important;
          white-space: pre-wrap;
          }
          }
        </style>
      </head>
      <body>
        <img src="/img/logos/safespring_logotype_blue_svg.svg" alt="Safespring logotype" style="width:140px" />
        <h1>Sitemap for Safespring</h1>
        <table>
          <tr>
            <th>URL</th>
            <th>Last modified</th>
            <th>Change frequency</th>
            <th>Priority</th>
          </tr>
          <xsl:apply-templates select="sitemap:urlset/sitemap:url"/>
        </table>
      </body>
    </html>
  </xsl:template>

  <!-- Template för varje URL -->
  <xsl:template match="sitemap:url">
    <tr>
      <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
      <td><xsl:value-of select="sitemap:lastmod"/></td>
      <td><xsl:value-of select="sitemap:changefreq"/></td>
      <td><xsl:value-of select="sitemap:priority"/></td>
    </tr>
  </xsl:template>

</xsl:stylesheet>