export let emptyCheck = (content) => {
  if (content.length == 0) {
    alert("Vui lòng điền nội dung");
    return false;
  } else {
    return true;
  }
};
