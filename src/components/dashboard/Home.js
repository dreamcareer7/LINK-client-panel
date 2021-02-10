/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  fetchClientQuote,
  fetchOpportunity,
  fetchPipeLine,
} from '../../redux/actions/dashboardAction/DashboardAction';
import DashboardChart from './Dashboardchart';
import './Home.scss';
import Report from '../../assets/reporting.svg';
import CRM from '../../assets/crm.svg';
import FollowUps from '../../assets/calendar.svg';
import DoughnutChart from './PipelineChart';
import { addFCMToken, getClientInfo } from '../../redux/actions/accountAction/AccountAction';
import { requestFirebaseNotificationPermission } from '../../firebaseInit';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { clientQuote, pipeline, opportunity } = useSelector(state => state.dashboardReducer);
  useEffect(() => {
    requestFirebaseNotificationPermission()
      .then(firebaseToken => {
        // eslint-disable-next-line no-console
        console.log(firebaseToken);
        localStorage.setItem('fcmToken', firebaseToken.toString());
        dispatch(addFCMToken(firebaseToken));
      })
      .catch(err => {
        return err;
      });
    // get error notification
    dispatch(fetchOpportunity());
    dispatch(fetchPipeLine());
    dispatch(fetchClientQuote());
    dispatch(getClientInfo());
  }, []);
  const clientError = useSelector(state => state.clientErrorReducer);
  console.log('clienterror=>', clientError);
  return (
    <div>
      <div className="graph-container">
        <div className="text-center">
          <h1>Dashboard</h1>
        </div>
        <div className="justify m-top">
          <p className="paragraph">
            Whether you're looking to follow up prospects in your pipeline, nurture existing
            relationships or view how your campaign is performing, everything is at your finger tips
            right here with Jayla
          </p>
        </div>
        <div className="d-flex justify-content-center m-top">
          <button
            className="button primary-button mr-4 btn-width"
            type="button"
            onClick={() => history.push('/followUps')}
          >
            <img src={FollowUps} height="16" />
            <span className="p-left">Follow Ups</span>
          </button>
          <button
            className="button primary-button ml-4 btn-width"
            type="button"
            onClick={() => history.push('/crm')}
          >
            <img src={CRM} className="ml-3" height="18" />
            <span className="p-left">CRM</span>
          </button>
          <button
            className="button primary-button ml-2 btn-width"
            type="button"
            onClick={() => history.push('/reporting')}
          >
            <img src={Report} height="16" />
            <span className="p-left">Reporting</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="graph-container">
            <div className="common-title">OPPORTUNITIES</div>
            <DashboardChart chartData={opportunity && opportunity.data && opportunity.data} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="graph-container">
            <div className="common-title">PIPELINE VALUE</div>
            <DoughnutChart chartData={pipeline && pipeline.data && pipeline.data} />
          </div>
        </div>
      </div>
      <div className="col-md-12 m-top">
        <div className="d-flex justify-content-center">
          {clientQuote && clientQuote.data && clientQuote.data.length !== 0 && (
            <div className="quote">
              <h5 className="quote-text">{`"${
                clientQuote && clientQuote.data && clientQuote.data.quote
              }"`}</h5>
              <h6 className="text-transform text-center f-16">{`${
                clientQuote && clientQuote.data && clientQuote.data.quoteBy
              }`}</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
