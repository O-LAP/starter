document.addEventListener('DOMContentLoaded', function(event) {
	run();
})



async function reloadolap() {

  if (typeof OLAP !== "undefined") {
    delete OLAP;
  }

  let OLAP_FW_SRC_URL = '/olap/js/OLAPFramework.js';
  let olapFwRsrc = await $.get(OLAP_FW_SRC_URL);
  eval.apply(window, [olapFwRsrc]);
}


async function reloaddesign() {

  if (typeof Design !== "undefined") {
    OLAP.clearDesign();
    delete Design;
  }

  // http://localhost:3000/?design-source=./Plato.js
  let dsSrcFmTxtBox = $('#design-source').val();

  let url = new URL(window.location.href);
  let dsSrcFmUrl = url.searchParams.get("design-source");

  let OLAP_DESIGN_SRC_URL = dsSrcFmTxtBox || dsSrcFmUrl || '/Design.js';
  $('#design-source').val(OLAP_DESIGN_SRC_URL);
  url.searchParams.set("design-source", OLAP_DESIGN_SRC_URL);
  let olapDsRsrc = await $.get(OLAP_DESIGN_SRC_URL);
  eval.apply(window, [olapDsRsrc]);
  OLAP.openDesign(Design);
}



async function run() {

  await reloadolap();

  await reloaddesign();

  $("#reload-design").on('click', function(event) {
    event.preventDefault();
    reloaddesign();
  });

}




