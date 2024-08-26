import WrongDataException from './exceptions/WrongDataException';
import CustomerClass from './domain/Customer';

class MortgageApplicationQueueProcessor {

    constructor(private readonly customerRepository : { get : (id:number) => CustomerClass | null}) {}

    static MESSAGE_INVALID_CUSTOMER = 'Customer not found!';

    private checkWrongData(customer: CustomerClass | null ) :void {
        if (!customer)
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
    }

    public processRequest(customerId: number, amountRequested: number): void {
        this.updateBalance(customerId, amountRequested);
    }

    private updateBalance(customerId: number, amountRequested: number): void {
       const customer = this.getCustomer(customerId);
       if(customer) {
        customer.updateBalance(amountRequested)
    } else {
        throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER)
        };
    }

    private getCustomer(customerId:number) : CustomerClass | null {
        const customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer;
    }
}

export default MortgageApplicationQueueProcessor;
//
