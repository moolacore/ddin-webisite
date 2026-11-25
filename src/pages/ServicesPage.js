// import { useState, useEffect, useCallback } from "react";
// import { createPortal } from "react-dom";
// import { fetchServices, initiatePayment, checkPaymentStatus } from "../services/api";

// // ─── Fonts (add to your index.html or global CSS) ─────────
// // <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

// // ─── Styles ───────────────────────────────────────────────
// const styles = {
//   root: {
//     fontFamily: "'DM Sans', sans-serif",
//     padding: "2rem 1rem",
//     maxWidth: "900px",
//     margin: "0 auto",
//   },
//   eyebrow: {
//     fontSize: "11px",
//     letterSpacing: "0.12em",
//     textTransform: "uppercase",
//     color: "var(--color-text-tertiary)",
//     margin: "0 0 8px",
//   },
//   pageTitle: {
//     fontFamily: "'Instrument Serif', serif",
//     fontSize: "32px",
//     fontWeight: 400,
//     color: "var(--color-text-primary)",
//     margin: "0 0 6px",
//     lineHeight: 1.15,
//   },
//   pageSubtitle: {
//     fontSize: "14px",
//     color: "var(--color-text-secondary)",
//     fontWeight: 300,
//     margin: "0 0 2rem",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//     gap: "12px",
//   },
//   skeletonCard: {
//     height: "160px",
//     borderRadius: "var(--border-radius-lg)",
//     background: "var(--color-background-secondary)",
//     animation: "pulse 1.4s ease-in-out infinite alternate",
//   },
//   errorBox: {
//     padding: "1rem",
//     borderRadius: "var(--border-radius-md)",
//     background: "var(--color-background-danger)",
//     color: "var(--color-text-danger)",
//     fontSize: "14px",
//   },
// };

// // ─── Service Card ─────────────────────────────────────────
// function ServiceCard({ service, onSelect }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <>
//       <style>{`@keyframes pulse { from { opacity: 1 } to { opacity: 0.5 } }`}</style>
//       <div
//         onClick={() => onSelect(service)}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         style={{
//           background: "var(--color-background-primary)",
//           border: `0.5px solid ${hovered ? "var(--color-border-primary)" : "var(--color-border-tertiary)"}`,
//           borderRadius: "var(--border-radius-lg)",
//           padding: "1.25rem",
//           cursor: "pointer",
//           transition: "border-color 0.18s, transform 0.15s",
//           transform: hovered ? "translateY(-3px)" : "translateY(0)",
//           display: "flex",
//           flexDirection: "column",
//           gap: "10px",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Yellow top accent — appears on hover */}
//         <div style={{
//           position: "absolute", top: 0, left: 0, right: 0, height: "3px",
//           background: "#FFCB00",
//           opacity: hovered ? 1 : 0,
//           transition: "opacity 0.2s",
//         }} />

//         {/* Icon tile */}
//         <div style={{
//           width: "40px", height: "40px",
//           borderRadius: "var(--border-radius-md)",
//           background: "var(--color-background-secondary)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: "20px",
//         }}>
//           {service.icon}
//         </div>

//         <div>
//           <p style={{ fontWeight: 500, fontSize: "14px", margin: "0 0 3px", color: "var(--color-text-primary)" }}>
//             {service.name}
//           </p>
//           <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5, fontWeight: 300 }}>
//             {service.description}
//           </p>
//         </div>

//         <div style={{
//           marginTop: "auto",
//           display: "flex", alignItems: "center", justifyContent: "space-between",
//           paddingTop: "10px",
//           borderTop: "0.5px solid var(--color-border-tertiary)",
//         }}>
//           <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-primary)" }}>
//             {Number(service.price).toLocaleString()} RWF
//           </span>
//           <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--color-text-secondary)", textTransform: "uppercase" }}>
//             Select →
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }

// // ─── Payment Modal ─────────────────────────────────────────
// // Uses createPortal to mount directly on document.body.
// // This escapes any parent CSS transform, overflow:hidden, or
// // stacking context that would clip or hide the backdrop.
// function PaymentModal({ service, onClose }) {
//   const [step, setStep] = useState("phone"); // phone | waiting | success | failed
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [referenceId, setReferenceId] = useState(null);
//   const [pollCount, setPollCount] = useState(0);

//   // Lock body scroll while open
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = ""; };
//   }, []);

//   // Close on Escape key
//   useEffect(() => {
//     const handler = (e) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [onClose]);

