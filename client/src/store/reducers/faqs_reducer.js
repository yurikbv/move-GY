const initialState = {
  faqs: [],
  currentFaq: {},
  loading: true
}

const faqReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_FAQS':
      return {
        ...state,
        faqs: payload,
        currentFaq: {},
        loading: false
      }
    case 'GET_CURRENT_FAQ':
      return {
        ...state,
        currentFaq: payload.faq,
        loading: false
      }
    case 'ADD_FAQ':
      return {
        ...state,
        faqs: [...state.faqs, payload.faq],
        currentFaq: {},
        loading: false
      };
    case 'UPDATE_FAQ':
      let newFaqs = state.faqs.map(faq => faq._id === payload.faq._id ? payload.faq : faq);
      return {
        ...state,
        faqs: newFaqs,
        currentFaq: {},
        loading: false
      }
    case 'DELETE_FAQ':
      return {
        ...state,
        faqs: state.faqs.filter(faq => faq.id !== payload.faq._id),
        currentFaq: {},loading: false
      }
    case 'GET_CURRENT_FAQ_ERROR':
      return {
        ...state,
        currentFaq: {},loading: false
      }
    case 'GET_FAQS_ERROR':
    case 'ADD_FAQ_ERROR':
    case 'UPDATE_FAQ_ERROR':
    case 'DELETE_FAQ_ERROR':
      return {...state,loading: false}
    default: return {...state,loading: false};
  }
}

export default faqReducer