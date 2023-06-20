
const btnSend = document.getElementById(`btn-send`);

const send = () => {
    btnSend.addEventListener(`click`, () => {
        Swal.fire("Enviado", "Su mensaje fue enviado correctamente", "success");
    });
};

send();