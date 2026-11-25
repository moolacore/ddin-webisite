// import { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// // ─── API Config ───────────────────────────────────────────────────────────────

// const BASE_URL = "/v1";
// const api = axios.create({ baseURL: BASE_URL });

// // ─── Auth helpers ─────────────────────────────────────────────────────────────

// function saveTokens({ token, refreshToken }) {
//   if (token) localStorage.setItem("ddin_token", token);
//   if (refreshToken) localStorage.setItem("ddin_refresh", refreshToken);
// }
// function getToken() {
//   return localStorage.getItem("ddin_token") || "";
// }
// function getRefreshToken() {
//   return localStorage.getItem("ddin_refresh") || "";
// }
// function clearTokens() {
//   localStorage.removeItem("ddin_token");
//   localStorage.removeItem("ddin_refresh");
// }
// function getAuthHeaders() {
//   return {
//     Authorization: `Bearer ${getToken()}`,
//     "Content-Type": "application/json",
//   };
// }
// function isLoggedIn() {
//   return !!getToken();
// }

// // ─── Auto-auth credentials ────────────────────────────────────────────────────

// const AUTO_AUTH = { username: "User1", password: "User1@0123" };

// // ─── API layer ────────────────────────────────────────────────────────────────

// const DDIN = {
//   login: (username, password) =>
//     api.post("/agency/auth/login", { username, password }),

//   refreshToken: () =>
//     api.post("/agency/auth/refresh-token", { refreshToken: getRefreshToken() }),

//   getMainBalance: () =>
//     api.get("/agency/accounts/main/balance", { headers: getAuthHeaders() }),

//   validateBiller: ({ billerCode, productCode, customerId }) =>
//     api.post(
//       "/agency/thirdpartyagency/services/validate/biller",
//       { billerCode, productCode, customerId },
//       { headers: getAuthHeaders() },
//     ),

//   executeBillPayment: ({
//     email,
//     clientPhone,
//     customerId,
//     billerCode,
//     productCode,
//     amount,
//     ccy = "RWF",
//     requestId,
//   }) =>
//     api.post(
//       "/agency/thirdpartyagency/services/execute/bill-payment",
//       {
//         email,
//         clientPhone,
//         customerId,
//         billerCode,
//         productCode,
//         amount: String(amount),
//         ccy,
//         requestId,
//       },
//       { headers: getAuthHeaders() },
//     ),

//   getTransactionDetails: (txId) =>
//     api.get(`/agency/thirdpartyagency/services/transaction/details/${txId}`),

//   initiateCollection: ({
//     provider = "mtn",
//     customerAccountNumber,
//     customerName,
//     amount,
//     referenceId,
//     description = "",
//   }) =>
//     api.post(
//       "/thirdparty/collection/initiate",
//       {
//         provider,
//         customerAccountNumber,
//         customerName,
//         currencyCode: "RWF",
//         amount: String(parseFloat(amount).toFixed(2)),
//         referenceId,
//         additionalProperties: { description },
//       },
//       {
//         headers: {
//           ...getAuthHeaders(),
//           "X-API-key": "156n7LEdNnMfbAGDCZvKL4Or8bdH4zzO",
//         },
//       },
//     ),

//   getCollectionStatus: (operationId) =>
//     api.get(`/thirdparty/collection/operation/${operationId}`, {
//       headers: getAuthHeaders(),
//     }),
// };

// // ─── Services catalog ─────────────────────────────────────────────────────────

