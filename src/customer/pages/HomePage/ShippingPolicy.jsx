import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-[#9155fd] mb-4">Shipping & Delivery Policy</h1>

      <p className="mb-4">We aim to deliver elegance at your doorstep with speed and care.</p>

      <h2 className="font-semibold text-lg mt-6">🚀 Order Processing</h2>
      <p className="mb-4">Orders are processed and dispatched within <strong>1–3 working days</strong> after confirmation.</p>

      <h2 className="font-semibold text-lg mt-6">📦 Delivery Timeline</h2>
      <p className="mb-4">Estimated delivery time is <strong>3–7 business days</strong> (within India). <br /> We currently <strong>do not offer international shipping</strong>.</p>

      <h2 className="font-semibold text-lg mt-6">💌 Shipping Charges</h2>
      <p>We offer <strong>free shipping</strong> on all products across India.</p>
    </div>
  );
};

export default ShippingPolicy;
