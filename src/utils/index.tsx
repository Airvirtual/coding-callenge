// Formats a wallet address by hiding characters 4-7 and truncating it to 13 characters.
export const formatLongText = (walletAddress: string) => {
  let hideNum = [];
  for (let i = 0; i < walletAddress?.length; i++) {
    if (i > 3 && i < 8) {
      hideNum.push("*");
    } else {
      hideNum.push(walletAddress[i]);
    }
  }
  return hideNum.slice(0, 13).join("");
};

// Removes decimal places if the number has no decimal or if it ends in ".0000".
function removeDecimal(num: any) {
  if (num % 1 === 0) {
    return num;
  } else {
    var decimal = (num + "").split(".")[1];
    if (decimal && decimal.length >= 4 && decimal.substr(-4) === "0000") {
      return parseInt(num);
    } else {
      return num;
    }
  }
}

// Formats a number by rounding it and adding commas as thousands separators.
export const formatNumber = (amount: string | number) => {
  let rounded = removeDecimal(amount);
  return Number(rounded).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Formats a timestamp by converting it to time ago (e.g. "2 hours ago").
export const formatTime = (date: number) => {
  let seconds: number = Math.floor(date / 1000);

  // Calculate the interval in years, months, days, hours, or minutes based on the number of seconds.
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + " year ago"
      : Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + " month ago"
      : Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + " day ago"
      : Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + " hour ago"
      : Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + " min ago"
      : Math.floor(interval) + " mins ago";
  }
  return Math.floor(seconds) + " secs ago";
};
