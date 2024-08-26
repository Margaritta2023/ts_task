import  NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException";

interface Customer {
    readonly id: number;
    firstName: string;
    lastName: string; 
    address?: string; 
    balance: number;
    badCreditHistoryCount: number;
    updateBalance: (amoount:number) => void;
    isEligibleForMortgage: (amoount:number) => boolean;
}

export default class CustomerClass {


    constructor(
        readonly id: number,
        public firstName: string,
        public lastName: string,
        public balance: number, 
        public badCreditHistoryCount:number
) { }

    updateBalance(amount:number) : void {
       if(this.isEligibleForMortgage(amount)){
           this.balance += amount;
           console.log("Balance updated")
       }else{
           throw new NotEligibleForMortgageException();
       }
    }

    private isEligibleForMortgage(amountRequested: number): boolean {
        let isEligibleForMortgage = false;

        if (this.badCreditHistoryCount === 0 && this.balance > 0)
            isEligibleForMortgage = this.balance * 2 >= amountRequested;

        return isEligibleForMortgage;
    }
}
//