// const SERVICES = [
//   {
//     id: "wasac",
//     name: "WASAC water bill",
//     desc: "Pay your water and sanitation bill",
//     category: "Utilities",
//     icon: "💧",
//     color: "blue",
//     billerCode: "wasac",
//     productCode: "wasac",
//     fields: [
//       {
//         name: "customerId",
//         label: "Account number",
//         type: "text",
//         placeholder: "e.g. 0123456789",
//         hint: "Found on your water bill",
//       },
//       {
//         name: "clientPhone",
//         label: "Phone number",
//         type: "tel",
//         placeholder: "07X XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "e.g. 5000",
//       },
//     ],
//   },
//   {
//     id: "reco",
//     name: "REG electricity",
//     desc: "Rwanda Energy Group token purchase",
//     category: "Utilities",
//     icon: "⚡",
//     color: "amber",
//     billerCode: "reco",
//     productCode: "reco",
//     fields: [
//       {
//         name: "customerId",
//         label: "Meter number",
//         type: "text",
//         placeholder: "e.g. 12345678",
//       },
//       {
//         name: "clientPhone",
//         label: "Phone number",
//         type: "tel",
//         placeholder: "07X XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "e.g. 5000",
//       },
//     ],
//   },
//   {
//     id: "tax",
//     name: "RRA tax payment",
//     desc: "Income tax, VAT, and other taxes",
//     category: "Government",
//     icon: "🧾",
//     color: "coral",
//     billerCode: "tax",
//     productCode: "tax",
//     fields: [
//       {
//         name: "customerId",
//         label: "TIN number",
//         type: "text",
//         placeholder: "e.g. 100XXXXXXX",
//       },
//       {
//         name: "clientPhone",
//         label: "Phone number",
//         type: "tel",
//         placeholder: "07X XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "Enter tax amount",
//       },
//     ],
//   },
//   {
//     id: "irembo",
//     name: "Irembo e-services",
//     desc: "Government permits, licenses & certificates",
//     category: "Government",
//     icon: "🪪",
//     color: "purple",
//     billerCode: "irembo",
//     productCode: "irembo",
//     fields: [
//       {
//         name: "customerId",
//         label: "National ID",
//         type: "text",
//         placeholder: "1 XXXX X XXXXXXX X XX",
//       },
//       {
//         name: "clientPhone",
//         label: "Phone number",
//         type: "tel",
//         placeholder: "07X XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "Enter amount",
//       },
//     ],
//   },
//   {
//     id: "rssb",
//     name: "RSSB contributions",
//     desc: "Social security & medical insurance",
//     category: "Government",
//     icon: "🏥",
//     color: "teal",
//     billerCode: "rssb",
//     productCode: "rssb",
//     fields: [
//       {
//         name: "customerId",
//         label: "Employee NID / Employer code",
//         type: "text",
//         placeholder: "e.g. 1XXXXXXXXXXXX",
//       },
//       {
//         name: "clientPhone",
//         label: "Phone number",
//         type: "tel",
//         placeholder: "07X XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "Enter amount",
//       },
//     ],
//   },
//   {
//     id: "mpost",
//     name: "Rwanda Post (MPost)",
//     desc: "Pay postal services and parcel fees",
//     category: "Government",
//     icon: "📮",
//     color: "purple",
//     billerCode: "mpost",
//     productCode: "mpost",
//     fields: [
//       {
//         name: "customerId",
//         label: "Tracking / parcel code",
//         type: "text",
//         placeholder: "e.g. RW123456789",
//       },
//       {
//         name: "clientPhone",
//         label: "Phone number",
//         type: "tel",
//         placeholder: "07X XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "Enter amount",
//       },
//     ],
//   },
//   {
//     id: "mtn",
//     name: "MTN airtime & data",
//     desc: "Buy airtime or data bundles via MoMo",
//     category: "Telecom",
//     icon: "📱",
//     color: "amber",
//     billerCode: "mtn",
//     productCode: "airtime",
//     isMomoCollection: true,
//     fields: [
//       {
//         name: "customerId",
//         label: "MTN number",
//         type: "tel",
//         placeholder: "078 XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "e.g. 1000",
//       },
//     ],
//   },
//   {
//     id: "airtel",
//     name: "Airtel airtime",
//     desc: "Top up Airtel numbers",
//     category: "Telecom",
//     icon: "📲",
//     color: "coral",
//     billerCode: "airtel",
//     productCode: "airtime",
//     isMomoCollection: true,
//     fields: [
//       {
//         name: "customerId",
//         label: "Airtel number",
//         type: "tel",
//         placeholder: "073 XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "e.g. 1000",
//       },
//     ],
//   },
//   {
//     id: "bk",
//     name: "Bank of Kigali",
//     desc: "Account top-up and transfers",
//     category: "Financial",
//     icon: "🏦",
//     color: "blue",
//     billerCode: "bk",
//     productCode: "bk",
//     fields: [
//       {
//         name: "customerId",
//         label: "BK account number",
//         type: "text",
//         placeholder: "e.g. 00040XXXXXXXXX",
//       },
//       {
//         name: "clientPhone",
//         label: "Phone number",
//         type: "tel",
//         placeholder: "07X XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "Enter amount",
//       },
//     ],
//   },
//   {
//     id: "spenn",
//     name: "SPENN wallet",
//     desc: "Top up SPENN mobile wallet",
//     category: "Financial",
//     icon: "👛",
//     color: "teal",
//     billerCode: "spenn",
//     productCode: "spenn",
//     isMomoCollection: true,
//     fields: [
//       {
//         name: "customerId",
//         label: "SPENN phone number",
//         type: "tel",
//         placeholder: "07X XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "e.g. 5000",
//       },
//     ],
//   },
//   {
//     id: "ecobank",
//     name: "Ecobank transfer",
//     desc: "Send money to Ecobank accounts",
//     category: "Financial",
//     icon: "💸",
//     color: "green",
//     billerCode: "ecobank",
//     productCode: "ecobank",
//     fields: [
//       {
//         name: "customerId",
//         label: "Account number",
//         type: "text",
//         placeholder: "Enter account number",
//       },
//       {
//         name: "clientPhone",
//         label: "Phone number",
//         type: "tel",
//         placeholder: "07X XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "Enter amount",
//       },
//     ],
//   },
//   {
//     id: "school",
//     name: "School fees",
//     desc: "Pay tuition and school levies",
//     category: "Financial",
//     icon: "🎓",
//     color: "green",
//     billerCode: "school",
//     productCode: "school",
//     fields: [
//       {
//         name: "customerId",
//         label: "Student ID",
//         type: "text",
//         placeholder: "Enter student ID",
//       },
//       {
//         name: "clientPhone",
//         label: "Phone number",
//         type: "tel",
//         placeholder: "07X XXX XXXX",
//       },
//       {
//         name: "amount",
//         label: "Amount (RWF)",
//         type: "number",
//         placeholder: "Enter amount",
//       },
//     ],
//   },
// ];

