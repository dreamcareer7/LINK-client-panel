import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import download from '../../../../assets/images/down-arrow.svg';
import { errorNotification } from '../../../../constants/Toast';
import { getLabelFromValues } from '../../../../helpers/chartHelper';
import { subTypeObject } from '../../../../helpers/Mappers';

function InvoicesList({ invoice }) {
  const { createdAt, totalAmount, receiptNumber, paymentId, downloadUrl } = invoice;

  const downloadInvoice = () => {
    if (downloadUrl) {
      window.location = downloadUrl;
    } else {
      errorNotification('Invoice not available for download');
    }
  };
  return (
    <div className="transaction-history-table-row table-row">
      <div>{moment(createdAt).format('DD/MM/YYYY')}</div>
      <div>{`$${totalAmount / 100}`}</div>
      <div>{getLabelFromValues(paymentId.planType, subTypeObject)}</div>
      <div>{receiptNumber}</div>
      <div className="actions">
        <img src={download} onClick={downloadInvoice} />
      </div>
    </div>
  );
}
InvoicesList.propTypes = {
  invoice: PropTypes.shape({
    _id: PropTypes.string,
    createdAt: PropTypes.string,
    downloadUrl: PropTypes.string,
    hostUrl: PropTypes.string,
    totalAmount: PropTypes.number,
    receiptNumber: PropTypes.string,
    paymentId: PropTypes.shape({
      planType: PropTypes.string,
    }),
  }).isRequired,
};
export default InvoicesList;