//   const pollStatus = useCallback(async (refId) => {
//     try {
//       const status = await checkPaymentStatus(refId);
//       if (status === "SUCCESSFUL") {
//         setStep("success");
//       } else if (status === "FAILED") {
//         setStep("failed");
//       } else {
//         setPollCount(c => {
//           if (c < 10) {
//             setTimeout(() => pollStatus(refId), 3000);
//             return c + 1;
//           }
//           setStep("failed");
//           return c;
//         });
//       }
//     } catch {
//       setStep("failed");
//     }
//   }, []);

//   const handlePay = async () => {
//     setError("");
//     const clean = phone.replace(/\s+/g, "");
//     if (!/^(07[2389])\d{7}$/.test(clean)) {
//       setError("Enter a valid Rwandan number (e.g. 0781234567)");
//       return;
//     }
//     setLoading(true);
//     try {
//       const result = await initiatePayment({ serviceId: service.id, phoneNumber: clean });
//       setReferenceId(result.referenceId);
//       setStep("waiting");
//       setTimeout(() => pollStatus(result.referenceId), 5000);
//     } catch (err) {
//       setError(err.message || "Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetToPhone = () => { setStep("phone"); setError(""); };

//   const modalContent = (
//     <>
//       <style>{`
//         @keyframes scaleIn {
//           from { transform: scale(0.95); opacity: 0; }
//           to   { transform: scale(1);    opacity: 1; }
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }

//         .momo-backdrop {
//           position: fixed;
//           top: 0; left: 0;
//           width: 100vw; height: 100vh;
//           z-index: 9999;
//           background: rgba(0, 0, 0, 0.55);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .momo-sheet {
//           width: 100%;
//           max-width: 480px;
//           margin: 0 1rem;
//           background: var(--color-background-primary, #fff);
//           border-radius: 16px;
//           border: 0.5px solid var(--color-border-tertiary, #e5e5e5);
//           animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
//         }
//       `}</style>

//       <div
//         className="momo-backdrop"
//         onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
//       >
//         <div className="momo-sheet">

//           <div style={{ padding: "1.5rem 1.75rem 2.25rem", position: "relative" }}>

//             {/* Close button */}
//             <button
//               onClick={onClose}
//               aria-label="Close"
//               style={{
//                 position: "absolute", top: "1.25rem", right: "1.5rem",
//                 background: "var(--color-background-secondary, #f5f5f5)",
//                 border: "none", cursor: "pointer",
//                 width: "28px", height: "28px", borderRadius: "50%",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 color: "var(--color-text-secondary, #666)", fontSize: "14px",
//                 lineHeight: 1,
//               }}
//             >✕</button>

//             {/* ── Step: Phone ── */}
//             {step === "phone" && (
//               <div>
//                 {/* Service summary */}
//                 <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
//                   <span style={{ fontSize: "28px" }}>{service.icon}</span>
//                   <div>
//                     <p style={{
//                       fontFamily: "'Instrument Serif', serif",
//                       fontSize: "20px", fontWeight: 400,
//                       margin: "0 0 2px", color: "var(--color-text-primary, #111)",
//                     }}>
//                       {service.name}
//                     </p>
//                     <p style={{ fontSize: "13px", color: "var(--color-text-secondary, #666)", margin: 0, fontWeight: 300 }}>
//                       {Number(service.price).toLocaleString()} RWF
//                     </p>
//                   </div>
//                 </div>

//                 {/* Phone input */}
//                 <label style={{
//                   fontSize: "12px", fontWeight: 500, letterSpacing: "0.07em",
//                   textTransform: "uppercase", color: "var(--color-text-secondary, #666)",
//                   display: "block", marginBottom: "8px",
//                 }}>
//                   MoMo number
//                 </label>
//                 <div style={{
//                   display: "flex", alignItems: "stretch",
//                   border: "0.5px solid var(--color-border-secondary, #ccc)",
//                   borderRadius: "var(--border-radius-md, 8px)",
//                   overflow: "hidden",
//                   background: "var(--color-background-secondary, #f9f9f9)",
//                 }}>
//                   <span style={{
//                     padding: "0 12px", fontSize: "14px",
//                     color: "var(--color-text-secondary, #666)",
//                     display: "flex", alignItems: "center",
//                     borderRight: "0.5px solid var(--color-border-tertiary, #e5e5e5)",
//                     fontWeight: 300, whiteSpace: "nowrap",
//                   }}>
//                     🇷🇼 +250
//                   </span>
//                   <input
//                     type="tel"
//                     placeholder="07X XXX XXXX"
//                     value={phone}
//                     maxLength={10}
//                     autoFocus
//                     onChange={e => setPhone(e.target.value)}
//                     onKeyDown={e => e.key === "Enter" && handlePay()}
//                     style={{
//                       flex: 1, border: "none", background: "transparent",
//                       padding: "11px 12px", fontSize: "15px",
//                       color: "var(--color-text-primary, #111)",
//                       fontFamily: "'DM Sans', sans-serif", outline: "none",
//                     }}
//                   />
//                 </div>

