import React, { useState } from "react";
import Bars from "./bars.jsx"
function Sortvis(){

    var [size,setSize] = new useState(100);
    var [isSorting,setSorting] = new useState(false);


    function handleChange(event){
        setSize(event.target.value);
        console.log(size);
        Generate();
    }

    function waitforme(milisec) { 
        return new Promise(resolve => { 
            setTimeout(() => { resolve('') }, milisec); 
        }) 
    }

    var a = [];
    for(var i=0;i<size;i++){
         a.push(getRandomInt(10,100));
    }
    var [arr,setArr] = new useState(a);
    function Generate(){
        setArr(function(){
            var newArr=[];
            for(var i=0;i<size;i++){
                newArr.push(getRandomInt(10,100));
            }
            return newArr;
        })
    }

    function inputarray(ele,index){
        return <Bars
        key={index}
        height={ele*5}
        number={ele}
         />
    }
async  function Insertionsort(){
    setSorting(true);
        var tot = document.getElementsByClassName('Bars');
      for(var i=1;i<arr.length;i++){
            for(var j=i;j>=1;j--){
               if(arr[j-1]<=arr[j]){
                   break;
               }else{
                var first = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = first;
                tot[j-1].style["background-color"] = "blue";
                tot[j].style["background-color"]="blue";
                await waitforme(j);
                tot[j-1].style["height"] = arr[j-1]*5 + "px";
                tot[j].style["height"] = arr[j]*5+"px";
                await waitforme(j);
                tot[j-1].style["background-color"] = "brown";
                tot[j].style["background-color"]="brown";
               } 
            }
            

      }
      setSorting(false);
       
    }

  async  function BubbleSort(){

        setSorting(true);       
         var tot = document.getElementsByClassName('Bars');
        for(var i=0;i<arr.length;i++){
            var max = 0;
            await waitforme(5);
            tot[0].style["backgroung-color"] = "blue";
            
              for(var j=0;j<arr.length-i;j++){
                  if(arr[j]>arr[max]){
                    await waitforme(10);
                    tot[max].style["background-color"] = "brown";
                      max = j;
                    tot[max].style["background-color"] = "blue";  
                  }
              }
              var temp = arr[max];
              arr[max] = arr[arr.length-i-1];
              arr[arr.length-i-1] = temp;
              await waitforme(i);
              tot[max].style["height"] = arr[max]*5 + "px";
              tot[arr.length-i-1].style["height"] = arr[arr.length-i-1]*5 + "px";
              await waitforme(40);
              tot[max].style["background-color"] = "brown";    
               
        }
        setSorting(false);
    }



    function QuickSort() {
        // Creating an array that we'll use as a stack, using the push() and pop() functions
       var stack = [];
        
        // Adding the entire initial array as an "unsorted subarray"
        stack.push(0);
        stack.push(arr.length - 1);
        
        // There isn't an explicit peek() function
        // The loop repeats as long as we have unsorted subarrays
        while(stack[stack.length - 1] >= 0){
            
            // Extracting the top unsorted subarray
           var end = stack.pop();
            var start = stack.pop();
            
            var pivotIndex = partition(arr, start, end);
            
            // If there are unsorted elements to the "left" of the pivot,
            // we add that subarray to the stack so we can sort it later
            if (pivotIndex - 1 > start){
                stack.push(start);
                stack.push(pivotIndex - 1);
            }
            
            // If there are unsorted elements to the "right" of the pivot,
            // we add that subarray to the stack so we can sort it later
            if (pivotIndex + 1 < end){
                stack.push(pivotIndex + 1);
                stack.push(end);
            }
        }
    }
 
    
    function partition(arr, start, end){
        // Taking the last element as the pivot
        const pivotValue = arr[end];
        let pivotIndex = start; 
        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
            // Swapping elements
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // Moving to next element
            pivotIndex++;
            }
        }
        
        // Putting the pivot value in the middle
        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
        return pivotIndex;
    };


  

   return <div className="row">
         <div className=" con">
         {arr.map(inputarray)}
         </div>
         <div className="col less">
         <div className="buttons">
      <input type="range" min="5" max="100" onChange={isSorting ? null :  handleChange}/>   
     <button onClick={isSorting ? null : Generate}>Random Array</button>
     <button onClick={isSorting ? null : Insertionsort}>Insertion Sort</button>
     <button onClick={isSorting ? null : BubbleSort}>Bubble Sort</button>
     <button>Quick Sort</button>
     <button>Merge Sort</button>
     
     </div>
         </div>
     </div>
     
    
    
   
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Sortvis;