// const CATEGORIES = ["All", "Utilities", "Government", "Financial", "Telecom"];

// const COLOR_MAP = {
//   blue: { bg: "#E6F1FB", text: "#185FA5" },
//   amber: { bg: "#FAEEDA", text: "#854F0B" },
//   purple: { bg: "#EEEDFE", text: "#534AB7" },
//   coral: { bg: "#FAECE7", text: "#993C1D" },
//   green: { bg: "#EAF3DE", text: "#3B6D11" },
//   teal: { bg: "#E1F5EE", text: "#085041" },
// };

// // ─── Shared styles ────────────────────────────────────────────────────────────

// const S = {
//   input: {
//     width: "100%",
//     padding: "9px 12px",
//     border: "0.5px solid #c8c5bf",
//     borderRadius: 8,
//     fontSize: 14,
//     background: "#fff",
//     color: "#1a1a18",
//     outline: "none",
//     boxSizing: "border-box",
//   },
//   label: {
//     display: "block",
//     fontSize: 13,
//     fontWeight: 500,
//     color: "#6b6b67",
//     marginBottom: 6,
//   },
//   btn: (bg = "#1D9E75", color = "#fff") => ({
//     padding: "10px 20px",
//     background: bg,
//     color,
//     border: bg === "transparent" ? "0.5px solid #c8c5bf" : "none",
//     borderRadius: 8,
//     fontSize: 14,
//     fontWeight: 500,
//     cursor: "pointer",
//   }),
//   card: {
//     background: "#fff",
//     border: "0.5px solid #e0ddd7",
//     borderRadius: 12,
//     padding: 16,
//     cursor: "pointer",
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//     width: "100%",
//     textAlign: "left",
//   },
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(0,0,0,.45)",
//     zIndex: 1000,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//   },
//   modal: {
//     background: "#fff",
//     borderRadius: 16,
//     border: "0.5px solid #e0ddd7",
//     width: "100%",
//     maxWidth: 460,
//     maxHeight: "90vh",
//     overflowY: "auto",
//     boxSizing: "border-box",
//   },
//   error: {
//     background: "#FCEBEB",
//     border: "0.5px solid #F09595",
//     borderRadius: 8,
//     padding: "10px 12px",
//     fontSize: 13,
//     color: "#A32D2D",
//     marginBottom: 14,
//   },
// };

// function focusStyle(e) {
//   e.target.style.borderColor = "#1D9E75";
//   e.target.style.boxShadow = "0 0 0 3px rgba(29,158,117,.12)";
// }
// function blurStyle(e) {
//   e.target.style.borderColor = "#c8c5bf";
//   e.target.style.boxShadow = "none";
// }

// // ─── Spinner ──────────────────────────────────────────────────────────────────

// function Spinner({ size = 28, color = "#1D9E75" }) {
//   return (
//     <>
//       <style>{`@keyframes ddinspin{to{transform:rotate(360deg)}}`}</style>
//       <div
//         style={{
//           width: size,
//           height: size,
//           border: `2px solid ${color}33`,
//           borderTopColor: color,
//           borderRadius: "50%",
//           animation: "ddinspin .7s linear infinite",
//           flexShrink: 0,
//         }}
//       />
//     </>
//   );
// }

// // ─── Service Card ─────────────────────────────────────────────────────────────

