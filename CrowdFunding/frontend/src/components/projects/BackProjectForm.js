import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

const BackProjectForm = ({ projectId, setProject }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handlePledgeSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login', { state: { redirectTo: `/projects/${projectId}` } });
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setShowPaymentForm(true);
  };

  const handlePaymentDetailsChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(`/projects/${projectId}/back/`, {
        amount: Number(amount),
        payment_method: 'credit_card',
      });

      setProject(prevProject => ({
        ...prevProject,
        current_amount: prevProject.current_amount + Number(amount),
        backers_count: prevProject.backers_count + 1
      }));

      setAmount('');
      setShowPaymentForm(false);
      setPaymentDetails({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
      });

      alert('Thank you for backing this project!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  if (showPaymentForm) {
    return (
      <div>
        <h3 className="h5 mb-3">Enter Payment Details</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-3">
            <label className="form-label">Name on Card</label>
            <input
              type="text"
              name="cardName"
              value={paymentDetails.cardName}
              onChange={handlePaymentDetailsChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentDetailsChange}
              className="form-control"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Expiry Date</label>
              <input
                type="text"
                name="expiry"
                value={paymentDetails.expiry}
                onChange={handlePaymentDetailsChange}
                className="form-control"
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>
            <div className="col">
              <label className="form-label">CVC</label>
              <input
                type="text"
                name="cvc"
                value={paymentDetails.cvc}
                onChange={handlePaymentDetailsChange}
                className="form-control"
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPaymentForm(false)}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay $${amount}`}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h3 className="h5 mb-3">Back this project</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handlePledgeSubmit}>
        <div className="mb-3">
          <label className="form-label">Pledge amount</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-control"
              placeholder="Enter amount"
              min="1"
              step="1"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Continue
        </button>
      </form>
    </div>
  );
};

export default BackProjectForm;
