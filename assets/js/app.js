

function to2 (num) {

    return Math.round((Math.round((num * 100)) / 100) * 10) / 10;
}

function parselCreator(month, sumCredit, principalPayment, interestPayment, paymentForMonth) {
    
    this.month = month;
    this.sumCredit = sumCredit;
    this.principalPayment = principalPayment;
    this.interestPayment = interestPayment;
    this.paymentForMonth = paymentForMonth; 

}
    
function resultTable(arrObjects) {
    
    let tableBody = document.querySelector('tbody');
        tableBody.innerHTML = arrObjects.map(item => `
                          <tr>
                              <th>${item.month}</th>
                              <td>${item.sumCredit.toFixed(2)}</td>
                              <td>${item.principalPayment.toFixed(2)}</td>
                              <td>${item.interestPayment.toFixed(2)}</td>
                              <td>${item.paymentForMonth.toFixed(2)}</td>
                          </tr>
                          `).join('');
        
}
        
function calculate (sumCredit, mRate, term) {

    let arrObjects = [];
    let p = {};
    let amountPayment = 0;
    let amountInterestPayment = 0;
    let amountPrincipalPayment = 0;
    let monthlyInterestPayment = 0;
    let monthlyPrincipalPayment = 0;
    let paymentForMonth = 0;

    let radioAnnuity = document.querySelector('#gridRadios1');
    // let radioStandard = document.querySelector('#gridRadios2');

        if (radioAnnuity.checked)  {
            // Annuitety calculation
            paymentForMonth = to2(sumCredit * (mRate + (mRate /(((1 + mRate) ** term) - 1))));

            amountPayment = to2(paymentForMonth * (term - 1));
                                                                    
                for (let month = 1; month <= term; month++) {

                    monthlyInterestPayment = to2(sumCredit * mRate);
                
                    monthlyPrincipalPayment = to2(paymentForMonth - monthlyInterestPayment);

                        if (month == term) {
                            monthlyPrincipalPayment = sumCredit;
                            paymentForMonth = to2(monthlyPrincipalPayment +  monthlyInterestPayment);
                            amountPayment = to2(paymentForMonth + amountPayment);
                        } 

                    paymentForMonth = to2(monthlyPrincipalPayment +  monthlyInterestPayment);
                    
                    p = new parselCreator(month, sumCredit, monthlyPrincipalPayment, monthlyInterestPayment, paymentForMonth);
                    
                    arrObjects.push(p);

                    sumCredit = to2(sumCredit - monthlyPrincipalPayment);

                    amountInterestPayment = to2(amountInterestPayment +  monthlyInterestPayment);
                                         
                    amountPrincipalPayment = to2(amountPrincipalPayment + monthlyPrincipalPayment); 
                       
                    
                };
        } else {
            // Standard calculation
            monthlyPrincipalPayment = to2(sumCredit / term);
     
                for(let month = 1; month <= term; month++) {

                        if(month == term) {
                        monthlyPrincipalPayment = sumCredit;
                        }

                    monthlyInterestPayment = to2(sumCredit * mRate);
                    
                    paymentForMonth = to2(monthlyPrincipalPayment + monthlyInterestPayment);
                    
                    p = new parselCreator(month, sumCredit, monthlyPrincipalPayment, monthlyInterestPayment, paymentForMonth);
                        
                    arrObjects.push(p);

                    amountInterestPayment = to2(amountInterestPayment +  monthlyInterestPayment);
                                            
                    amountPrincipalPayment = to2(amountPrincipalPayment + monthlyPrincipalPayment);
                    
                    amountPayment = to2(amountPayment + paymentForMonth);
                                
                    sumCredit = to2(sumCredit - monthlyPrincipalPayment);  
                        
                }
        }
               
         // footer table
        let finalBodyPayment = document.querySelector('.bodyPayment');
                    finalBodyPayment.innerHTML = `${amountPrincipalPayment.toFixed(2)}`;

        let finalPercentPayment = document.querySelector('.percentPayment');
                    finalPercentPayment.innerHTML = `${amountInterestPayment.toFixed(2)}`;

        let finalPayment = document.querySelector('.monthesPayment');
                finalPayment.innerHTML = `${amountPayment.toFixed(2)}`;  
                
        resultTable(arrObjects); 
        console.log(arrObjects); 
    }

    // Button click
    let resultBtn = document.querySelector('.btn');
    resultBtn.addEventListener('click', function() {

    let sumCredit = +inputSumm.value;
    let rate = +inputRate.value;
    let term = +inputTerm.value;

    let mRate = rate / (100 * 12); 
    
    let tableOfResults = document.querySelector('.results');
    tableOfResults.classList.remove('d-none');
     
    calculate (sumCredit, mRate, term)
    
    });