// function ServiceCard({ service, onClick }) {
//   const c = COLOR_MAP[service.color] || COLOR_MAP.teal;
//   return (
//     <button
//       style={S.card}
//       onClick={() => onClick(service)}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.borderColor = "#b0ada7";
//         e.currentTarget.style.background = "#fafaf9";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.borderColor = "#e0ddd7";
//         e.currentTarget.style.background = "#fff";
//       }}
//     >
//       <div
//         style={{
//           width: 40,
//           height: 40,
//           borderRadius: 8,
//           background: c.bg,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: 20,
//         }}
//       >
//         {service.icon}
//       </div>
//       <div style={{ flex: 1 }}>
//         <div
//           style={{
//             fontSize: 14,
//             fontWeight: 500,
//             color: "#1a1a18",
//             marginBottom: 3,
//             lineHeight: 1.4,
//           }}
//         >
//           {service.name}
//         </div>
//         <div style={{ fontSize: 12, color: "#6b6b67", lineHeight: 1.5 }}>
//           {service.desc}
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <span
//           style={{
//             fontSize: 11,
//             padding: "3px 8px",
//             borderRadius: 20,
//             background: "#E1F5EE",
//             color: "#085041",
//           }}
//         >
//           {service.category}
//         </span>
//         <span style={{ fontSize: 13, color: "#b0ada7" }}>→</span>
//       </div>
//     </button>
//   );
// }

// // ─── Payment Modal ────────────────────────────────────────────────────────────

// function PaymentModal({ service, onClose, authReady }) {
//   const c = COLOR_MAP[service.color] || COLOR_MAP.teal;

//   const [step, setStep] = useState("form");
//   const [formValues, setFormValues] = useState({});
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [validationData, setValidationData] = useState(null);
//   const [txResult, setTxResult] = useState(null);
//   const [operationId, setOperationId] = useState(null);
//   const pollRef = useRef(null);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => {
//       window.removeEventListener("keydown", onKey);
//       clearInterval(pollRef.current);
//     };
//   }, [onClose]);

//   const handleField = useCallback((name, val) => {
//     setFormValues((p) => ({ ...p, [name]: val }));
//     setError("");
//   }, []);

//   const handleValidate = async () => {
//     const missing = service.fields.find((f) => !formValues[f.name]?.trim());
//     if (missing) {
//       setError(`Please enter your ${missing.label.toLowerCase()}.`);
//       return;
//     }
//     setError("");

//     if (service.isMomoCollection) {
//       setValidationData(null);
//       setStep("validated");
//       return;
//     }

//     setStep("validating");
//     try {
//       const { data } = await DDIN.validateBiller({
//         billerCode: service.billerCode,
//         productCode: service.productCode,
//         customerId: formValues.customerId,
//       });
//       setValidationData(data?.data || data);
//       setStep("validated");
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//           "Validation failed. Check account details.",
//       );
//       setStep("form");
//     }
//   };

//   const handlePay = async () => {
//     setError("");
//     setStep("paying");
//     const requestId = uuidv4();
//     try {
//       if (service.isMomoCollection) {
//         const rawPhone = formValues.customerId.replace(/\s/g, "");
//         const e164 = rawPhone.startsWith("0")
//           ? `250${rawPhone.slice(1)}`
//           : rawPhone;
//         const { data } = await DDIN.initiateCollection({
//           provider: service.id === "mtn" ? "mtn" : "airtel",
//           customerAccountNumber: e164,
//           customerName: validationData?.customerName || "Customer",
//           amount: formValues.amount,
//           referenceId: requestId,
//           description: `${service.name} payment`,
//         });
//         const opId = data?.data?.operationId || data?.operationId;
//         if (!opId) throw new Error("No operation ID returned.");
//         setOperationId(opId);
//         setStep("polling");
//         startPolling(opId);
//       } else {
//         const { data } = await DDIN.executeBillPayment({
//           email,
//           clientPhone: formValues.clientPhone || formValues.customerId,
//           customerId: formValues.customerId,
//           billerCode: service.billerCode,
//           productCode: service.productCode,
//           amount: formValues.amount,
//           requestId,
//         });
//         setTxResult(data?.data || data);
//         setStep("success");
//       }
//     } catch (err) {
//       setError(
//         err?.response?.data?.message || "Payment failed. Please try again.",
//       );
//       setStep("validated");
//     }
//   };

