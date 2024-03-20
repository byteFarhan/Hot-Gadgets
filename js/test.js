const nums = [2, 3, 4, 5, 2, 5];

// const sumOfOdd = (total, value, idx, array) => {
//   //   console.log("total", total);
//   console.log("value", value);
//   //   console.log("idx", idx);
//   //   console.log(array);
// };

// nums?.reduce(sumOfOdd);
// const sum = sumOfOdd();
const sumOfOdd = (nums) => {
  return nums.reduce((total, value) => {
    if (value % 2 !== 0) {
      return total + value;
    }
    return total;
  });
};

const mySum = sumOfOdd(nums);
console.log(mySum);
