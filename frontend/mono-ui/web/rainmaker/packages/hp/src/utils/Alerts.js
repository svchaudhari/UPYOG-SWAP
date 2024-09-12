import swal from 'sweetalert';

const showAlert = (title, message, messageType) => {
  swal(title, message, messageType);
};

const showConfirmation = (title, message, messageType) => {
  swal({
    title: title,
    text: message,
    icon: messageType,
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("You have clicked Ok", {
        icon: "success",
      });
    } else {
      swal("You have clicked cancelled");
    }
  });
};

export { showAlert, showConfirmation };
