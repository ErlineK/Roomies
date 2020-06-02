/* get list background color according to due Date. */
export function getBackgroundByDue(dueDate) {
  let bgClass = "";

  // console.log("dueDate: " + dueDate);

  const due = new Date(dueDate);
  const today = new Date();
  const diff = due - today;

  // console.log("bill due diff: " + diff);

  // if due date is in 1 day or less
  if (diff < 1000 * 60 * 60 * 24 * 1) {
    bgClass = "due1";
  }
  //if due date is in 2 days
  else if (diff < 1000 * 60 * 60 * 24 * 2) {
    bgClass = "due2";
  }

  return bgClass;
}
