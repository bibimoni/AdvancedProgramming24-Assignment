// an OOP class that handle all kind of data query

/*
    "data_time" : row[0],
    "trans_no" : parseInt(row[1]),
    "credit" : parseInt(row[2]),
    "debit" : parseInt(row[3]),
    "detail" : row[4]
*/

class DataHandler {
  constructor(inputData) {

    this.dateComparator = (date1, date2) => {
      const parseDate = (date) => {
        const [firstPart, _] = date.split('_');
        const [day, month, year] = firstPart.split('/');
        return [parseInt(day), parseInt(month), parseInt(year)];
      }
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
    }

    this.data = {
      "byDate" : {}, // {date_1 : [], date_2: [], .., date_n : [] }
      "byTransNo" : {}, // {TransNo_1 : [], TransNo_2: [], .., TransNo_n : [] }
      "byCredit" : {}, // ...
      "byDebit" : {}, // ..
    };

    inputData.forEach(item => {
      this.data["byDate"][item.data_time] = this.data["byDate"][item.data_time] ?? [];
      this.data["byDate"][item.data_time].push(item);

      this.data["byTransNo"][item.trans_no] = this.data["byTransNo"][item.trans_no] ?? [];
      this.data["byTransNo"][item.trans_no].push(item);

      this.data["byCredit"][item.credit] = this.data["byCredit"][item.trans_no] ?? [];
      this.data["byCredit"][item.credit].push(item);

      this.data["byDebit"][item.debit] = this.data["byDebit"][item.debit] ?? [];
      this.data["byDebit"][item.debit].push(item);
    });

    // support in order retrieval
    this.keys = {
      "byDate" : [], // [date_1, date_2, date_3, ..., date_n]
      "byTransNo" : [], // [TransNo_1, TransNo_2, ..., TransNo_n]
      "byCredit" : [],
      "byDebit" : []
    }

    this.keys["byDate"] = Object.keys(this.data["byDate"]).sort(this.dateComparator);
    this.keys["byTransNo"] = Object.keys(this.data["byTransNo"]).map(Number).sort(this.intComparator); // map into number because Object.keys always return string
    this.keys["byCredit"] = Object.keys(this.data["byCredit"]).map(Number).sort(this.intComparator);
    this.keys["byDebit"] = Object.keys(this.data["byDebit"]).map(Number).sort(this.intComparator);

  }

  /*
    return number of entrys in entry of type `type`
  */
  getSizeOfEntry({type = undefined}) {
    if (type == undefined) {
      return undefined;
    }
    return this.keys[type].length;
  }

  /*
    return an array containing items of the `type` type at `index` 
    indexing by the order of its comparator
  */
  getValueInOrder({index = undefined, type = undefined}) {
    if (index == undefined || type == undefined) {
      return undefined;
    }
    return this.data[type][this.keys[type][index]];
  }

  /*
    iterate all the "unique" substring of the details field
    rolling hash these substring and add the item correspond
    to that substring into a map    
  */
  hashAll() {
    this.hashed = {};
  }

  /*
    hash the `key` string using rolling hash,
    return an array contain items contain
    `key` as substring, also the index what substring appear
  */
  searchByDetail(key) {
      
  }

  /*
    return an array of item from `from` to `to` wtih type `type`
    using the given `comparator` using binary search 
  */
  searchInOrder({from = undefined, to = undefined, type = undefined, comparator = () => {}}) {
    if (type == undefined) {
      return undefined;
    }
    from = (from == undefined ? this.keys[type][0] : from);
    to = (to == undefined ? this.keys[type][this.keys[type].length - 1] : to);
    // a > b => a - b > 0
    if (comparator(from, to) > 0) {
      return undefined;
    }
    let lo = 0, hi = this.keys[type].length - 1;
    let lower_bound = lo, upper_bound = hi; // the result will contains items in this range
    console.log({from, to});
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
    lo = 0, hi = this.keys[type].length - 1;
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
      this.data[type][this.keys[type][i]].forEach(item => results.push(item));
    }
    return results;
  }

  searchByDate({from = undefined, to = undefined}) {
    return this.searchInOrder({
      from: from,
      to: to,
      type: "byDate",
      comparator: this.dateComparator
    });
  }
  
  searchByTransNo({from = undefined, to = undefined}) {
    return this.searchInOrder({
      from: from,
      to: to,
      type: "byTransNo",
      comparator: this.intComparator
    });
  }

  searchByCredit({from = undefined, to = undefined}) {
    return this.searchInOrder({
      from: from,
      to: to,
      type: "byCredit",
      comparator: this.intComparator
    });
  } 

  searchByDebit({from = undefined, to = undefined}) {
    return this.searchInOrder({
      from: from,
      to: to,
      type: "byDebit",
      comparator: this.intComparator
    });
  }
}

module.exports = { DataHandler }