//                 {error
//                   ? <p style={{ fontSize: "12px", color: "var(--color-text-danger, #c00)", margin: "8px 0 0" }}>{error}</p>
//                   : <p style={{ fontSize: "12px", color: "var(--color-text-tertiary, #999)", margin: "8px 0 0", fontWeight: 300 }}>
//                       A PIN prompt will appear on your phone to confirm.
//                     </p>
//                 }

//                 {/* Pay button */}
//                 <button
//                   onClick={handlePay}
//                   disabled={loading}
//                   style={{
//                     width: "100%", marginTop: "1.25rem", padding: "13px",
//                     background: loading ? "var(--color-background-secondary, #f5f5f5)" : "#FFCB00",
//                     color: loading ? "var(--color-text-secondary, #888)" : "#1a1400",
//                     border: "none", borderRadius: "var(--border-radius-md, 8px)",
//                     cursor: loading ? "not-allowed" : "pointer",
//                     fontSize: "14px", fontWeight: 500, letterSpacing: "0.03em",
//                     fontFamily: "'DM Sans', sans-serif",
//                     transition: "opacity 0.15s",
//                     boxSizing: "border-box",
//                   }}
//                 >
//                   {loading ? "Sending request…" : `Pay ${Number(service.price).toLocaleString()} RWF`}
//                 </button>

//                 {/* MoMo trust badge */}
//                 <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "1rem", justifyContent: "center" }}>
//                   <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FFCB00", display: "inline-block" }} />
//                   <span style={{ fontSize: "11px", color: "var(--color-text-tertiary, #999)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
//                     Secured by MTN MoMo
//                   </span>
//                 </div>
//               </div>
//             )}

//             {/* ── Step: Waiting ── */}
//             {step === "waiting" && (
//               <div style={{ textAlign: "center", padding: "2rem 0 1.5rem" }}>
//                 <div style={{
//                   width: "44px", height: "44px",
//                   border: "2px solid var(--color-border-tertiary, #e5e5e5)",
//                   borderTopColor: "#FFCB00",
//                   borderRadius: "50%",
//                   animation: "spin 0.8s linear infinite",
//                   margin: "0 auto 1.25rem",
//                 }} />
//                 <p style={{
//                   fontFamily: "'Instrument Serif', serif",
//                   fontSize: "20px", fontWeight: 400,
//                   margin: "0 0 8px", color: "var(--color-text-primary, #111)",
//                 }}>
//                   Awaiting your approval
//                 </p>
//                 <p style={{ fontSize: "13px", color: "var(--color-text-secondary, #666)", margin: 0, fontWeight: 300, lineHeight: 1.6 }}>
//                   Check your phone and enter your MoMo PIN to confirm the payment of{" "}
//                   <strong>{Number(service.price).toLocaleString()} RWF</strong>.
//                 </p>
//                 <span style={{
//                   display: "inline-block", marginTop: "1rem",
//                   fontSize: "11px", color: "var(--color-text-tertiary, #999)",
//                   background: "var(--color-background-secondary, #f5f5f5)",
//                   padding: "4px 10px", borderRadius: "20px",
//                   letterSpacing: "0.05em",
//                 }}>
//                   Ref: {referenceId?.slice(0, 10)}…
//                 </span>
//               </div>
//             )}

