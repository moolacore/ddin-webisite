const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Fetch all services
export async function fetchServices() {
  const res = await fetch(`${BASE_URL}/api/services`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

// Initiate a MoMo payment
export async function initiatePayment({ serviceId, phoneNumber }) {
  const res = await fetch(`${BASE_URL}/api/payments/initiate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ serviceId, phoneNumber }),
  });
  if (!res.ok) throw new Error("Failed to initiate payment");
  return res.json(); // expects { referenceId: "..." }
}

// Check payment status by referenceId
export async function checkPaymentStatus(referenceId) {
  const res = await fetch(`${BASE_URL}/api/payments/status/${referenceId}`);
  if (!res.ok) throw new Error("Failed to check payment status");
  const data = await res.json();
  return data.status; // expects { status: "SUCCESSFUL" | "FAILED" | "PENDING" }
}