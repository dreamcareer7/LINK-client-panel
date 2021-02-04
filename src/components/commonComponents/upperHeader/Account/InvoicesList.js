import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import eye from '../../../../assets/images/visibility.svg';
import download from '../../../../assets/images/down-arrow.svg';
import { errorNotification } from '../../../../constants/Toast';

function InvoicesList({ invoice }) {
  console.log('invoice ---- =>', invoice);
  const { createdAt, totalAmount, receiptNumber, paymentId, downloadUrl, hostUrl } = invoice;

  const downloadInvoice = () => {
    if (downloadUrl) {
      window.location = downloadUrl;
    } else {
      errorNotification('Invoice not available for download');
    }
  };
  const watchInvoice = () => {
    if (hostUrl) {
      window.open(hostUrl, '_blank');
    } else {
      errorNotification('Invoice not available for watch');
    }
  };
  return (
    <div className="transaction-history-table-row table-row">
      <div>{moment(createdAt).format('DD/MM/YYYY')}</div>
      <div>{`$${totalAmount}`}</div>
      <div>{paymentId.planType}</div>
      <div>{receiptNumber}</div>
      <div className="actions">
        <img src={eye} onClick={watchInvoice} />
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
