import CRM_REDUX_CONSTANT from '../../constants/crmReduxConstants/CRMReduxConstant';

export const crms = (state = null, action) => {
  switch (action.type) {
    case CRM_REDUX_CONSTANT.GET_FILTERED_CRMS:
      return action.data;

    default:
      return state;
  }
};

const initiralGraphData = {
  labels: [
    'Initial Contact',
    'In Conversation',
    'Meeting Booked',
    'Follow-Up',
    'Potential Deals',
    'Closed',
    'Lost',
  ],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#4282FE',
    },
  ],
};

export const crmsGraphData = (state = initiralGraphData, action) => {
  switch (action.type) {
    case CRM_REDUX_CONSTANT.GET_CRMS_GRAPH_DATA:
      return {
        ...state,
        labels: action.data.map(e => e._id),
        datasets: [
          {
            data: action.data.map(e => e.total),
            backgroundColor: '#4282FE',
          },
        ],
      };

    default:
      return state;
  }
};
