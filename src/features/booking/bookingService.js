export function calculateStayTotal({ nightlyRate, nights, serviceFee = 0 }) {
  return nightlyRate * nights + serviceFee;
}
