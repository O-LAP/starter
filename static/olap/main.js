document.addEventListener('DOMContentLoaded', function(event) {
	run();
})



async function run() {

  let OLAP_FW_SRC_URL = '/olap/js/OLAPFramework.js';
  let olapFwRsrc = await fetch(OLAP_FW_SRC_URL);
  let olapFwRsrcText = await olapFwRsrc.text();
  eval.apply(window, [olapFwRsrcText]);


  let OLAP_DESIGN_SRC_URL = '/Design.js';
  let olapDsRsrc = await fetch(OLAP_DESIGN_SRC_URL);
  let olapDsRsrcText = await olapDsRsrc.text();
  eval.apply(window, [olapDsRsrcText]);
  OLAP.openDesign(Design);

}





