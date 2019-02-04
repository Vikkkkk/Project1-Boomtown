const UPDATE_ITEM = 'UPDATE_ITEM';
const RESET_ITEM = 'RESET_ITEM';
const RESET_IMAGE = 'RESET_IMAGE';

export const updateItem = item => ({
  type: UPDATE_ITEM,
  payload: item
});

export const resetItem = () => ({
  type: RESET_ITEM
});

export const resetImage = () => ({
  type: RESET_IMAGE
});

const initialState = {
  title: 'wat r u adding?',
  description: 'but what is it?',
  tags: [],
  imageurl: 'http://via.placeholder.com/350x250?text=Please select an image',
  itemowner: { fullname: 'example user' },
  // created: new Date()
  created: new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(Date.now())
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ITEM: {
      //everything is in the action.payload, so spreading it will update each things in the state
      return { ...state, ...action.payload };
    }
    case RESET_ITEM: {
      console.log(`hihihi`, action, initialState);
      return { ...initialState };
    }
    case RESET_IMAGE: {
      return { ...state, imageurl: initialState.imageurl };
    }
    default:
      return state;
  }
};
