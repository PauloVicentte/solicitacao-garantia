export function obterUsuario(): any {
  if (typeof window === 'undefined') return null;
  return JSON.parse(localStorage.getItem('user') || 'null');
}
