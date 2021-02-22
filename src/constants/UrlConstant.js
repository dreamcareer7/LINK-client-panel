// export const BASE_URL = 'https://link.dev.gradlesol.com/app/'; // <-- Kevit Dev
// export const BASE_URL = 'https://link.dev.humanpixel.com.au/app/'; // <-- HP Dev
export const BASE_URL = 'https://link.test.humanpixel.com.au/app/'; // <-- HP Staging
// export const BASE_URL = 'https://jayla.linkfluencer.com/app/'; // <-- Production
// export const BASE_URL = 'https://97a229f815ab.ngrok.io/';
export const LINKEDIN_CLIENT_ID = '86mz67ydcyjqc2'; // <-- client
// export const LINKEDIN_CLIENT_ID = '776gktki6ukrgj';
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
  SEARCH_SUBSCRIBERS: `${BASE_URL}opportunity/search-opportunity`,
  CLEAR_NOTIFICATION: `${BASE_URL}client-dashboard/clear-notifications`,
  GET_NOTIFICATION: `${BASE_URL}client-dashboard/get-notifications`,
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

export const REPORTING_URL = {
  GET_ACTIVITY_BREAKDOWN_URL: `${BASE_URL}client-reporting/activity-breakdown`,
  GET_PIPELINE_URL: `${BASE_URL}client-reporting/pipeline-value`,
  GET_CONVERSATION_URL: `${BASE_URL}client-reporting/conversions`,
  GET_TOTAL_SALES_URL: `${BASE_URL}client-reporting/total-sales`,
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
  CREATE_FCM_TOKEN: `${BASE_URL}client-auth/add-fcm-token`,
  LOGOUT_USER: `${BASE_URL}client-auth/logout`,
  DOWNLOAD_INVOICE: `${BASE_URL}client-auth/invoices-download`,
  GET_INVOICES_URL: `${BASE_URL}client-auth/invoices`,
  CLIENT_AUTH_NOTIFICATION_URL: `${BASE_URL}client-auth/notification-type`,
  CANCEL_SUBSCRIPTION: `${BASE_URL}client-auth/cancel-subscription`,
};

export const COOKIEE_URL = {
  CHECK_COOKIEE_URL: `${BASE_URL}client-auth/checking-for-cookie`,
};
export const ERROR_URL = {
  CLIENT_ERROR_URL: `${BASE_URL}client-error-message/get-messages`,
};
