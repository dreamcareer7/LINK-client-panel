/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
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
import { addFCMToken } from '../../redux/actions/accountAction/AccountAction';
import { requestFirebaseNotificationPermission } from '../../firebaseInit';
import { potentialMapperObject, stageMapperObjectForOne } from '../../helpers/Mappers';
import { getLabelFromValues } from '../../helpers/chartHelper';

Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontSize = 16;

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { clientQuote, pipeline, opportunity } = useSelector(state => state.dashboardReducer);
  useEffect(() => {
    requestFirebaseNotificationPermission()
      .then(firebaseToken => {
        // eslint-disable-next-line no-console
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
  }, []);
  useEffect(() => {
    document.title = 'Home';
  }, []);
  const pipelineBackgroundColor = ['#39c3bb', '#fcab50', '#ff696a'];
  const opportunityBackgroundColor = [
    '#4282FE',
    '#d53711',
    '#f79400',
    '#43c643',
    '#950094',
    '#0097C1',
    '#d64374',
  ];

  const opportunityLegendFunction = () => {
    const legendHtml = [];
    legendHtml.push('<ul>');
    if (opportunity) {
      opportunity.data.forEach((record, index) => {
        legendHtml.push('<li>');
        legendHtml.push(
          `<div className="chart-legend" style="background-color: ${opportunityBackgroundColor[index]}">${record.total}</div>`
        );
        legendHtml.push(
          `<label className="chart-legend-label-text">${getLabelFromValues(
            record._id,
            stageMapperObjectForOne
          )}</label>`
        );
        legendHtml.push('<li>');
      });
    }
    legendHtml.push('</ul>');
    return legendHtml.join('');
  };
  const pipelineLegendFunction = () => {
    const legendHtml = [];
    legendHtml.push('<ul>');
    if (pipeline && pipeline.data && pipeline.data.data) {
      pipeline.data.data.forEach((record, index) => {
        legendHtml.push('<li>');
        legendHtml.push(
          `<div className="chart-legend" style="background-color: ${pipelineBackgroundColor[index]}">${record.totalDealValueStr}</div>`
        );
        legendHtml.push(
          `<label className="chart-legend-label-text">${getLabelFromValues(
            record._id,
            potentialMapperObject
          )}</label>`
        );
        legendHtml.push('<li>');
      });
    }
    legendHtml.push('</ul>');
    return legendHtml.join('');
  };

  useEffect(() => {
    if (opportunity && opportunity.data && opportunity.data.length > 0) {
      const element = document.getElementById('opportunity-chart-legends');
      if (element) {
        element.innerHTML = opportunityLegendFunction();
      }
    }
  }, [opportunity]);

  useEffect(() => {
    if (pipeline && pipeline.data && pipeline.data.data && pipeline.data.data.length > 0) {
      const element = document.getElementById('pipeline-chart-legends');
      if (element) {
        element.innerHTML = pipelineLegendFunction();
      }
    }
  }, [pipeline]);
  const numberToUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
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
            onClick={() => history.push('/followups')}
          >
            <img src={FollowUps} height="20" />
            <span className="p-left">Follow Ups</span>
          </button>
          <button
            className="button primary-button ml-4 btn-width"
            type="button"
            onClick={() => history.push('/crm')}
          >
            <img src={CRM} className="ml-3" height="24" />
            <span className="p-left">CRM</span>
          </button>
          <button
            className="button primary-button ml-2 btn-width"
            type="button"
            onClick={() => history.push('/reporting')}
          >
            <img src={Report} height="20" />
            <span className="p-left">Reporting</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="graph-container">
            <div className="common-title chart-title">OPPORTUNITIES</div>
            {opportunity && opportunity.data.length !== 0 ? (
              <div className="graph-legend-container">
                <div id="opportunity-chart-legends" />
                <div className="graph">
                  <DashboardChart chartData={opportunity && opportunity.data && opportunity.data} />
                </div>
              </div>
            ) : (
              <div className="no-data-style">
                <span className="text-center">
                  Looks like you haven&#39;t added any opportunities, head to your LinkedIn account
                  to get started. Good luck!
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="graph-container">
            <div className="common-title chart-title">PIPELINE VALUE</div>
            {pipeline && pipeline.data && pipeline.data.data && pipeline.data.data.length !== 0 ? (
              <div className="graph-legend-container">
                <div id="pipeline-chart-legends" />
                <div className="graph">
                  <div className="graph-center-text">
                    {numberToUSD.format(pipeline.data.totalDealAmount)}
                  </div>
                  <DoughnutChart chartData={pipeline && pipeline.data && pipeline.data} />
                </div>
              </div>
            ) : (
              <div className="no-data-style">
                <span className="text-center">
                  Looks like you haven&#39;t added any opportunities, head to your LinkedIn account
                  to get started. Good luck!
                </span>
              </div>
            )}
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
