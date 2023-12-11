const Toast = (message, id, color) => {
  return `<div class="toast-container position-fixed bottom-0 mx-auto p-3 toast-${color}">
  <div id="${id}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header toast-${color}">
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

export default Toast;


// class ToastComponent extends HTMLElement {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     const message = this.getAttribute('message');
//     const id = this.getAttribute('id');
//     const color = this.getAttribute('color');

//     this.innerHTML = `
//       <div class="toast-container position-fixed bottom-0 mx-auto p-3 toast-${color}">
//         <div id="${id}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
//           <div class="toast-header toast-${color}">
//             <div class="me-auto"><b>Error</b></div>
//             <small>now</small>
//             <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
//           </div>
//           <div class="toast-body">
//             ${message}
//           </div>
//         </div>
//       </div>`;
//   }
// }

// customElements.define('my-toast', ToastComponent);