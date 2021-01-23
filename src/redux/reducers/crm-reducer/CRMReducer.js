import CRM_REDUX_CONSTANT from '../../constants/crmReduxConstants/CRMReduxConstant';
import { getLabelFromValues } from '../../../helpers/chartHelper';

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
    'LOST',
    'FOLLOW_UP',
    'CLOSED',
    'IN_CONVERSION',
    'INITIAL_CONTACT',
    'MEETING_BOOKED',
    'POTENTIAL',
  ],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#4282FE',
    },
  ],
};

const mapperObject = [
  { label: 'In Conversation', value: 'IN_CONVERSION' },
  { label: 'Initial Contact', value: 'INITIAL_CONTACT' },
  { label: 'Lost', value: 'LOST' },
  { label: 'Follow-Up', value: 'FOLLOW_UP' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'Meeting Booked', value: 'MEETING_BOOKED' },
  { label: 'Potential Deals', value: 'POTENTIAL_DEAL' },
];

export const crmsGraphData = (state = initiralGraphData, action) => {
  switch (action.type) {
    case CRM_REDUX_CONSTANT.GET_CRMS_GRAPH_DATA:
      return {
        ...state,
        labels: action.data.map(e => getLabelFromValues(e._id, mapperObject)),
        values: action.data.map(e => e._id),
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
