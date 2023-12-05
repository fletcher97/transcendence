export default class {
  constructor() {
    this.isLoading = true; // Initial loading state
    this.data = null; // Placeholder for fetched data
    this.getHtml = this.getHtml.bind(this);
  }

  async getHtml() {
    return "";
  }
  async fetchData() {
  }

  initialRender() {
    // Implement render logic in the child class
  }

  getHtml() {
    // Implement getHtml logic in the child class
  }

  addEventListeners() {}

  async updateUi() {};
}