//   const startPolling = (opId) => {
//     let attempts = 0;
//     pollRef.current = setInterval(async () => {
//       attempts++;
//       try {
//         const { data } = await DDIN.getCollectionStatus(opId);
//         const status = (
//           data?.data?.status ||
//           data?.status ||
//           ""
//         ).toLowerCase();
//         if (["successful", "success", "completed"].includes(status)) {
//           clearInterval(pollRef.current);
//           setTxResult(data?.data || data);
//           setStep("success");
//         } else if (["failed", "error", "declined"].includes(status)) {
//           clearInterval(pollRef.current);
//           setError(
//             "Payment was declined by the mobile network. Please try again.",
//           );
//           setStep("validated");
//         } else if (attempts >= 20) {
//           clearInterval(pollRef.current);
//           setError(
//             "Could not confirm payment. Check transaction history for final status.",
//           );
//           setStep("validated");
//         }
//       } catch {
//         if (attempts >= 20) {
//           clearInterval(pollRef.current);
//           setError("Could not reach server. Check history for status.");
//           setStep("validated");
//         }
//       }
//     }, 3000);
//   };

//   const STEP_LABELS = {
//     validating: "Verifying account details…",
//     paying: "Processing payment…",
//     polling: "Waiting for MoMo confirmation…",
//   };

//   // If auth isn't ready yet when user hits confirm, show brief inline wait
//   const handleConfirmClick = () => {
//     if (!isLoggedIn()) {
//       setStep("authwait");
//       const interval = setInterval(() => {
//         if (isLoggedIn()) {
//           clearInterval(interval);
//           handlePay();
//         }
//       }, 300);
//       // Give up after 10s
//       setTimeout(() => {
//         clearInterval(interval);
//         if (!isLoggedIn()) {
//           setError("Authentication not ready. Please try again in a moment.");
//           setStep("validated");
//         }
//       }, 10000);
//     } else {
//       handlePay();
//     }
//   };

//   return (
//     <div
//       style={S.overlay}
//       onClick={(e) => {
//         if (e.target === e.currentTarget) onClose();
//       }}
//     >
//       <div
//         style={S.modal}
//         role="dialog"
//         aria-modal="true"
//         aria-label={`Pay — ${service.name}`}
//       >
//         {/* Header */}
//         <div
//           style={{
//             padding: "20px 20px 14px",
//             borderBottom: "0.5px solid #e0ddd7",
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//           }}
//         >
//           <div
//             style={{
//               width: 38,
//               height: 38,
//               borderRadius: 8,
//               background: c.bg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: 20,
//               flexShrink: 0,
//             }}
//           >
//             {service.icon}
//           </div>
//           <div style={{ flex: 1 }}>
//             <div style={{ fontSize: 16, fontWeight: 500, color: "#1a1a18" }}>
//               {service.name}
//             </div>
//             <div style={{ fontSize: 12, color: "#6b6b67", marginTop: 2 }}>
//               {service.desc}
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             aria-label="Close"
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               color: "#a09d98",
//               fontSize: 20,
//               padding: 4,
//               lineHeight: 1,
//             }}
//           >
//             ✕
//           </button>
//         </div>

//         {/* Loading states */}
//         {["validating", "paying", "polling", "authwait"].includes(step) && (
//           <div style={{ textAlign: "center", padding: "52px 20px" }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginBottom: 16,
//               }}
//             >
//               <Spinner size={36} />
//             </div>
//             <p style={{ fontSize: 14, color: "#6b6b67" }}>
//               {step === "authwait"
//                 ? "Authenticating…"
//                 : STEP_LABELS[step]}
//             </p>
//             {step === "polling" && operationId && (
//               <p
//                 style={{
//                   fontSize: 11,
//                   fontFamily: "monospace",
//                   color: "#a09d98",
//                   marginTop: 8,
//                 }}
//               >
//                 Op: {operationId}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Form */}
//         {step === "form" && (
//           <div style={{ padding: 20 }}>
//             {error && <div style={S.error}>{error}</div>}
//             {service.fields.map((f) => (
//               <div key={f.name} style={{ marginBottom: 14 }}>
//                 <label style={S.label}>{f.label}</label>
//                 <input
//                   style={S.input}
//                   type={f.type}
//                   placeholder={f.placeholder}
//                   value={formValues[f.name] || ""}
//                   onChange={(e) => handleField(f.name, e.target.value)}
//                   onFocus={focusStyle}
//                   onBlur={blurStyle}
//                 />
//                 {f.hint && (
//                   <div style={{ fontSize: 11, color: "#a09d98", marginTop: 4 }}>
//                     {f.hint}
//                   </div>
//                 )}
//               </div>
//             ))}
//             <button
//               onClick={handleValidate}
//               style={{
//                 ...S.btn(),
//                 width: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 8,
//               }}
//             >
//               {service.isMomoCollection ? "Continue →" : "Verify account →"}
//             </button>
//           </div>
//         )}

