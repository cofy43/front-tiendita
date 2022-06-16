import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class SweetAlert2 {

  askModal(text, confirmButtonText) {
    return new Promise((solve, reject) => {
      solve(
        Swal.fire({
          title: "Estas seguro?",
          text: text,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: confirmButtonText,
          reverseButtons: true,
        })
      );
    });
  }

  successModal(title, text) {
    return new Promise((solve, reject) => {
        solve(
          Swal.fire({
            title: title,
            text: text,
            icon:'success',
            confirmButtonColor: "#3085d6",
          })
        );
      });
  }

  errorModal(text) {
      return new Promise((solve, reject) => {
          solve(
            Swal.fire({
                title: 'Error',
                text: text,
                icon:'error',
                confirmButtonColor: "#3085d6",
              }) 
          )
      })
  }
}
