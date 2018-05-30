export function formatMoney(n) {
    if(n == undefined) return;
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
