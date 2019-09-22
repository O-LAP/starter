document.addEventListener('DOMContentLoaded', function(event) {
	run();
})



async function run() {

  let OLAP_FW_SRC_URL = '/olap/js/OLAPFramework.js';
  let olapFwRsrc = await fetch(OLAP_FW_SRC_URL);
  let olapFwRsrcText = await olapFwRsrc.text();
  eval.apply(window, [olapFwRsrcText]);


  let OLAP_DESIGN_SRC_URL = '/Design.js';
  loadDesignFromURL(OLAP_DESIGN_SRC_URL);


}









async function loadDesignFromURL(designJSUrl) {

  let olapDsRsrc = await fetch(designJSUrl);
  let olapDsRsrcText = await olapDsRsrc.text();
  eval.apply(window, [olapDsRsrcText]);
  OLAP.openDesign(Design);

}


