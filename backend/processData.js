
// This was implemented by a Competitve Programmer so don't expect anything
class RollingHash {
  constructor({str}) {
    // initialize value (more values -> less collision)
    this.BASE = [31, 331];
    this.MOD = [Number(1000013), Number(5012507)]; // 2 * MOD * MOD < 1e15 - 1 since JS Number type sucks

    if (this.BASE.length != this.MOD.length) {
      throw new Error("BASE and MOD doesn't have equal size");
    }

    this.nStr = str.length;
    str = "#" + str;
    this.nArgs = this.BASE.length; // number of BASE and MOD (BASE and MOD must have equal size)    
    this.hash = new Array(this.nStr + 1);
    this.pow = new Array(this.nStr + 1);
    this.hash[0] = new Array(this.nArgs);
    this.pow[0] = new Array(this.nArgs);

    for (let j = 0; j < this.nArgs; j++) {
      this.pow[0][j] = 1;
      this.hash[0][j] = 0;
    }
    for (let i = 1; i <= this.nStr; i++) {
      this.pow[i] = new Array(this.nArgs);
      for (let j = 0; j < this.nArgs; j++) {
        this.pow[i][j] = (this.pow[i - 1][j] * this.BASE[j]) % this.MOD[j];
      }
      this.hash[i] = new Array(this.nArgs);
      for (let j = 0; j < this.nArgs; j++) {
        this.hash[i][j] = (this.hash[i - 1][j] * this.BASE[j] + str.charCodeAt(i)) % this.MOD[j];
      }
    }
  }

  get size() {
    return this.nStr;
  }

  /*
    return all the unique hash value of the substring and the position
    of the substring in the original string
  */
  hashAll() {
    let results =  {};
    /*{
        hashValue_1 : [idx_1, idx_2, ...]
        hashValue_2 : [idx_1, idx_2, idx_3, ...]
      }*/
    for (let i = 0; i < this.nStr; i++) {
      for (let j = i; j < this.nStr; j++) {
        let hashValue = this.hashForward({l : i, r : j});
        results[hashValue] = results[hashValue] ?? [];
        results[hashValue].push(i);
      }
    }
    return results;
  }

  // return a hash value from `i` to `j` (0-indexed)
  hashForward({l, r}) {
    l += 1;
    r += 1;
    let ret = [];
    for (let j = 0; j < this.nArgs; j++) {
      ret.push((this.hash[r][j] - this.hash[l - 1][j] * this.pow[r - l + 1][j] + this.MOD[j] * this.MOD[j]) % this.MOD[j]);
    }
    return ret;
  }

  getHash() {
    return this.hashForward({l : 0, r : this.nStr - 1});
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

    this.HashData();
    
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
    return number of entries in entry of type `type`
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
  HashData() {
    this.hashed = []; 
    this.inputData.forEach((item, index) => {
      let hashStr = new RollingHash({str: item.detail});
      this.hashed.push(hashStr);
    });
  }

  /*
    hash the `key` string using rolling hash,
    return an array contain items contain
    `key` as substring, also the index what substring appear
  */
  searchByDetail({key}) {
    let items = [];
    let indices = [];
    let keyHash = (new RollingHash({str : key})).getHash();
    this.hashed.forEach((hashed, index) => {
      let positions = [];
      for (let i = 0; i + key.length - 1 < hashed.size; i++) {
        if (hashed.hashForward({l : i, r : i + key.length - 1}).toString() == keyHash.toString()) {
          positions.push(i);
          i += key.length - 1;
        }
      }
      if (positions.length != 0) {
        items.push(this.inputData[index]);
        indices.push(positions);
      }
    });
    return {items, indices};
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
    return {items : results};
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