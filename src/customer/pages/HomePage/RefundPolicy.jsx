import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-[#9155fd] mb-4">Refund & Return Policy</h1>

      <p className="mb-4">At <strong>Nari Vastaram</strong>, your satisfaction is our highest priority. If you're not completely in love with your purchase, we're here to help.</p>

      <h2 className="font-semibold text-lg mt-6">🕰️ Return & Refund Window</h2>
      <p className="mb-4">You can request a return or refund within <strong>7 days</strong> of receiving your order.</p>

      <h2 className="font-semibold text-lg mt-6">✅ Eligibility Criteria</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Items must be <strong>unused and in original packaging</strong>.</li>
        <li>Include all tags, accessories, and the original invoice.</li>
      </ul>

      <h2 className="font-semibold text-lg mt-6">💳 Refund Method</h2>
      <p className="mb-4">Refunds will be processed to your <strong>original payment method</strong> within <strong>5–7 business days</strong>.</p>

      <h2 className="font-semibold text-lg mt-6">🔁 Return & Exchange</h2>
      <p>We currently accept <strong>returns only</strong>. No exchanges are allowed at this time.</p>
    </div>
  );
};

export default RefundPolicy;
