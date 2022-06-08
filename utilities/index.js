module.exports = {
    titleCase: function (str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
     },

    to_base: function (base, num) {
        const largest_power = ~~(Math.log(num) / Math.log(base));
        console.log(largest_power);
        const result = [];
        for (let pow = largest_power; pow >= 0; pow--) {
            const digit = ~~(num / base ** pow);
            num -= digit * base ** pow;
            result.push(digit);
        }
        return result;
    },
    
    timeStamp: function () {
        return `[${new Date(Date.now()).toISOString()}]`;
      }
};