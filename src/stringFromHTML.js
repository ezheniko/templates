export default function stringFromHTML(selector, exceptSelectors) {
  let html = document.querySelector(selector).cloneNode(true)
  for (let exceptSelector of exceptSelectors) {
    let excepts = html.querySelectorAll(exceptSelector)
    for (let i = 0; i < excepts.length; i++) {
      excepts[i].remove()
    }
  }
  return html.outerHTML
}