//         {/* Validated — confirm & pay */}
//         {step === "validated" && (
//           <div style={{ padding: 20 }}>
//             {error && <div style={S.error}>{error}</div>}

//             {validationData && (
//               <div
//                 style={{
//                   background: "#E1F5EE",
//                   border: "0.5px solid #5DCAA5",
//                   borderRadius: 8,
//                   padding: 12,
//                   marginBottom: 16,
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: 12,
//                     fontWeight: 500,
//                     color: "#085041",
//                     marginBottom: 6,
//                   }}
//                 >
//                   Account verified ✓
//                 </div>
//                 {validationData.customerName && (
//                   <div style={{ fontSize: 13, color: "#0F6E56" }}>
//                     Name:{" "}
//                     <strong style={{ fontWeight: 500 }}>
//                       {validationData.customerName}
//                     </strong>
//                   </div>
//                 )}
//                 {validationData.balance !== undefined && (
//                   <div style={{ fontSize: 13, color: "#0F6E56", marginTop: 3 }}>
//                     Current balance:{" "}
//                     <strong style={{ fontWeight: 500 }}>
//                       {Number(validationData.balance).toLocaleString()} RWF
//                     </strong>
//                   </div>
//                 )}
//                 {validationData.amount !== undefined && (
//                   <div style={{ fontSize: 13, color: "#0F6E56", marginTop: 3 }}>
//                     Amount due:{" "}
//                     <strong style={{ fontWeight: 500 }}>
//                       {Number(validationData.amount).toLocaleString()} RWF
//                     </strong>
//                   </div>
//                 )}
//               </div>
//             )}

//             <div
//               style={{
//                 background: "#fafaf9",
//                 borderRadius: 8,
//                 padding: 12,
//                 marginBottom: 14,
//               }}
//             >
//               {service.fields.map((f) => (
//                 <div
//                   key={f.name}
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontSize: 13,
//                     padding: "3px 0",
//                     color: "#6b6b67",
//                   }}
//                 >
//                   <span>{f.label}</span>
//                   <span style={{ fontWeight: 500, color: "#1a1a18" }}>
//                     {formValues[f.name]}
//                   </span>
//                 </div>
//               ))}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   fontSize: 14,
//                   padding: "8px 0 0",
//                   marginTop: 6,
//                   borderTop: "0.5px solid #e8e5e0",
//                   fontWeight: 500,
//                   color: "#1a1a18",
//                 }}
//               >
//                 <span>Total</span>
//                 <span>
//                   {Number(formValues.amount || 0).toLocaleString()} RWF
//                 </span>
//               </div>
//             </div>

//             <div style={{ marginBottom: 16 }}>
//               <label style={S.label}>
//                 Receipt email{" "}
//                 <span style={{ fontWeight: 400, color: "#a09d98" }}>
//                   (optional)
//                 </span>
//               </label>
//               <input
//                 style={S.input}
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onFocus={focusStyle}
//                 onBlur={blurStyle}
//               />
//             </div>

//             <div style={{ display: "flex", gap: 10 }}>
//               <button
//                 onClick={() => {
//                   setStep("form");
//                   setError("");
//                   setValidationData(null);
//                 }}
//                 style={{ ...S.btn("transparent", "#6b6b67"), flex: 1 }}
//               >
//                 ← Back
//               </button>
//               <button
//                 onClick={handleConfirmClick}
//                 style={{
//                   ...S.btn(),
//                   flex: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: 8,
//                 }}
//               >
//                 🔒 Confirm & pay
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Success */}
//         {step === "success" && (
//           <div style={{ textAlign: "center", padding: "40px 20px" }}>
//             <div
//               style={{
//                 width: 56,
//                 height: 56,
//                 borderRadius: "50%",
//                 background: "#E1F5EE",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 28,
//                 margin: "0 auto 16px",
//               }}
//             >
//               ✓
//             </div>
//             <h3
//               style={{
//                 fontSize: 18,
//                 fontWeight: 500,
//                 color: "#1a1a18",
//                 marginBottom: 8,
//               }}
//             >
//               Payment successful
//             </h3>
//             <p style={{ fontSize: 14, color: "#6b6b67", lineHeight: 1.6 }}>
//               Your{" "}
//               <strong style={{ fontWeight: 500 }}>{service.name}</strong>{" "}
//               payment has been processed.
//             </p>
//             {txResult && (
//               <div
//                 style={{
//                   background: "#fafaf9",
//                   borderRadius: 8,
//                   padding: 12,
//                   marginTop: 16,
//                   textAlign: "left",
//                 }}
//               >
//                 {txResult.transactionId && (
//                   <div style={{ fontSize: 12, color: "#6b6b67" }}>
//                     Tx ID:{" "}
//                     <span style={{ fontFamily: "monospace" }}>
//                       {txResult.transactionId}
//                     </span>
//                   </div>
//                 )}
//                 {txResult.referenceId && (
//                   <div
//                     style={{ fontSize: 12, color: "#6b6b67", marginTop: 4 }}
//                   >
//                     Ref:{" "}
//                     <span style={{ fontFamily: "monospace" }}>
//                       {txResult.referenceId}
//                     </span>
//                   </div>
//                 )}
//                 {txResult.amount && (
//                   <div
//                     style={{ fontSize: 12, color: "#6b6b67", marginTop: 4 }}
//                   >
//                     Amount: {Number(txResult.amount).toLocaleString()} RWF
//                   </div>
//                 )}
//                 {txResult.status && (
//                   <div
//                     style={{
//                       fontSize: 12,
//                       color: "#085041",
//                       marginTop: 4,
//                       fontWeight: 500,
//                       textTransform: "capitalize",
//                     }}
//                   >
//                     Status: {txResult.status}
//                   </div>
//                 )}
//               </div>
//             )}
//             <button
//               onClick={onClose}
//               style={{ ...S.btn("transparent", "#1a1a18"), marginTop: 20 }}
//             >
//               Done
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────

