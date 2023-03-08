export function timeout(
    ms: number,
    signal?: AbortSignal,
    callback?
): Promise<void> {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(resolve, ms);
        if (signal)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            signal.addEventListener("abort", () => {
                clearInterval(timeoutId);
                if (callback) {
                    callback().then((res) => {
                        resolve(res);
                    });
                } else reject("aborted");
            });
    });
}