//             {/* ── Step: Success ── */}
//             {step === "success" && (
//               <div style={{ textAlign: "center", padding: "2rem 0 1.5rem" }}>
//                 <div style={{
//                   width: "56px", height: "56px", borderRadius: "50%",
//                   background: "var(--color-background-success, #d4edda)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   margin: "0 auto 1.25rem", fontSize: "22px",
//                 }}>✓</div>
//                 <p style={{
//                   fontFamily: "'Instrument Serif', serif",
//                   fontSize: "22px", fontWeight: 400,
//                   margin: "0 0 8px", color: "var(--color-text-success, #1a7a3c)",
//                 }}>
//                   Payment received
//                 </p>
//                 <p style={{ fontSize: "13px", color: "var(--color-text-secondary, #666)", margin: "0 0 1.5rem", fontWeight: 300, lineHeight: 1.6 }}>
//                   Your payment for <strong>{service.name}</strong> is confirmed. We'll be in touch shortly.
//                 </p>
//                 <button
//                   onClick={onClose}
//                   style={{
//                     padding: "10px 24px", fontSize: "13px", fontWeight: 500,
//                     background: "#FFCB00", color: "#1a1400", border: "none",
//                     borderRadius: "var(--border-radius-md, 8px)", cursor: "pointer",
//                     fontFamily: "'DM Sans', sans-serif",
//                   }}
//                 >
//                   Done
//                 </button>
//               </div>
//             )}

//             {/* ── Step: Failed ── */}
//             {step === "failed" && (
//               <div style={{ textAlign: "center", padding: "2rem 0 1.5rem" }}>
//                 <div style={{
//                   width: "56px", height: "56px", borderRadius: "50%",
//                   background: "var(--color-background-danger, #fde8e8)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   margin: "0 auto 1.25rem", fontSize: "22px",
//                 }}>✕</div>
//                 <p style={{
//                   fontFamily: "'Instrument Serif', serif",
//                   fontSize: "22px", fontWeight: 400,
//                   margin: "0 0 8px", color: "var(--color-text-danger, #c00)",
//                 }}>
//                   Payment failed
//                 </p>
//                 <p style={{ fontSize: "13px", color: "var(--color-text-secondary, #666)", margin: "0 0 1.5rem", fontWeight: 300, lineHeight: 1.6 }}>
//                   The payment wasn't completed. Try again or use a different number.
//                 </p>
//                 <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
//                   <button
//                     onClick={onClose}
//                     style={{
//                       padding: "10px 20px", fontSize: "13px",
//                       background: "none",
//                       border: "0.5px solid var(--color-border-secondary, #ccc)",
//                       borderRadius: "var(--border-radius-md, 8px)", cursor: "pointer",
//                       color: "var(--color-text-primary, #111)",
//                       fontFamily: "'DM Sans', sans-serif",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={resetToPhone}
//                     style={{
//                       padding: "10px 20px", fontSize: "13px", fontWeight: 500,
//                       background: "#FFCB00", color: "#1a1400", border: "none",
//                       borderRadius: "var(--border-radius-md, 8px)", cursor: "pointer",
//                       fontFamily: "'DM Sans', sans-serif",
//                     }}
//                   >
//                     Try again
//                   </button>
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </>
//   );

//   // createPortal mounts the modal directly on document.body,
//   // completely outside the React component tree's DOM position.
//   // This fixes backdrop invisibility caused by parent elements
//   // with CSS transform, overflow:hidden, or z-index stacking contexts.
//   return createPortal(modalContent, document.body);
// }

// // ─── Main Page ─────────────────────────────────────────────
// export default function ServicesPage() {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedService, setSelectedService] = useState(null);

//   useEffect(() => {
//     fetchServices()
//       .then(setServices)
//       .catch(() => setError("Failed to load services. Is the backend running?"))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div style={styles.root}>
//       <p style={styles.eyebrow}>What we offer</p>
//       <h1 style={styles.pageTitle}>Our Services</h1>
//       <p style={styles.pageSubtitle}>Choose a service — pay instantly with MTN Mobile Money.</p>

//       {loading && (
//         <>
//           <style>{`@keyframes pulse { from { opacity: 1 } to { opacity: 0.5 } }`}</style>
//           <div style={styles.grid}>
//             {[...Array(6)].map((_, i) => (
//               <div key={i} style={styles.skeletonCard} />
//             ))}
//           </div>
//         </>
//       )}

//       {error && <div style={styles.errorBox}>{error}</div>}

//       {!loading && !error && (
//         <div style={styles.grid}>
//           {services.map(s => (
//             <ServiceCard key={s.id} service={s} onSelect={setSelectedService} />
//           ))}
//         </div>
//       )}

//       {selectedService && (
//         <PaymentModal
//           service={selectedService}
//           onClose={() => setSelectedService(null)}
//         />
//       )}
//     </div>
//   );
// }