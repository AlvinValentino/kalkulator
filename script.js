$(document).ready(function() {
    let negatif = false, opt, angka = '0', angka2;

    $('#calc-typed').text(angka);
    
    $('.angka').on('click', function() {
        if(angka == '0') {
            angka =  $(this).val();
        } else {
            angka = angka + $(this).val();
        }

        $('#calc-typed').text(angka);
    })

    $('.opt').on('click', function() {
        opt = $(this).val();

        if((opt == '+' || opt == '-' || opt == '/' || opt == 'x' || opt == '%' || opt == '^') && angka != null) {
            angka2 = negatif ? `-${angka}` : angka;
            angka = '0';
            negatif = false;
            $('#calc-typed').text(angka);
            $('#calc-operation').text(`${angka2} ${opt}`)
        } else if(opt == '!') {
            var hasilFaktorial = faktorial(parseInt(angka));
            $('#calc-typed').text(hasilFaktorial);
            $('#calc-operation').text(`${angka}!`)
        } else if(opt == 'nPr' || opt == 'nCr') {
            angka2 = angka;
            angka = '0';
            $('#calc-typed').text(angka);
            $('#calc-operation').text(`${opt == 'nPr' ? `${angka2} P` : `${angka2} C`}`)
        } else if(opt == '√') {
            var hasilAkar = Math.sqrt(parseInt(angka)).toFixed(2)
            $('#calc-operation').text(`√${angka}`)
            $('#calc-typed').text(hasilAkar)
            angka = '0'
        }
    })

    $('.positifnegatif').on('click', function() {
        if(angka != '0') {
            negatif = !negatif;
            $('#calc-typed').text(`${negatif ? `-${angka}` : angka}`)
        }
    })

    $('.samadengan').on('click', function() {
        if(opt == 'nPr') {
            var hasilPermutasi = permutasi(angka, angka2)
            $('#calc-typed').text(hasilPermutasi)
        } else if(opt == 'nCr') {
            var hasilKombinasi = kombinasi(angka, angka2)
            $('#calc-typed').text(hasilKombinasi)
        } else {
            angka = negatif ? `-${angka}` : angka;
            var hasil = perhitungan(angka, angka2, opt);
    
            $('#calc-typed').text(hasil);
        }

        angka = '0';
        $('#calc-operation').html('&nbsp;');
    })

    $('.hapus').on('click', function() {
        var penghapus = angka.length > 1 ? angka.slice(0, angka.length - 1) : null;
        angka = angka.length > 1 ? penghapus : angka;
        $('#calc-typed').text(angka);
    })

    $('.ac').on('click', function() {
        $('#calc-typed').html('0')
        $('#calc-operation').html('&nbsp;')
        opt = null;
        angka = '0';
        angka2 = null;
        negatif = false;
    })

    function permutasi(angka, angka2) {
        var pembilang = faktorial(parseInt(angka2));
        var penyebut = faktorial(parseInt(angka2) - parseInt(angka))

        return pembilang / penyebut;
    }

    function kombinasi(angka, angka2) {
        var pembilang = faktorial(parseInt(angka2));
        var penyebut = faktorial(parseInt(angka)) * faktorial(parseInt(angka2) - parseInt(angka))

        return pembilang / penyebut;
    }

    function perhitungan(angka, angka2, opt) {
        switch(opt) {
            case '+':
                return parseInt(angka2) + parseInt(angka);
                break;
            case '-':
                return parseInt(angka2) - parseInt(angka);
                break;
            case 'x': 
                return parseInt(angka2) * parseInt(angka);
                break;
            case '/':
                return parseInt(angka2) / parseInt(angka);
                break;
            case '%':
                return parseInt(angka2) % parseInt(angka);
                break;
            case '^':
                return Math.pow(angka2, angka);
                break;
            default:
                return;
        }
    }

    function faktorial(angka) {
        if(angka == 0) {
            return 1;
        } else {
            return angka * faktorial(angka - 1);
        }
    }
})