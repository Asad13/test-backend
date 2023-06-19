interface AppState {
  path: string;
  page: HTMLElement | null;
}

interface QuoteInput {
  message: string;
  speaker: string;
  language: string;
}

interface Quote extends QuoteInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface QuoteResponse {
  status: boolean;
  message: string;
}
interface QuoteResponseWithData extends QuoteResponse {
  data: {
    quote: Quote;
  };
}
