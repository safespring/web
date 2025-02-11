module.exports = {
  multipass: true,
  plugins: [
    { name: "cleanupAttrs" },
    { name: "removeDoctype" },
    { name: "removeXMLProcInst" },
    { name: "removeComments" },
    { name: "removeMetadata" },
    { name: "removeTitle" },
    { name: "removeDesc" },
    { name: "removeUselessDefs" },
    { name: "removeEditorsNSData" },
    { name: "removeEmptyAttrs" },
    { name: "removeHiddenElems" },
    { name: "removeEmptyText" },
    { name: "removeEmptyContainers" },
//    { name: "removeViewBox" },
    { name: "cleanupEnableBackground" },
    { name: "convertStyleToAttrs" },
    { name: "convertColors" },
    { 
      name: "convertPathData",
      params: {
        floatPrecision: 2,
        transformPrecision: 2,
        noSpaceAfterFlags: false
      }
    },
    { name: "convertTransform" },
    {
      name: "removeUnknownsAndDefaults",
      params: { keepDataAttrs: false }
    },
    { name: "removeNonInheritableGroupAttrs" },
    { name: "removeUselessStrokeAndFill" },
    { name: "convertShapeToPath" },
    { name: "mergePaths" },
    { name: "collapseGroups" },
    { name: "minifyStyles" },
    { name: "sortAttrs" },
//    { name: "removeDimensions" },
//    { name: "removeStyleElement" },
    { name: "removeScriptElement" }
  ]
};

