<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    exclude-result-prefixes="sitemap">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <!-- Matchar rot-elementet -->
  <xsl:template match="/">
    <html lang="sv">
      <head>
        <title>Sitemap för {{ .Site.Title }}</title>
        <meta charset="UTF-8"/>
        <style type="text/css">
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f7f7f7;
          }
          h1 {
            color: #333;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          th, td {
            text-align: left;
            padding: 12px;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
          tr:nth-child(even){
            background-color: #f2f2f2;
          }
          a {
            color: #4CAF50;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>Sitemap för {{ .Site.Title }}</h1>
        <table>
          <tr>
            <th>URL</th>
            <th>Senast ändrad</th>
            <th>Ändringsfrekvens</th>
            <th>Prioritet</th>
          </tr>
          <xsl:apply-templates select="urlset/url"/>
        </table>
      </body>
    </html>
  </xsl:template>

  <!-- Template för varje URL -->
  <xsl:template match="url">
    <tr>
      <td><a href="{loc}"><xsl:value-of select="loc"/></a></td>
      <td><xsl:value-of select="lastmod"/></td>
      <td><xsl:value-of select="changefreq"/></td>
      <td><xsl:value-of select="priority"/></td>
    </tr>
  </xsl:template>

</xsl:stylesheet>