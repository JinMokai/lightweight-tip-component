

// 检查是否是浏览器环境
export const isBrowser = () => {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}