// export default function DDINPaymentPage() {
//   const [authReady, setAuthReady] = useState(isLoggedIn());
//   const [balance, setBalance] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [search, setSearch] = useState("");
//   const [selectedService, setSelectedService] = useState(null);

//   // ── Silent background authentication on mount ─────────────────────────────
//   useEffect(() => {
//     if (isLoggedIn()) {
//       setAuthReady(true);
//       fetchBalance();
//       return;
//     }
//     DDIN.login(AUTO_AUTH.username, AUTO_AUTH.password)
//       .then(({ data }) => {
//         const token =
//           data?.data?.accessToken ||
//           data?.data?.token ||
//           data?.accessToken ||
//           data?.token;
//         const refreshToken = data?.data?.refreshToken || data?.refreshToken;
//         if (token) {
//           saveTokens({ token, refreshToken });
//           setAuthReady(true);
//           fetchBalance();
//         }
//       })
//       .catch(() => {
//         // Silently fail — user can still browse; pay will retry auth if needed
//       });
//   }, []);

//   // ── Proactive token refresh every 25 minutes ──────────────────────────────
//   useEffect(() => {
//     const id = setInterval(() => {
//       if (!isLoggedIn()) return;
//       DDIN.refreshToken()
//         .then(({ data }) => {
//           const token =
//             data?.data?.accessToken ||
//             data?.data?.token ||
//             data?.accessToken ||
//             data?.token;
//           const refreshToken = data?.data?.refreshToken || data?.refreshToken;
//           if (token) saveTokens({ token, refreshToken });
//         })
//         .catch(() => {
//           // If refresh fails, re-authenticate silently
//           clearTokens();
//           DDIN.login(AUTO_AUTH.username, AUTO_AUTH.password)
//             .then(({ data }) => {
//               const token =
//                 data?.data?.accessToken ||
//                 data?.data?.token ||
//                 data?.accessToken ||
//                 data?.token;
//               const refreshToken =
//                 data?.data?.refreshToken || data?.refreshToken;
//               if (token) saveTokens({ token, refreshToken });
//             })
//             .catch(() => {});
//         });
//     }, 25 * 60 * 1000);
//     return () => clearInterval(id);
//   }, []);

//   const fetchBalance = () => {
//     DDIN.getMainBalance()
//       .then(({ data }) =>
//         setBalance(data?.data?.balance ?? data?.balance ?? null),
//       )
//       .catch(() => {});
//   };

//   const filtered = SERVICES.filter((s) => {
//     const matchCat =
//       activeCategory === "All" || s.category === activeCategory;
//     const q = search.toLowerCase();
//     return (
//       matchCat &&
//       (!q ||
//         s.name.toLowerCase().includes(q) ||
//         s.desc.toLowerCase().includes(q))
//     );
//   });

//   return (
//     <>
//       {/* ── Hero / Section ─────────────────────────────────────────────── */}
//       <section
//         className="pt-8 pb-6"
//         style={{ background: "#f8f8f6", marginTop: "4rem" }}
//       >
//         <div className="container">
//           <div className="row justify-content-center mb-5">
//             <div className="col-xl-7 col-lg-8 col-md-10 text-center">
//               <div className="label text-success bg-light-success d-inline-flex rounded-4 mb-2 font--medium">
//                 <span>pay services</span>
//               </div>
//               <h2 className="mb-3 lh-base">
//                 Pay bills &amp; services{" "}
//                 <span style={{ color: "#F8882B" }}>instantly</span>
//               </h2>
//               <p className="mb-0 fs-5 fw-light">
//                 Water, electricity, taxes, telecom and more — all in one place
//                 through our agent network.
//               </p>
//             </div>
//           </div>

