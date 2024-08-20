export const Operations = Object.freeze({ 
    TAMBAH: 1,  
    KURANG: 2, 
    KALI: 3, 
    BAGI: 4,
});
export const OperationDesc = (o) => {
    let operDesc = ""
    if (o == Operations.TAMBAH) {
        operDesc = "Penjumlahan"
    }
    else if (o == Operations.KURANG) {
        operDesc = "Pengurangan"
    }
    else if (o == Operations.KALI) {
        operDesc = "Perkalian"
    }
    else if (o == Operations.BAGI) {
        operDesc = "Pembagian"
    }
    return operDesc
}
export const OperationsArr = [Operations.TAMBAH,Operations.KURANG,Operations.KALI,Operations.BAGI]