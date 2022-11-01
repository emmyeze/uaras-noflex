import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { KeyedCollection } from '../shared/interfaces/ikeyed-collection';


// import { start } from 'repl';
// import { KeyedCollection } from '../interfaces/ikeyed-collection';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  isMessageFromMiniSales: BehaviorSubject<string> = new BehaviorSubject('');
  isMessageFromMiniSalesRestaurant: BehaviorSubject<string> = new BehaviorSubject('');
  isMessageStatus: BehaviorSubject<number> = new BehaviorSubject(0);
  

  constructor(
    private snackBar: MatSnackBar

  ) { }

  openSnackBar(message, action): void {
    this.snackBar.open(message, action , {duration: 5000, });
  }


  // remove a String and replace
  prepareQuery(query:string, searchValue: string): string {
    const pieces = query.split(`"${searchValue}"`);
    return pieces.join(searchValue);
  }

  replaceText(query: string, searchValue: string, replaceValue: string): string {
    const pieces = query.split(`${searchValue}`);
    return pieces.join(replaceValue);
  }

  prepareNewID4(): string {
    const today = String(new Date());
    console.log('date string: ', today);
    return today;
  }

  // this ID generator return a random id with a date prefix ie 2021130XXXXXXXX
  prepareNewID3(expectedDigits: number): string {
    const today = new Date();
    const todaysYear = (Number(today.getFullYear()) % 100);
    const todaysMonth = (Number(today.getMonth()) + 1);
    const todaysDay = (Number(today.getDate()));

    const randomNo = String(Math.floor(Math.random() * Math.floor(expectedDigits - 6)));
    let tempRef = String(todaysYear)
    +
    ((String(todaysMonth)).length < 2 ?
    ('0' + (String(todaysMonth))) : String(todaysMonth))
    +
    ((String(todaysDay)).length < 2 ?
    ('0' + (String(todaysDay))) : String(todaysDay));

    const tempRef2 = tempRef;
    for (let i = 0; i < (expectedDigits - (tempRef2.length + randomNo.length)); i++)
          {
          tempRef = tempRef +  '0';
          }
    return(tempRef + randomNo);


  }
  prepareNewID(originalString: string, expectedDigits: number): string {
    let answer = '';
    const tempUserID = Number(originalString) + 1;
    console.log ('THIS IS TEMPUSERID: ', tempUserID);
    answer += tempUserID;
    while (answer.length < expectedDigits) {
      answer = '0' + answer;

    }
    return answer;
  }

  prepareNewID2(
    originalStringwith2digitYear: string,
    expectedDigits: number): string {

    const answer =  Number(originalStringwith2digitYear);
    console.log('@prepareNewID2', originalStringwith2digitYear );
    let answer3 = (Number(answer)) % (1 * Math.pow(10, expectedDigits - 2)); // reference number

    console.log('@prepareNewID2-answer3', answer3 );

    const answer2 = Math.floor(Number(answer) / (1 * Math.pow(10, expectedDigits - 2))); // reference year
    console.log('@prepareNewID2-answer2', answer2 );

    const today = new Date();
    const todaysYear = (Number(today.getFullYear()) % 100);

    if (answer2 !== todaysYear) { // not the same year reference
        answer3 = 0;
      }
    const NewNo = String(answer3 + 1); // do the increment in ref
    let tempRef = String(todaysYear);
    const tempRef2 = tempRef;
    for (let i = 0; i < (expectedDigits - (tempRef2.length + NewNo.length)); i++)
          {
          tempRef = tempRef +  '0';
          }
    console.log('@prepareNewID2-result', (tempRef + NewNo) );

    return(tempRef + NewNo);
  }

  prepareNewIDHR(
    originalStringwithTypeCode: string,
    expectedDigits: number): string {
      let prefixCode = '';
      let answer3 = 0;
      const splitID = originalStringwithTypeCode.split('');
      if (splitID[1] === 'E') {
        prefixCode = 'TEMP';
        answer3 = Number(originalStringwithTypeCode.split(prefixCode)[1])? Number(originalStringwithTypeCode.split(prefixCode)[1]) : 0; // reference number
      }
      else {
        if (splitID[0] === 'D') {
          prefixCode = 'DTS';
          answer3 = Number(originalStringwithTypeCode.split(prefixCode)[1])? Number(originalStringwithTypeCode.split(prefixCode)[1]) : 0; // reference number
        }
        else {
          prefixCode = 'TS'
          answer3 = Number(originalStringwithTypeCode.split(prefixCode)[1])? Number(originalStringwithTypeCode.split(prefixCode)[1]) : 0; // reference number
        }
      }



    console.log('@prepareNewID2-answer3- LAST NO', answer3 );

    const NewNo = String(answer3 + 1); // do the increment in ref
    let tempRef = prefixCode;
    const tempRef2 = tempRef;
    for (let i = 0; i < (expectedDigits - (tempRef2.length + NewNo.length)); i++)
          {
          tempRef = tempRef +  '0';
          }
    console.log('@prepareNewID2-result', (tempRef + NewNo) );

    return(tempRef + NewNo);
  }


  sliceTable(
    myIndex: number, paginator: MatPaginator, data: any[]): any[] {
      // console.log('INDEX: ', myIndex);
      // console.log('PAGE INDEX: ', paginator.pageIndex);
      // console.log('PAGE SIZE: ', paginator.pageSize);


      // console.log('INDEX: ', myIndex);

      const startIndex = paginator.pageIndex * paginator.pageSize;
      const myPosition = startIndex + myIndex;
      data.splice(myPosition,  1);
      // console.log('@SPLICE TABLE: ', startIndex, myPosition);

      return data; }

  getMyPositionOnTable(myIndex: number, paginator: MatPaginator): number {
    const startIndex = paginator.pageIndex * paginator.pageSize;
    const myPosition = startIndex + myIndex;
    return myPosition;
  }

  setSalesMarker(aPaymentType: string): void {
    this.isMessageFromMiniSales.next(aPaymentType);

  }

  setSalesMarkerRestaurant(aPaymentType: string): void {
    this.isMessageFromMiniSalesRestaurant.next(aPaymentType);

  }

  setMessageStatus(aStatus: number): void {
    this.isMessageStatus.next(aStatus);
  }

  translateAptInfo(apType: string) {


    let roomT = new KeyedCollection<string>();
    roomT.Add('1RS', 'Single Room');
    roomT.Add('1RSELF', 'Self Contained');
    roomT.Add('2B', '2 Bedroom');
    roomT.Add('3B', '3 Bedroom');

    return roomT.Item(apType);

  }




}





