import { useState, useEffect, useCallback } from "react";
import { fetchServices, initiatePayment, checkPaymentStatus } from "../services/api";

// ─── Individual Service Card ──────────────────────────────
function ServiceCard({ service, onSelect }) {
  return (
    <div
      onClick={() => onSelect(service)}
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        padding: "1.5rem",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.15s",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "var(--color-border-primary)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--color-border-tertiary)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span style={{ fontSize: "24px" }}>{service.icon}</span>
      <div>
        <p style={{ fontWeight: 500, fontSize: "15px", margin: "0 0 4px" }}>
          {service.name}
        </p>
        <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>
          {service.description}
        </p>
      </div>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 500, fontSize: "14px" }}>
          {Number(service.price).toLocaleString()} RWF
        </span>
        <span style={{
          fontSize: "12px",
          background: "var(--color-background-info)",
          color: "var(--color-text-info)",
          padding: "4px 10px",
          borderRadius: "var(--border-radius-md)",
        }}>
          Select
        </span>
      </div>
    </div>
  );
}

// ─── Payment Modal ─────────────────────────────────────────
function PaymentModal({ service, onClose }) {
  const [step, setStep] = useState("phone"); // phone | waiting | success | failed
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState(null);
  const [pollCount, setPollCount] = useState(0);

  // Poll payment status every 3 seconds
  const pollStatus = useCallback(async (refId) => {
    try {
      const status = await checkPaymentStatus(refId);
      if (status === "SUCCESSFUL") {
        setStep("success");
      } else if (status === "FAILED") {
        setStep("failed");
      } else {
        // Still pending — check again after 3s (max 10 tries = 30s)
        setPollCount(c => {
          if (c < 10) {
            setTimeout(() => pollStatus(refId), 3000);
            return c + 1;
          }
          setStep("failed"); // timed out
          return c;
        });
      }
    } catch {
      setStep("failed");
    }
  }, []);

  const handlePay = async () => {
    setError("");
    const clean = phone.replace(/\s+/g, "");
    if (!/^(07[2389])\d{7}$/.test(clean)) {
      setError("Enter a valid Rwandan number (e.g. 0781234567)");
      return;
    }
    setLoading(true);
    try {
      const result = await initiatePayment({ serviceId: service.id, phoneNumber: clean });
      setReferenceId(result.referenceId);
      setStep("waiting");
      // Start polling after 5s (give user time to see prompt on phone)
      setTimeout(() => pollStatus(result.referenceId), 5000);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "var(--color-background-primary)",
        borderRadius: "var(--border-radius-lg)",
        border: "0.5px solid var(--color-border-tertiary)",
        width: "100%", maxWidth: "440px",
        padding: "1.75rem",
      }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <p style={{ fontWeight: 500, fontSize: "16px", margin: "0 0 4px" }}>Pay with MoMo</p>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: 0 }}>
              {service.name} — {Number(service.price).toLocaleString()} RWF
            </p>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "18px", color: "var(--color-text-secondary)", padding: "0 4px",
          }}>✕</button>
        </div>

        {/* Step: Enter phone */}
        {step === "phone" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "13px", color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>
                MoMo Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 0781234567"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handlePay()}
                style={{
                  width: "100%", padding: "10px 12px", fontSize: "15px",
                  border: "0.5px solid var(--color-border-secondary)",
                  borderRadius: "var(--border-radius-md)",
                  background: "var(--color-background-secondary)",
                  color: "var(--color-text-primary)",
                  boxSizing: "border-box",
                }}
              />
              {error && (
                <p style={{ fontSize: "12px", color: "var(--color-text-danger)", margin: "6px 0 0" }}>
                  {error}
                </p>
              )}
            </div>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>
              A payment prompt will appear on your phone. Accept it to complete the transaction.
            </p>
            <button
              onClick={handlePay}
              disabled={loading}
              style={{
                padding: "10px", fontWeight: 500, fontSize: "14px",
                background: loading ? "var(--color-background-secondary)" : "#FFCB00",
                color: "#333",
                border: "none", borderRadius: "var(--border-radius-md)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending request…" : `Pay ${Number(service.price).toLocaleString()} RWF`}
            </button>
          </div>
        )}

        {/* Step: Waiting for approval */}
        {step === "waiting" && (
          <div style={{ textAlign: "center", padding: "1.5rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "48px", height: "48px", border: "3px solid #FFCB00",
              borderTop: "3px solid transparent", borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontWeight: 500, margin: 0 }}>Waiting for your approval</p>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>
              Check your phone and enter your MoMo PIN to confirm the payment of <strong>{Number(service.price).toLocaleString()} RWF</strong>.
            </p>
            <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: 0 }}>
              Ref: {referenceId?.slice(0, 8)}…
            </p>
          </div>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div style={{ textAlign: "center", padding: "1.5rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "50%",
              background: "var(--color-background-success)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px",
            }}>✓</div>
            <p style={{ fontWeight: 500, fontSize: "16px", margin: 0, color: "var(--color-text-success)" }}>Payment Successful!</p>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: 0 }}>
              Your payment for <strong>{service.name}</strong> has been received. We'll be in touch shortly.
            </p>
            <button onClick={onClose} style={{
              padding: "10px 24px", fontWeight: 500, fontSize: "14px",
              background: "#FFCB00", color: "#333", border: "none",
              borderRadius: "var(--border-radius-md)", cursor: "pointer",
            }}>
              Done
            </button>
          </div>
        )}

        {/* Step: Failed */}
        {step === "failed" && (
          <div style={{ textAlign: "center", padding: "1.5rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "50%",
              background: "var(--color-background-danger)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px",
            }}>✕</div>
            <p style={{ fontWeight: 500, fontSize: "16px", margin: 0, color: "var(--color-text-danger)" }}>Payment Failed</p>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: 0 }}>
              The payment was not completed. Please try again or use a different number.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={onClose} style={{
                padding: "10px 20px", fontSize: "14px",
                background: "none", border: "0.5px solid var(--color-border-secondary)",
                borderRadius: "var(--border-radius-md)", cursor: "pointer",
                color: "var(--color-text-primary)",
              }}>Cancel</button>
              <button onClick={() => { setStep("phone"); setError(""); }} style={{
                padding: "10px 20px", fontWeight: 500, fontSize: "14px",
                background: "#FFCB00", color: "#333", border: "none",
                borderRadius: "var(--border-radius-md)", cursor: "pointer",
              }}>Try Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => setError("Failed to load services. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Page header */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontWeight: 500, fontSize: "22px", margin: "0 0 6px" }}>Our Services</p>
        <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>
          Choose a service and pay instantly using MTN Mobile Money.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              height: "160px", borderRadius: "var(--border-radius-lg)",
              background: "var(--color-background-secondary)",
              animation: "pulse 1.4s ease-in-out infinite alternate",
            }} />
          ))}
          <style>{`@keyframes pulse { from { opacity: 1 } to { opacity: 0.5 } }`}</style>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div style={{
          padding: "1rem", borderRadius: "var(--border-radius-md)",
          background: "var(--color-background-danger)",
          color: "var(--color-text-danger)", fontSize: "14px",
        }}>
          {error}
        </div>
      )}

      {/* Services grid */}
      {!loading && !error && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
          {services.map(s => (
            <ServiceCard key={s.id} service={s} onSelect={setSelectedService} />
          ))}
        </div>
      )}

      {/* Payment Modal */}
      {selectedService && (
        <PaymentModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}