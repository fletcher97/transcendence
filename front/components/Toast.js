const Toast = (message, id, color) => {
  return `<div class="toast-container position-fixed bottom-0 mx-auto p-3 toast-${color}">
  <div id="${id}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header toast-${color}">
  <div class="me-auto"><b>Error</b></div>
  <small>now</small>
  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div id="toast-message-container" class="toast-body">
  </div>
  </div>
  </div>`;
};

export default Toast;