//           {/* ── Services panel ──────────────────────────────────────────── */}
//           <div
//             style={{
//               maxWidth: 800,
//               margin: "0 auto",
//               fontFamily: "Inter, system-ui, sans-serif",
//             }}
//           >
//             {/* Top bar */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginBottom: 24,
//                 flexWrap: "wrap",
//                 gap: 12,
//               }}
//             >
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <div
//                   style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: 8,
//                     background: "#E1F5EE",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 18,
//                   }}
//                 >
//                   🏦
//                 </div>
//                 <div>
//                   <div
//                     style={{ fontSize: 16, fontWeight: 500, color: "#1a1a18" }}
//                   >
//                     DDIN payment services
//                   </div>
//                   <div style={{ fontSize: 12, color: "#6b6b67" }}>
//                     Browse and pay services below
//                   </div>
//                 </div>
//               </div>

//               {balance !== null && (
//                 <div
//                   style={{
//                     fontSize: 13,
//                     background: "#fafaf9",
//                     border: "0.5px solid #e0ddd7",
//                     borderRadius: 8,
//                     padding: "6px 12px",
//                     color: "#1a1a18",
//                   }}
//                 >
//                   Balance:{" "}
//                   <strong style={{ fontWeight: 500 }}>
//                     {Number(balance).toLocaleString()} RWF
//                   </strong>
//                 </div>
//               )}
//             </div>

//             {/* Search */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 background: "#fff",
//                 border: "0.5px solid #c8c5bf",
//                 borderRadius: 8,
//                 padding: "8px 12px",
//                 marginBottom: 14,
//               }}
//             >
//               <span style={{ fontSize: 15, color: "#a09d98" }}>🔍</span>
//               <input
//                 type="text"
//                 placeholder="Search services…"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 style={{
//                   border: "none",
//                   outline: "none",
//                   background: "transparent",
//                   fontSize: 14,
//                   color: "#1a1a18",
//                   flex: 1,
//                 }}
//               />
//               {search && (
//                 <button
//                   onClick={() => setSearch("")}
//                   style={{
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     color: "#a09d98",
//                     fontSize: 16,
//                   }}
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>

//             {/* Category tabs */}
//             <div
//               style={{
//                 display: "flex",
//                 gap: 8,
//                 flexWrap: "wrap",
//                 marginBottom: 18,
//               }}
//             >
//               {CATEGORIES.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   style={{
//                     padding: "6px 14px",
//                     borderRadius: 20,
//                     fontSize: 13,
//                     cursor: "pointer",
//                     border:
//                       activeCategory === cat
//                         ? "none"
//                         : "0.5px solid #e0ddd7",
//                     background:
//                       activeCategory === cat ? "#1D9E75" : "#fff",
//                     color:
//                       activeCategory === cat ? "#fff" : "#6b6b67",
//                     fontWeight: activeCategory === cat ? 500 : 400,
//                   }}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* Section label */}
//             <div
//               style={{
//                 fontSize: 11,
//                 fontWeight: 500,
//                 color: "#a09d98",
//                 letterSpacing: ".06em",
//                 textTransform: "uppercase",
//                 marginBottom: 12,
//               }}
//             >
//               {activeCategory === "All"
//                 ? `All services (${filtered.length})`
//                 : `${activeCategory} — ${filtered.length} service${
//                     filtered.length !== 1 ? "s" : ""
//                   }`}
//             </div>

//             {/* Grid */}
//             {filtered.length > 0 ? (
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns:
//                     "repeat(auto-fill, minmax(180px, 1fr))",
//                   gap: 12,
//                 }}
//               >
//                 {filtered.map((s) => (
//                   <ServiceCard
//                     key={s.id}
//                     service={s}
//                     onClick={setSelectedService}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <p style={{ fontSize: 14, color: "#a09d98", padding: "16px 0" }}>
//                 No services match "{search}".
//               </p>
//             )}
//           </div>
//         </div>
//       </section>

//       <div className="clearfix" />

//       {/* ── Payment modal ─────────────────────────────────────────────── */}
//       {selectedService && (
//         <PaymentModal
//           service={selectedService}
//           onClose={() => setSelectedService(null)}
//           authReady={authReady}
//         />
//       )}
//     </>
//   );
// }