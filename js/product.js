let sales = [];
 
let statusUbah = false;
let indexUbah;

[...document.querySelectorAll("input[type=number]:not(:disabled)")].map(input => {
    input.addEventListener("input", () => {
        const txtHarga = document.getElementById("txtHarga");

    })
})

function validasiInput(){
    let tervalidasi = true;

    [...document.querySelectorAll("div.invalid-feedback")].map(element => element.remove());

    [...document.querySelectorAll("input[type=text]:not(:disabled)")].map(input => {
        if(!input.value){
            const feedback = document.createElement("div");
            feedback.classList.add("invalid-feedback");
            feedback.innerHTML = "Wajib diisi !";

            input.classList.add("is-invalid");
            input.parentElement.append(feedback);

            tervalidasi = false;
        }else{
            input.classList.remove("is-invalid");
        }
    });

    [...document.querySelectorAll("input[type=number]:not(:disabled)")].map(input => {
        if(!input.value){
            const feedback = document.createElement("div");
            feedback.classList.add("invalid-feedback");
            feedback.innerHTML = "Wajib diisi !";

            input.classList.add("is-invalid");
            input.parentElement.append(feedback);

            tervalidasi = false;
        }else{
            input.classList.remove("is-invalid");
        }
    });

    return tervalidasi;
}
document.getElementById("btnTambah").addEventListener("click",() => {
    const txtNama = document.getElementById("txtNama");
    const txtHarga = document.getElementById("txtHarga");
    if (validasiInput()){
        if (statusUbah === true) {
            sales[indexUbah] = {
                ...sales[indexUbah],
                nama: txtNama.value,
                harga: Number(txtHarga.value)
        };
        }else{
        sales.push({

            nama: txtNama.value,
            harga: Number(txtHarga.value)
        });
        tampilTabel();
        }
}

    txtNama.value = "";
    txtHarga.value = "";

    localStorage.setItem("sales",JSON.stringify(sales));

    statusUbah = false;
});


function tampilTabel(){
    const table = document.getElementsByTagName("table")[0];
    const tbody = document.createElement("tbody");
    let tableContent = "";
    let grandTotal = 0;

    table.lastChild.remove(); //remove tfoot
    table.lastChild.remove(); //remote tbody

    sales.map((data, index) => {
        const total = data.harga;
        grandTotal+= total;

        tableContent +=  `<tr>
                                <td>${data.nama}</td>
                                <td class="text-end">${data.harga.toLocaleString('en-US',{style: 'currency', currency: 'IDR'})}</td>
                                <td><button class="btn btn-warning w-100" onclick="Ubahsales(${index})">Ubah</button></td>
                                <td><button class="btn btn-danger w-100" onclick="hapusSales(${index})">Hapus</button></td>
                            </tr>`;
    });
    tbody.innerHTML = tableContent;
    table.append(tbody);

    const tfoot = document.createElement("tfoot");
    tfoot.innerHTML = `
        <tr>
            <td colspan=3>Grand Total</td>
            <td class="text-end">${grandTotal.toLocaleString('en-US',{style: 'currency',currency: 'IDR'})}</td>
        <tr>
    `;
    table.append(tfoot);
}

function hapusSales(index){
    sales.splice(index,1);

    localStorage.setItem("sales",JSON.stringify(sales));
    
    tampilTabel();
}

function Ubahsales(index){
    const txtNama = document.getElementById("txtNama");
    const txtHarga = document.getElementById("txtHarga");

    txtNama.value = sales[index].nama;
    txtHarga.value = sales[index].harga;

    statusUbah = true;
    indexUbah = index;
}

document.addEventListener("DOMContentLoaded",() => {
    sales = JSON.parse(localStorage.getItem("sales"));
    
    localStorage.setItem("sales",JSON.stringify(sales));

    tampilTabel();
})              