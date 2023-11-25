const optionsAccepted = [
  "Transaction Date",
  "Posts Date",
  "Description",
  "Category",
  "Type",
  "Amount",
  "Memo",
  "Account Balance",
];

function headerNewAssignments(original) {
  if (optionsAccepted.includes(original)) {
    return original;
  }
  return undefined;
}

export default function configureHeaders(objs) {
  let h = Object.keys(Object.assign({}, ...objs));
  let newList = [];
  h.forEach(function (entry) {
    let obj = {};
    obj["original"] = entry;
    obj["new"] = headerNewAssignments(entry);
    newList.push(obj);
  });
  return newList;
}
