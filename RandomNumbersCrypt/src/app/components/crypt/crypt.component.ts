import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tree, Node } from 'src/app/classes/tree';
import { getCodesFromText, encode, decode, getFrequency, getRelativeFrequency, getEntropyOfText, getTree } from '../../classes/huffman';

@Component({
  selector: 'app-crypt',
  templateUrl: './crypt.component.html',
  styleUrls: ['./crypt.component.scss']
})
export class CryptComponent implements OnInit {
  randomArr = [0, 1, 0, 4, 8, 8, 0, 2, 2, 0];
  messageForm = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  codes: Map<string, string>;
  result: Array<string>;
  text: string;
  frequency: any;
  relFreq;

  constructor() {}

  ngOnInit() {
  }

  formEncode() {
    this.text = this.messageForm.get('message').value; // Text for encode
    console.log('text::', this.text);
    this.codes = getCodesFromText(this.text); // Get symbols codes
    this.result = encode(this.text, this.codes); // Get array of encoded symbols (result)
    this.frequency = getFrequency(this.text);
    this.relFreq = getRelativeFrequency(this.frequency);

    console.log('result::', this.result);
    console.log('Text length: ', this.result.length);
    console.log('Text Entropy: ', getEntropyOfText(this.text));
    console.log('Frequency: \n', this.frequency);
    console.log('Rel. Frequency \n', this.relFreq);
    console.log('Huffman Tree: \n', getTree(this.frequency));
    console.log('Codes Alphabet: \n', this.codes);
    console.log('result changed::', this.result.join(''));

    this.messageForm.setValue({message: this.result.join('')});
    // $("#text").val(result.join('')); // Put result array of encoded symbols into form
  }

  formDecode() {
    this.text = decode(this.result, this.codes); // Decode text with existing codes
    console.log('text::', this.text);
    this.messageForm.setValue({ message: this.text });

    /** CONSOLE INFO */
    const avgLength = (Math.log2(this.codes.size));
    let avgHuffmanLength = 0;

    for (let i = 0; i < this.frequency.length; i++) {
      this.codes.forEach((code, symbol) => {
        if (this.frequency[i][0] === symbol) {
          avgHuffmanLength += (this.frequency[i][1] * code.toString().length);
        }
      });
    }
    avgHuffmanLength = avgHuffmanLength / this.result.length;

    console.log('Avg. word length before coding: ', avgLength);
    console.log('Avg. Haffmun word length (after coding): ', avgHuffmanLength);

    const zipRate = Math.round(((avgLength - avgHuffmanLength) / avgLength) * 10000) / 100;
    console.log('Compression result: ', zipRate + '%');
  }

  // huffmanCode(message) {
  //   const startArr = message.split('');
  //   console.log('startArr::', startArr);
  //   const sortedArr = startArr.sort();
  //   console.log('sortedArr::', sortedArr);
  //   const frequencyCounter = [];
  //   sortedArr.forEach(element => {
  //     if (frequencyCounter.length
  //       && frequencyCounter.length
  //       && frequencyCounter[frequencyCounter.length - 1].value === element
  //     ) {
  //       frequencyCounter[frequencyCounter.length - 1].frequency++;
  //     } else {
  //       frequencyCounter.push({
  //         value: element,
  //         frequency: 1
  //       });
  //     }
  //   });
  //   frequencyCounter.sort((el, el2) => el.frequency > el2.frequency ? 1 : -1);
  //   console.log('frequencyCounter sorted again::', JSON.parse(JSON.stringify(frequencyCounter)));
  //   // this.tree.sayHi();
  //   // this.tree.addNode(new Node(7, 12));
  //   // this.tree.addNode(new Node(8, 13));
  //   const newNode = new Node(7, 12, null);
  //   console.log('newNode::', newNode);
  //   // console.log('my tree::', JSON.parse(JSON.stringify(this.tree)));
  // }

get message() { return this.messageForm.get('message'); }

}
