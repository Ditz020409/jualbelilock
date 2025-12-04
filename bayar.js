// ...existing code...
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formPembelian');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var metode = document.getElementById('metode').value;
            var amountInput = document.getElementById('amount');
            var amount = amountInput ? parseInt(amountInput.value, 10) || 10000 : 10000;

            // Panggil backend untuk membuat payment session / link
            fetch('http://localhost:3000/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ metode: metode, amount: amount })
            })
            .then(res => res.json())
            .then(data => {
                if (data && data.paymentUrl) {
                    window.location.href = data.paymentUrl;
                } else {
                    alert('Gagal membuat payment link.');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Terjadi kesalahan koneksi ke server.');
            });
        });
    }
});
// ...existing code...