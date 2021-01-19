import NOTES_REDUX_CONSTANT from '../../../constants/notesReduxConstant/NotesReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const opportunityNotes = (state = [], action) => {
  console.log('reducer notes=>', action.type);
  switch (action.type) {
    case NOTES_REDUX_CONSTANT.GET_OPPORTUNITY_NOTE:
      console.log('action data->', action.data);
      return action.data;
    case NOTES_REDUX_CONSTANT.UPDATE_OPPORTUNITY_NOTE:
      return action.data;
    case NOTES_REDUX_CONSTANT.ADD_OPPORTUNITY_NOTE:
      return action.data;
    case NOTES_REDUX_CONSTANT.DELETE_OPPORTUNITY_NOTE:
      return action.data;
    default:
      return state;
  }
};
