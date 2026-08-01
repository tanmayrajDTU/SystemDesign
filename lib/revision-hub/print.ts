// Print + "PDF export" share one mechanism: the browser's native print
// dialog, styled by the @media print rules in app/globals.css.
//
// Why not a PDF-generation library: this site is a statically generated
// Next.js docs site with no server to run a headless-browser PDF renderer
// (e.g. Puppeteer) against, and shipping a client-side PDF library (like
// jsPDF) would mean re-implementing layout that print CSS already does
// for free, only worse. `window.print()` + print stylesheet gives every
// browser's built-in "Save as PDF" destination, which is what most people
// actually mean by "export as PDF" for a page of reference notes.
export function triggerPrint() {
  if (typeof window === "undefined") return;
  window.print();
}
