

export default function isSupportAbortController() {
  return 'AbortController' in window;
}