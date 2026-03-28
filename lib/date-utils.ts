export function isPreOrderPeriod() {
  const today = new Date().getDay(); 
  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  // Example: Allow weekend items to be visible from Wednesday (3) to Saturday (6)
  return today >= 3 && today <= 6;
}