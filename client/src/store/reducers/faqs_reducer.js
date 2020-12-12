const initialState = {
  faqs: [],
  currentFaq: {},
  loading: false
}

const faqReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_FAQS':
      return {
        ...state,
        faqs: payload,
        currentFaq: {}
      }
    case 'GET_CURRENT_FAQ':
      return {
        ...state,
        currentFaq: payload.faq
      }
    case 'ADD_FAQ':
      return {
        ...state,
        faqs: [...state.faqs, payload.faq],
        currentFaq: {}
      };
    case 'UPDATE_FAQ':
      let newFaqs = state.faqs.map(faq => faq._id === payload.faq._id ? payload.faq : faq);
      return {
        ...state,
        faqs: newFaqs,
        currentFaq: {}
      }
    case 'DELETE_FAQ':
      return {
        ...state,
        faqs: state.faqs.filter(faq => faq.id !== payload.faq._id),
        currentFaq: {}
      }
    case 'GET_CURRENT_FAQ_ERROR':
      return {
        ...state,
        currentFaq: {}
      }
    case 'GET_FAQS_ERROR':
    case 'ADD_FAQ_ERROR':
    case 'UPDATE_FAQ_ERROR':
    case 'DELETE_FAQ_ERROR':
      return {...state}
    default: return state;
  }
}

export default faqReducer