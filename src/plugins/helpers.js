import Swal from 'sweetalert2';

export const deleteConfirm = (callback = null, message = 'Type `YES` if you want delete this record!') => {
  Swal.fire({
    title: message,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'crimson',
    confirmButtonText: 'Yes. Delete!',
    showLoaderOnConfirm: true,
    preConfirm: (value) => {
      if(value.toUpperCase() !== 'YES') {
        Swal.showValidationMessage('type `YES` please!')
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      callback()
    }
  })
}