export const BASE_URL = 'https://link.dev.gradlesol.com/app/';
export const LINKEDIN_CLIENT_ID = '77ugsdksaaa1rf';
export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};
export const FOLLOW_UP_URL = {
  FOLLOW_UP_FILTER_URL: `${BASE_URL}client-follow-ups/filters/`,
  GET_INDIVIDUAL_OPPORTUNITY_URL: `${BASE_URL}opportunity/get-opportunity/`,
  UPDATE_OPPORTUNITY_URL: `${BASE_URL}opportunity/update-opportunity/`,
};
export const NOTES_URL = {
  GET_NOTES_URL: `${BASE_URL}opportunity-note/get-opportunity-note/`,
  ADD_NOTE_URL: `${BASE_URL}opportunity-note/add-opportunity-note/`,
  DELETE_NOTE_URL: `${BASE_URL}opportunity-note/delete-opportunity-note/`,
  UPDATE_NOTE_URL: `${BASE_URL}opportunity-note/update-opportunity-note/`,
};
export const HISTORY_URL = {
  FETCH_CONVERSATION_URL: `${BASE_URL}opportunity/fetch-conversation/`,
};

export const CRM_URL = {
  GET_FILTERED_CRM_URL: `${BASE_URL}client-crm/filters`,
};
