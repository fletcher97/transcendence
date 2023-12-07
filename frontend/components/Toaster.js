const Toaster = (message, id) => {
  return `<div class="toast-container position-fixed bottom-0 mx-auto p-3">
  <div id="${id}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
  <div class="me-auto"><b>Error</b></div>
  <small>now</small>
  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
  ${message}
  </div>
  </div>
  </div>`;
};

export default Toaster;
