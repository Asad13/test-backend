/* App State */
const enum PATHS {
  HOME = '/',
  NEW = '/quote/new',
  EDIT = '/quote/edit/',
}

const LANGUAGES = [
  'arabic',
  'bengali',
  'chineese',
  'english',
  'french',
  'german',
  'greek',
  'hindi',
  'italian',
  'japaneese',
  'portuguese',
  'russian',
  'spanish',
] as const;

const state: AppState = {
  path: PATHS.HOME,
  page: null,
};

const root = document.getElementById('root') as HTMLDivElement; // root element

async function saveData(
  url: string,
  data: QuoteInput,
  methodType = 'POST'
): Promise<QuoteResponseWithData | QuoteResponse> {
  const response = await fetch(url, {
    method: methodType,
    mode: 'same-origin',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

/* Create a Quote Component */
function createQuote(quote: Quote): HTMLAnchorElement {
  const container = document.createElement('a');
  container.classList.add('quote');
  container.href = PATHS.EDIT + quote.id;

  const messageEl = document.createElement('p');
  messageEl.classList.add('message');
  messageEl.innerHTML = '&ldquo;' + quote.message + '.&rdquo;';
  container.appendChild(messageEl);

  const quoteFooter = document.createElement('div');
  quoteFooter.classList.add('quote-footer');

  const speakerEl = document.createElement('p');
  speakerEl.classList.add('speaker');
  speakerEl.innerHTML = '- ' + quote.speaker;
  quoteFooter.appendChild(speakerEl);

  const languageContainer = document.createElement('div');
  languageContainer.classList.add('language-container');
  const languageEl = document.createElement('span');
  languageEl.classList.add('language');
  languageEl.innerHTML = quote.language;
  languageContainer.appendChild(languageEl);
  quoteFooter.appendChild(languageContainer);

  container.appendChild(quoteFooter);
  return container;
}

/* 404 - Not Found Page */
function page404(): void {
  const page = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.classList.add('title');
  h1.innerHTML = '404 - Page Not Found';
  page.appendChild(h1);

  const linkContainer = document.createElement('div');
  linkContainer.classList.add('link-container');
  const link = document.createElement('a');
  link.href = '/';
  link.innerText = 'Go To Home';
  link.classList.add('link');
  linkContainer.appendChild(link);
  page.appendChild(linkContainer);

  if (state.page != null) {
    root.replaceChild(page, state.page);
  } else {
    root.appendChild(page);
  }
  state.page = page;
}

/* Home Page */
function home(): void {
  const page = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.classList.add('title');
  h1.innerHTML = 'Quotes';
  page.appendChild(h1);

  const btContainer = document.createElement('div');
  btContainer.classList.add('add-btn-container');
  const bt = document.createElement('button');
  bt.classList.add('add-btn');
  bt.innerHTML = 'Add New Quote';
  bt.addEventListener('click', () => {
    location.href = PATHS.NEW;
  });
  btContainer.appendChild(bt);
  page.appendChild(btContainer);

  const quotesContainer = document.createElement('div');
  quotesContainer.classList.add('quotes-container');
  page.appendChild(quotesContainer);

  if (state.page != null) {
    root.replaceChild(page, state.page);
  } else {
    root.appendChild(page);
  }
  state.page = page;

  fetch('/api/v1/quotes')
    .then(async (response: Response) => await response.json())
    .then((data) => {
      data.data.quotes.forEach((quote: Quote) => {
        const el: HTMLAnchorElement = createQuote(quote);
        const container = document.querySelector(
          '.quotes-container'
        ) as HTMLDivElement;
        container.appendChild(el);
      });
    })
    .catch((err: any) => {
      console.log(err);
    });
}

/* Quote Page */
function quote(quoteId?: string): void {
  const page = document.createElement('div');
  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');
  const URL =
    quoteId !== undefined ? `/api/v1/quotes/${quoteId}` : '/api/v1/quotes';
  const METHOD = quoteId !== undefined ? 'PUT' : 'POST';

  const linkContainer = document.createElement('div');
  linkContainer.classList.add('link-container');
  const link = document.createElement('a');
  link.href = '/';
  link.innerText = 'Go To Home';
  link.classList.add('link');
  linkContainer.appendChild(link);
  page.appendChild(linkContainer);

  const form = document.createElement('form');
  form.action = URL;
  form.enctype = 'application/x-www-form-urlencoded';
  form.autocomplete = 'off';
  form.method = 'post';
  form.target = '_self';

  const values: QuoteInput = {
    message: '',
    speaker: '',
    language: LANGUAGES[3],
  };

  form.addEventListener('submit', function (event: SubmitEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (values.message !== '' && values.speaker !== '') {
      saveData(URL, values, METHOD)
        .then((res) => {
          alert(res.message);
          location.reload();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  });

  const speakerContainer = document.createElement('div');
  const speakerField = document.createElement('input');
  speakerField.classList.add('form-control');
  speakerField.type = 'text';
  speakerField.name = 'speaker';
  speakerField.id = 'speaker';
  speakerField.placeholder = 'Speaker';
  speakerField.value = values.speaker;
  speakerField.required = true;
  speakerField.addEventListener('change', function (event: Event) {
    values.speaker = this.value.trim();
  });
  speakerContainer.appendChild(speakerField);
  form.appendChild(speakerContainer);

  const messageContainer = document.createElement('div');
  const messageField = document.createElement('textarea');
  messageField.classList.add('form-control', 'meassage-field');
  messageField.name = 'message';
  messageField.id = 'message';
  messageField.placeholder = 'Quote';
  messageField.value = values.message;
  messageField.required = true;
  messageField.maxLength = 255;
  messageField.addEventListener('change', function (event: Event) {
    values.message = this.value.trim();
  });
  messageContainer.appendChild(messageField);
  form.appendChild(messageContainer);

  const languageContainer = document.createElement('div');
  const languageField = document.createElement('select');
  languageField.classList.add('language-field');
  languageField.name = 'language';
  languageField.id = 'language';
  languageField.required = true;
  languageField.addEventListener('change', function (event: Event) {
    values.language = this.value;
  });
  LANGUAGES.forEach((language) => {
    const languageFieldOption = document.createElement('option');
    languageFieldOption.value = language;
    languageFieldOption.innerText = language;

    if (values.language === language) {
      languageFieldOption.selected = true;
    }

    languageField.appendChild(languageFieldOption);
  });
  languageContainer.appendChild(languageField);
  form.appendChild(languageContainer);

  if (quoteId !== undefined) {
    const deleteBtnContainer = document.createElement('div');
    const deleteBtn = document.createElement('input');
    deleteBtn.classList.add('form-control', 'delete-btn');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete Quote';
    deleteBtn.addEventListener('click', function (event: Event) {
      const willDelete = confirm('Are you sure you want to delete the quote?');
      if (willDelete) {
        fetch(URL, {
          method: 'DELETE',
          mode: 'same-origin',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        })
          .then(async (response) => await response.json())
          .then((data) => {
            alert(data.message);
            location.href = PATHS.HOME;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    deleteBtnContainer.appendChild(deleteBtn);
    form.appendChild(deleteBtnContainer);
  }

  const submitBtnContainer = document.createElement('div');
  const submitBtn = document.createElement('input');
  submitBtn.classList.add('form-control');
  submitBtn.type = 'submit';
  submitBtn.value = quoteId !== undefined ? 'Update Quote' : 'Add Quote';
  submitBtnContainer.appendChild(submitBtn);
  form.appendChild(submitBtnContainer);

  formContainer.appendChild(form);
  page.appendChild(formContainer);
  if (state.page != null) {
    root.replaceChild(page, state.page);
  } else {
    root.appendChild(page);
  }
  state.page = page;

  if (quoteId !== undefined) {
    fetch(URL)
      .then(async (response: Response) => await response.json())
      .then((data) => {
        const quote: Quote = data.data.quote;
        values.message = quote.message;
        values.speaker = quote.speaker;
        values.language = quote.language;
        const speakerField = document.getElementById(
          'speaker'
        ) as HTMLInputElement;
        speakerField.value = values.speaker;
        const messageField = document.getElementById(
          'message'
        ) as HTMLTextAreaElement;
        messageField.value = values.message;
        const languageField = document.getElementById(
          'language'
        ) as HTMLSelectElement;
        languageField.value = values.language;
      })
      .catch((err: any) => {
        console.log(err);
        state.path = document.location.pathname;
        page404();
      });
  }
}

/* Observe Path Change In URL */
const observeUrlChange = (): void => {
  state.path = document.location.pathname;
  if (state.path === PATHS.HOME) {
    home();
  } else if (state.path === PATHS.NEW) {
    quote();
  } else if (state.path.includes(PATHS.EDIT)) {
    const index = state.path.lastIndexOf('/');
    const id = state.path.substring(index);
    quote(id);
  } else {
    page404();
  }
  const body = document.querySelector('body') as HTMLBodyElement;
  const observer = new MutationObserver((mutations) => {
    if (state.path !== document.location.pathname) {
      state.path = document.location.pathname;
      if (state.path === PATHS.HOME) {
        home();
      } else if (state.path === PATHS.NEW) {
        quote();
      } else if (state.path.includes(PATHS.EDIT)) {
        const index = state.path.lastIndexOf('/');
        const id = state.path.substring(index);
        quote(id);
      } else {
        page404();
      }
    }
  });
  observer.observe(body, { childList: true, subtree: true });
};

window.onload = observeUrlChange;
