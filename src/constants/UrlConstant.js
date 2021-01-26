export const BASE_URL = 'https://link.dev.gradlesol.com/app/';
// export const BASE_URL = 'https://0f9d1f408f24.ngrok.io/';
export const LINKEDIN_CLIENT_ID = '776gktki6ukrgj';
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
  DELETE_OPPORTUNITY_URL: `${BASE_URL}opportunity/delete-opportunity/`,
  SYNC_OPPORTUNITY_WITH_LINKEDIN_URL: `${BASE_URL}opportunity/sync-with-linkedIn/`,
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
  GET_CRM_GRAPH_URL: `${BASE_URL}client-dashboard/opportunities`,
};
export const DASHBOARD_URL = {
  OPPORTUNITY_URL: `${BASE_URL}client-dashboard/opportunities`,
  PIPELINE_VALUE: `${BASE_URL}client-dashboard/pipeline-value`,
  CLIENT_QUOTE: `${BASE_URL}organization/client-today-quote`,
};

export const ACCOUNTS_URL = {
  GET_CLIENT_INFO: `${BASE_URL}client-auth/get-client`,
  UPDATE_CLIENT: `${BASE_URL}client-auth/update`,
  GET_COMPANY_SIZE: `${BASE_URL}organization/client-companysize`,
  GET_INDUSTRY: `${BASE_URL}organization/client-industries`,
};
