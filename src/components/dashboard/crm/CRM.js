import React from 'react';
import './CRM.scss';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import DatePicker from 'react-datepicker';
import user from '../../../assets/images/dummy-user.jpg';
import edit from '../../../assets/images/pencil.png';
import bin from '../../../assets/images/delete.png';

function Crm() {
  const options = {
    backgroundColor: '#f9f9f9',
    legend: {
      display: false,
    },
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#212152',
            zeroLineWidth: 1.5,
          },
          ticks: {
            beginAtZero: true,
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'No. of Opportunities',
            fontColor: '#7f7f7f',
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#212152',
            zeroLineWidth: 1.5,
          },
          ticks: {
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
            suggestedMax: 400,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'end',
        color: '#7f7f7f',
        labels: {
          title: {
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
      },
    },
  };
  const state = {
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
        data: [350, 48, 18, 150, 34, 62, 23],
        backgroundColor: '#4282FE',
      },
    ],
  };
  return (
    <>
      <div className="common-subtitle">SALES OPPORTUNITIES</div>
      <div className="graph-container">
        <Bar options={options} data={state} height={80} />
      </div>
      <div className="d-flex jc-bet ai-f-end">
        <div className="filter-container">
          <div className="filter-action-block">
            <div className="common-subtitle">LOCATION</div>
            <input placeholder="Location" className="common-input mt-5" />
          </div>
          <div className="filter-action-block">
            <div className="common-subtitle">DATE RANGE</div>
            <div className="d-flex">
              <DatePicker placeholderText="From" className="common-input mt-5" />
              <DatePicker placeholderText="To" className="common-input mt-5 ml-10" />
            </div>
          </div>
          <div className="filter-action-block ">
            <div className="common-subtitle">DEAL VALUE</div>
          </div>
          <div className="filter-action-block">
            <div className="common-subtitle">Potential</div>
            <select className="common-select mt-5">
              <option value="Highly Likely">Highly Likely</option>
              <option value="Highly Likely">Highly Likely</option>
              <option value="Highly Likely">Highly Likely</option>
              <option value="Highly Likely">Highly Likely</option>
            </select>
          </div>
        </div>

        <div className="d-flex">
          <button type="submit" className="button success-button slim-button mr-10">
            APPLY
          </button>
          <button type="button" className="button primary-button slim-button">
            RESET
          </button>
        </div>
      </div>

      <div className="applied-filter-container">
        <div>Showing 1-20 of 357 results</div>
        <div>
          <span>Opportunity Stage: </span>
          All
        </div>
        <div>
          <span>Location: </span>
          Sydney
        </div>
        <div>
          <span>Potential: </span>
          All
        </div>
      </div>

      <div className="customer-list-heading">
        <div>NAME</div>
        <div>DATE ADDED</div>
        <div>FOLLOW-UP DATE</div>
        <div>LOCATION</div>
        <div>POTENTIAL</div>
        <div>DEAL VALUE</div>
        <div />
      </div>
      <div className="customer-list-rows">
        <div className="customer-name">
          <img src={user} />
          Murray Forman
        </div>
        <div>03/05/2020</div>
        <div>03/05/2020</div>
        <div>Sydney</div>
        <div>High Likely</div>
        <div>$1500</div>
        <div className="table-action-field">
          <img src={edit} className="mr-10" title="Edit" />
          <img src={bin} title="Delete" />
        </div>
      </div>
      <div className="customer-list-rows">
        <div className="customer-name">
          <img src={user} />
          Murray Forman
        </div>
        <div>03/05/2020</div>
        <div>03/05/2020</div>
        <div>Sydney</div>
        <div>High Likely</div>
        <div>$1500</div>
        <div className="table-action-field">
          <img src={edit} className="mr-10" title="Edit" />
          <img src={bin} title="Delete" />
        </div>
      </div>
      <div className="customer-list-rows">
        <div className="customer-name">
          <img src={user} />
          Murray Forman
        </div>
        <div>03/05/2020</div>
        <div>03/05/2020</div>
        <div>Sydney</div>
        <div>High Likely</div>
        <div>$1500</div>
        <div className="table-action-field">
          <img src={edit} className="mr-10" title="Edit" />
          <img src={bin} title="Delete" />
        </div>
      </div>
      <div className="customer-list-rows">
        <div className="customer-name">
          <img src={user} />
          Murray Forman
        </div>
        <div>03/05/2020</div>
        <div>03/05/2020</div>
        <div>Sydney</div>
        <div>High Likely</div>
        <div>$1500</div>
        <div className="table-action-field">
          <img src={edit} className="mr-10" title="Edit" />
          <img src={bin} title="Delete" />
        </div>
      </div>
      <div className="customer-list-rows">
        <div className="customer-name">
          <img src={user} />
          Murray Forman
        </div>
        <div>03/05/2020</div>
        <div>03/05/2020</div>
        <div>Sydney</div>
        <div>High Likely</div>
        <div>$1500</div>
        <div className="table-action-field">
          <img src={edit} className="mr-10" title="Edit" />
          <img src={bin} title="Delete" />
        </div>
      </div>
    </>
  );
}

export default Crm;
