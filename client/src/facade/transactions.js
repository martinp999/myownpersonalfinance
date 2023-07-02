class TransactionFacade {
  async getAll() {
    const response = await fetch("/api/transactions");
    return await response.json();
  }
}

export default new TransactionFacade();
