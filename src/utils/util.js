

export const simpleIterator = (from, to, ease) => {
    let diff = to - from;
    return (i) => {
        return ease(i) * diff + from;
    }
}

export const linear = (t) => { return t; }
