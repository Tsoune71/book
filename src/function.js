export function Abs(x) {
    return (x ** 2)**0.5
}

export function Signe (x) {
    if (x < 0) return - 1
    return 1
}

export function isNumber(x) {
    for(const letter of x) {
        let v = true
        for (let i = 0 ; i < 10 ; i++) {
            if (+letter === i) {
                v = false
                break
            }
        }
        if (v) return false
    }
    return true
}