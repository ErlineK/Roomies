/* returns date in formt MMM DD HH:mm */
export function formatDate(dateBase) {
  try {
    if (dateBase !== null && dateBase !== "") {
      const iDate = new Date(dateBase);
      return new Intl.DateTimeFormat("en-CA", {
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).format(iDate);
    } else {
      return "";
    }
  } catch (err) {
    return "";
  }
}

/* returns date in formt MMM DD YYYY */
export function formatDateOnly(dateBase) {
  try {
    if (dateBase !== null && dateBase !== "") {
      const iDate = new Date(dateBase);
      return new Intl.DateTimeFormat("en-CA", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour12: false,
      }).format(iDate);
    } else {
      return "";
    }
  } catch (err) {
    return "";
  }
}

/* returns date in formt MMM DD */
export function formatDayMonth(dateBase) {
  try {
    if (dateBase !== null && dateBase !== "") {
      const iDate = new Date(dateBase);
      return new Intl.DateTimeFormat("en-CA", {
        month: "short",
        day: "numeric",
      }).format(iDate);
    } else {
      return "";
    }
  } catch (err) {
    return "";
  }
}

/* returns react-input-optimized date */
export function formatInputDate(dateBase) {
  try {
    return dateBase ? dateBase.toISOString().substr(0, 10) : "";
  } catch (err) {
    return "";
  }
}

/* returns string number in formt $1.00 */
export function formatCurrency(amount) {
  try {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currencyDisplay: "symbol",
      currency: "CAD",
    }).format(amount);
  } catch (err) {
    return "";
  }
}
