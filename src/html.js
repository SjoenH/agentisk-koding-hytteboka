// HTML written as template text. Whatever is put into a template is escaped,
// so a name someone typed is shown as typed and never read as markup.
// Only what another `html` template made is put in as it is.

class Markup {
  constructor(text) {
    this.text = text;
  }

  toString() {
    return this.text;
  }
}

export function html(strings, ...values) {
  let text = strings[0];
  values.forEach((value, index) => {
    text += render(value) + strings[index + 1];
  });
  return new Markup(text);
}

function render(value) {
  if (value instanceof Markup) return value.text;
  if (Array.isArray(value)) return value.map(render).join('');
  if (value === null || value === undefined || value === false) return '';
  return escape(String(value));
}

function escape(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
