export const paymentOptionsList = [
  {
    label: "Credit Card",
    id: "credit-card",
    value: "creditcard",
  },
  {
    label: "Debit Card",
    id: "debit-card",
    value: "debitcard",
  },
  {
    label: "Credit Card EMI",
    id: "credit-card-emi",
    value: "creditcardemi",
  },
  {
    label: "Debit Card EMI",
    id: "debit-card-emi",
    value: "debitcardemi",
  },
  {
    label: "Net Banking",
    id: "netbanking",
    value: "netbanking",
  },
  {
    label: "UPI",
    id: "upi",
    value: "upi",
  },
  {
    label: "Wallet",
    id: "wallet",
    value: "wallet",
  },
];

export const bankList = [
  "American Express",
  "AU Bank",
  "Axis Bank",
  "Bank of Baroda",
  "Citi Bank",
  "Federal Bank",
  "HSBC Bank",
  "ICICI Bank",
  "IDFC First Bank",
  "IndusInd Bank",
  "ING VYSYA BANK LTD",
  "KOTAKM Bank",
  "RatnakarBL Bank",
  "STANDARD CHARTERED BANK",
  "StandardCB Bank",
  "State Bank of India",
  "YES Bank",
  "Other Banks",
];

export const walletList = [
  "PayTm Wallet",
  "Oxigen Wallet",
  "HDFC Payzapp Wallet",
  "Yes bank Wallet",
  "PhonePe",
  "Freecharge",
  "Jio Wallet Money",
  "ITZ Cash Card",
  "ICC Cash Card",
];

export const YearList = () => {
  const currentYear = new Date().getUTCFullYear();
  let result = [];

  for (let i = 0; i < 30; i++) {
    result.push(currentYear + i);
  }

  return result;
};
