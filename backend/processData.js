class BoyerMoore {
    buildBadMatchTable(key) {
      const tableObj = {};
      const keyLength = key.length;
      for (let i = 0; i < keyLength - 1; i++) {
        tableObj[key[i]] = keyLength - 1 - i;
      }
      tableObj[key[keyLength - 1]] = keyLength;
      return tableObj;
    }
  
    implement(str, pattern) {
      const badMatchTable = this.buildBadMatchTable(pattern);
      let offset = 0;
      const patternLastIndex = pattern.length - 1;
      const maxOffset = str.length - pattern.length;
  
      while (offset <= maxOffset) {
        let scanIndex = patternLastIndex;
        while (scanIndex >= 0 && pattern[scanIndex] === str[offset + scanIndex]) {
          scanIndex--;
        }
        if (scanIndex < 0) {
          return offset;
        }
        const badMatchChar = str[offset + patternLastIndex];
        offset += badMatchTable[badMatchChar] || pattern.length;
      }
      return -1;
    }
  }
  
  /*
      "data_time" : row[0],
      "trans_no" : parseInt(row[1]),
      "credit" : parseInt(row[2]),
      "debit" : parseInt(row[3]),
      "detail" : row[4]
  */
  // an OOP class that handle all kind of data query
  class DataHandler {
    constructor(inputData) {
      this.inputData = inputData;
      this.dateComparator = (date1, date2) => {
        const parseDate = (date) => {
          const [firstPart, _] = date.split("_");
          const [day, month, year] = firstPart.split("/");
          return [parseInt(day), parseInt(month), parseInt(year)];
        };
        const [day1, month1, year1] = parseDate(date1);
        const [day2, month2, year2] = parseDate(date2);
        if (year1 != year2) {
          return year1 - year2;
        } else if (month1 != month2) {
          return month1 - month2;
        } else {
          return day1 - day2;
        }
      };
  
      this.intComparator = (num1, num2) => {
        return num1 - num2;
      };
  
      this.data = {
        byDate: {}, // {date_1 : [], date_2: [], .., date_n : [] }
        byTransNo: {}, // {TransNo_1 : [], TransNo_2: [], .., TransNo_n : [] }
        byCredit: {}, // ...
        byDebit: {}, // ..
      };
  
      inputData.forEach((item) => {
        this.data["byDate"][item.data_time] =
          this.data["byDate"][item.data_time] ?? [];
        this.data["byDate"][item.data_time].push(item);
  
        this.data["byTransNo"][item.trans_no] =
          this.data["byTransNo"][item.trans_no] ?? [];
        this.data["byTransNo"][item.trans_no].push(item);
  
        this.data["byCredit"][item.credit] =
          this.data["byCredit"][item.credit] ?? [];
        this.data["byCredit"][item.credit].push(item);
  
        this.data["byDebit"][item.debit] = 
          this.data["byDebit"][item.debit] ?? [];
        this.data["byDebit"][item.debit].push(item);
      });
  
      // support in order retrieval
      this.keys = {
        byDate: [], // [date_1, date_2, date_3, ..., date_n]
        byTransNo: [], // [TransNo_1, TransNo_2, ..., TransNo_n]
        byCredit: [],
        byDebit: [],
      };
  
      this.keys["byDate"] = Object.keys(this.data["byDate"])
        .sort(this.dateComparator);
      this.keys["byTransNo"] = Object.keys(this.data["byTransNo"])
        .map(Number)
        .sort(this.intComparator); // map into number because Object.keys always return string
      this.keys["byCredit"] = Object.keys(this.data["byCredit"])
        .map(Number)
        .sort(this.intComparator);
      this.keys["byDebit"] = Object.keys(this.data["byDebit"])
        .map(Number)
        .sort(this.intComparator);
  
      // each element should appear no more than 1
      this.keys["byDate"] = [... new Set(this.keys["byDate"])];
      this.keys["byTransNo"] = [... new Set(this.keys["byTransNo"])];
      this.keys["byCredit"] = [... new Set(this.keys["byCredit"])];
      this.keys["byDebit"] = [... new Set(this.keys["byDebit"])];
      
    }
  
    /*
      return number of entries in entry of type `type`
    */
    getSizeOfEntry({ type = undefined }) {
      if (type == undefined) {
        return undefined;
      }
      return this.keys[type].length;
    }
  
    /*
      return an array containing items of the `type` type at `index` 
      indexing by the order of its comparator
    */
    getValueInOrder({ index = undefined, type = undefined }) {
      if (index == undefined || type == undefined) {
        return undefined;
      }
      return this.data[type][this.keys[type][index]];
    }
  
    searchByDetail({ key }) {
      let results = [];
      let boyerMoore = new BoyerMoore();
      results = this.inputData.filter(
        (row) =>
          boyerMoore.implement(row.detail.toLowerCase(), key.toLowerCase()) != -1
      );
      return results;
    }
  
    /*
      return an array of item from `from` to `to` wtih type `type`
      using the given `comparator` using binary search 
    */
    searchInOrder({
      from = undefined,
      to = undefined,
      type = undefined,
      comparator = () => {},
    }) {
      if (type == undefined) {
        return undefined;
      }
      from = from == undefined ? this.keys[type][0] : from;
      to = to == undefined ? this.keys[type][this.keys[type].length - 1] : to;
      // a > b => a - b > 0
      if (comparator(from, to) > 0) {
        return undefined;
      }
      // out of bounds
      if (comparator(to, this.keys[type][0]) < 0 || comparator(this.keys[type][this.keys[type].length - 1], from) < 0) {
        return undefined;
      }
      let lo = 0,
        hi = this.keys[type].length - 1;
      let lower_bound = lo,
        upper_bound = hi; // the result will contains items in this range
      while (lo <= hi) {
        let mid = Math.floor((lo + hi) / 2);
        // a <= b => a - b <= 0
        if (comparator(from, this.keys[type][mid]) <= 0) {
          hi = mid - 1;
          lower_bound = mid;
        } else {
          lo = mid + 1;
        }
      }
      (lo = 0), (hi = this.keys[type].length - 1);
      while (lo <= hi) {
        let mid = Math.floor((lo + hi) / 2);
        // a >= b => a - b >= 0
        if (comparator(to, this.keys[type][mid]) >= 0) {
          lo = mid + 1;
          upper_bound = mid;
        } else {
          hi = mid - 1;
        }
      }
      let results = [];
      for (let i = lower_bound; i <= upper_bound; i++) {
        this.data[type][this.keys[type][i]].forEach((item) => results.push(item));
      }
      return { items: results };
    }
  
    searchByDate({ from = undefined, to = undefined }) {
      return this.searchInOrder({
        from: from,
        to: to,
        type: "byDate",
        comparator: this.dateComparator,
      });
    }
  
    searchByTransNo({ from = undefined, to = undefined }) {
      return this.searchInOrder({
        from: from,
        to: to,
        type: "byTransNo",
        comparator: this.intComparator,
      });
    }
  
    searchByCredit({ from = undefined, to = undefined }) {
      return this.searchInOrder({
        from: from,
        to: to,
        type: "byCredit",
        comparator: this.intComparator,
      });
    }
  
    searchByDebit({ from = undefined, to = undefined }) {
      return this.searchInOrder({
        from: from,
        to: to,
        type: "byDebit",
        comparator: this.intComparator,
      });
    }
  }
  
  module.exports = { DataHandler };