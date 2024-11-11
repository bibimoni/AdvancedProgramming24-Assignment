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
    this.data = {
      "byDate" : {},
      "byTransNo" : {},
      "byCredit" : {},
      "byDebit" : {},
    };

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

    inputData.forEach(item => {
      this.data.byDate[item.data_time] = this.data.byDate[item.data_time] ?? [];
      this.data.byDate[item.data_time].push(item);

      this.data.byTransNo[item.trans_no] = this.data.byTransNo[item.trans_no] ?? [];
      this.data.byTransNo[item.trans_no].push(item);

      this.data.byCredit[item.trans_no] = this.data.byCredit[item.trans_no] ?? [];
      this.data.byCredit[item.trans_no].push(item);

      this.data.byDebit[item.debit] = this.data.byDebit[item.debit] ?? [];
      this.data.byDebit[item.debit].push(item);
    });

    // support in order retrieval
    this.keys = {
      "byDate" : [],
      "byTransNo" : [],
      "byCredit" : [],
      "byDebit" : []
    }
    this.keys.byDate = Object.keys(this.data.byDate).sort(this.dateComparator);
    this.keys.byTransNo = Object.keys(this.data.byTransNo).sort(this.intComparator);
    this.keys.byCredit = Object.keys(this.data.byCredit).sort(this.intComparator);
    this.keys.byDebit = Object.keys(this.data.byDebit).sort(this.intComparator);

  }

  /*
    return number of entrys in entry of type `type`
  */
  getSizeOfEntry({type = undefined}) {
    if (type == undefined) {
      return undefined;
    }
    return this.key[type].length;
  }

  /*
    return a value within the `type` type at `index` 
    indexing by an order with its comparator
  */
  getValueInOrder({index = undefined, type = undefined}) {
    if (index == undefined || type == undefined) {
      return undefined;
    }
    return this.data[type][this.keys[type][index]];
  }

  /*
    -> iterate all the "unique" substring of the details field
    rolling hash these substring and add the item correspond
    to that substring into a map    
  */
  preHash() {

  }

  /*
    hash the `key` string using rolling hash, 
  */
  searchByDetail(key) {
      
  }

  searchInOrder({from = undefined, to = undefined, comparator = () => {}}) {

  }

  searchByDate({from = undefined, to = undefined}) {

  }
  
  searchByTransNo({from = undefined, to = undefined}) {

  }

  searchByCredit({from = undefined, to = undefined}) {

  }

  searchByDebit({from = undefined, to = undefined}) {

  }
}

module.exports = { DataHandler }